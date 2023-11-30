export interface IAgent {
	_id: string;
	name: string;
	host: string;
	user: string;
	pass: string;
	botName: string;
	ssl: boolean;
	apiKey: string;
	assistantId: string;
	model: string;
	description: string;
	starters: string[];
	roleUsageLimit: {
		guest: {
			$numberInt: string;
		};
		admin: {
			$numberInt: string;
		};
	};
}
