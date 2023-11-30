import type { IAgent, IUser } from '@rocket.chat/core-typings';
import { CoWorkAgents } from '@rocket.chat/models';
import type { ServerMethods } from '@rocket.chat/ui-contexts';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../app/authorization/server/functions/hasPermission';
import { RateLimiterClass as RateLimiter } from '../../app/lib/server/lib/RateLimiter';

export async function getCoWorkAgents(
	username: IUser['username'],
	userId: IUser['_id'] | null,
): Promise<Omit<IAgent, '_id' | 'inserted'>[]> {
	// check(username, String);
	username = 'dr_optica';
	console.log('h1');
	if (!userId) {
		throw new Meteor.Error('error-invalid-user', 'Invalid user', {
			method: 'getCoWorkAgents',
		});
	}
	console.log('h2');
	// check if user allows to create direct message to users with bot role
	if (!(await hasPermissionAsync(userId, 'create-d-gpts-bot'))) {
		throw new Meteor.Error('error-invalid-user', 'Invalid user', {
			method: 'getCoWorkAgents',
		});
	}
	console.log('h3');
	if (!username) {
		throw new Meteor.Error('error-invalid-user', 'Invalid user', {
			method: 'getCoWorkAgents',
		});
	}
	console.log('h4');
	const agents = await CoWorkAgents.find({ name: username }).toArray();

	return agents;
}

declare module '@rocket.chat/ui-contexts' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		getCoWorkAgents(username: Exclude<IUser['username'], undefined>): Omit<IAgent, '_id' | 'inserted'>[];
	}
}

Meteor.methods<ServerMethods>({
	async getCoWorkAgents(username) {
		return getCoWorkAgents(username, Meteor.userId());
	},
});

RateLimiter.limitMethod('getCoWorkAgents', 10, 60000, {
	async userId(userId: IUser['_id']) {
		return !(await hasPermissionAsync(userId, 'send-many-messages'));
	},
});
