import { CoWorkAgents } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../authorization/server/functions/hasPermission';
import { API } from '../api';

API.v1.addRoute(
	'agents.starters',
	{ authRequired: true },
	{
		async get() {
			const username = this.queryParams.username;

			check(username, String);

			if (!this.userId) {
				throw new Meteor.Error('error-invalid-agent', 'Invalid agent', {
					method: 'getCoWorkAgents',
				});
			}

			// check if user allows to create direct message to users with bot role
			if (!(await hasPermissionAsync(this.userId, 'create-d-gpts-bot'))) {
				throw new Meteor.Error('error-invalid-agent', 'Invalid agent', {
					method: 'agents.starters',
				});
			}

			if (!username) {
				throw new Meteor.Error('error-invalid-agent', 'Invalid agent', {
					method: 'agents.starters',
				});
			}

			const agents = (await CoWorkAgents.find({ name: username }).toArray()).map((agent) => {
				return {
					_id: agent._id,
					name: agent.name,
					starters: agent.starters,
				};
			});

			return API.v1.success({ agents });
		},
	},
);
