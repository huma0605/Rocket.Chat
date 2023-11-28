import type { ICreatedRoom, IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import type { ServerMethods } from '@rocket.chat/ui-contexts';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../app/authorization/server/functions/hasPermission';
import { addUser } from '../../app/federation/server/functions/addUser';
import { createRoom } from '../../app/lib/server/functions/createRoom';
import { RateLimiterClass as RateLimiter } from '../../app/lib/server/lib/RateLimiter';

export async function createDirectMessageToAgentBot(
	usernames: IUser['username'][],
	userId: IUser['_id'] | null,
): Promise<Omit<ICreatedRoom, '_id' | 'inserted'>> {
	check(usernames, [String]);
	check(userId, String);

	if (!userId) {
		throw new Meteor.Error('error-invalid-user', 'Invalid user', {
			method: 'createDirectMessage',
		});
	}

	// check if user allows to create direct message to users with bot role
	if (!(await hasPermissionAsync(userId, 'create-d-gpts-bot'))) {
		throw new Meteor.Error('error-invalid-user', 'Invalid user', {
			method: 'createDirectMessage',
		});
	}

	const me = await Users.findOneById(userId, { projection: { username: 1, name: 1 } });
	if (!me?.username) {
		throw new Meteor.Error('error-invalid-user', 'Invalid user', {
			method: 'createDirectMessage',
		});
	}

	const users = await Promise.all(
		usernames
			.filter((username) => username !== me.username)
			.map(async (username) => {
				let to: IUser | null = await Users.findOneByUsernameIgnoringCase(username);

				// If the username does have an `@`, but does not exist locally, we create it first
				if (!to && username.includes('@')) {
					try {
						to = await addUser(username);
					} catch {
						// no-op
					}
					if (!to) {
						return username;
					}
				}

				if (!to) {
					throw new Meteor.Error('error-invalid-user', 'Invalid user', {
						method: 'createDirectMessage',
					});
				}
				return to;
			}),
	);
	const roomUsers = [me, ...users];

	// check if the dm user is a bot
	users.forEach((user) => {
		if (typeof user === 'string') {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'createDirectMessage',
			});
		}

		if (!user.roles.includes('bot')) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'createDirectMessage',
			});
		}
	});

	// check if the user dm to a single bot (roomUsers should be two; yourself and the bot)
	if (roomUsers.length !== 2) {
		throw new Meteor.Error('error-invalid-user', 'Invalid user', {
			method: 'createDirectMessage',
		});
	}

	const {
		_id: rid,
		inserted,
		...room
	} = await createRoom<'d'>('d', undefined, undefined, roomUsers as IUser[], false, undefined, {}, { creator: me._id });

	return {
		// @ts-expect-error - room type is already defined in the `createRoom` return type
		t: 'd',
		// @ts-expect-error - room id is not defined in the `createRoom` return type
		rid,
		...room,
	};
}

declare module '@rocket.chat/ui-contexts' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		createDirectMessageToAgentBot(...usernames: Exclude<IUser['username'], undefined>[]): Omit<ICreatedRoom, '_id' | 'inserted'>;
	}
}

Meteor.methods<ServerMethods>({
	async createDirectMessageToAgentBot(...usernames) {
		return createDirectMessageToAgentBot(usernames, Meteor.userId());
	},
});

RateLimiter.limitMethod('createDirectMessageToAgentBot', 10, 60000, {
	async userId(userId: IUser['_id']) {
		return !(await hasPermissionAsync(userId, 'send-many-messages'));
	},
});
