import type { IAgent } from '@rocket.chat/core-typings';

export type AgentsEndpoints = {
	'/v1/agents.starters': {
		GET: (params: { username: string }) => {
			agents: {
				_id: IAgent['_id'];
				name: IAgent['name'];
				starters: IAgent['starters'];
			}[];
		};
	};
};
