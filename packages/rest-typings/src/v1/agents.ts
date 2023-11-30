import type { IAgent } from '@rocket.chat/core-typings';

export type AgentsEndpoints = {
	'/v1/agents.configs': {
		GET: (username: string) => {
			agents: IAgent[];
		};
	};
};
