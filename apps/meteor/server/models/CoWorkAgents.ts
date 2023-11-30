import { registerModel } from '@rocket.chat/models';

import { db } from '../database/utils';
import { CoWorkAgentsRaw } from './raw/CoWorkAgents';

registerModel('ICoWorkAgentsModel', new CoWorkAgentsRaw(db));
