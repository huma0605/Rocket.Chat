import type { IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import type { ServerMethods } from '@rocket.chat/ui-contexts';
import { Meteor } from 'meteor/meteor';

declare module '@rocket.chat/ui-contexts' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		getBotUsers(): IUser[];
	}
}

Meteor.methods<ServerMethods>({
	async getBotUsers() {
		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'getBotUsers',
			});
		}
		const users = await Users.find({
			roles: { $all: ['bot'] },
		}).toArray();

		return users;
	},
});
