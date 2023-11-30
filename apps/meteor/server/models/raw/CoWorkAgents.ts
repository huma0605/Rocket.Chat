import type { IAgent } from '@rocket.chat/core-typings';
import type { ICoWorkAgentsModel } from '@rocket.chat/model-typings';
import type { Db } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class CoWorkAgentsRaw extends BaseRaw<IAgent> implements ICoWorkAgentsModel {
	constructor(db: Db) {
		super(db, 'cowork_agents', undefined, { collectionNameResolver: (name) => name });
	}
}
