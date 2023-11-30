import { Meteor } from 'meteor/meteor';

import { API } from '../api';

API.v1.addRoute(
	'agents.configs',
	{ authRequired: true },
	{
		async get() {
			const agents = await Meteor.callAsync('getCoWorkAgents');

			return API.v1.success({ agents });
		},
	},
);
