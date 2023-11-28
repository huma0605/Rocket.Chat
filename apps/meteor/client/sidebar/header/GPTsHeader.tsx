import { Sidebar } from '@rocket.chat/fuselage';
import { useUser, useTranslation } from '@rocket.chat/ui-contexts';
import type { ReactElement } from 'react';
import React, { memo } from 'react';

import UserAvatarWithStatus from './UserAvatarWithStatus';
import UserMenu from './UserMenu';
import Home from './actions/Home';
import Login from './actions/Login';
/**
 * @deprecated Feature preview
 * @description Should be removed when the feature became part of the core
 * @memberof navigationBar
 */

const GPTsHeader = (): ReactElement => {
	const t = useTranslation();
	const user = useUser();

	return (
		<Sidebar.TopBar.Section>
			{user ? <UserMenu user={user} /> : <UserAvatarWithStatus />}
			<Sidebar.TopBar.Actions>
				<Home title={t('Home')} />
				{!user && <Login title={t('Login')} />}
			</Sidebar.TopBar.Actions>
		</Sidebar.TopBar.Section>
	);
};

export default memo(GPTsHeader);
