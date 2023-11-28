import { useSetting, usePermission } from '@rocket.chat/ui-contexts';
import type { ReactElement } from 'react';
import React, { useEffect } from 'react';

import { KonchatNotification } from '../../../app/ui/client/lib/KonchatNotification';
import CustomHomePage from './CustomHomePage';
import DefaultHomePage from './DefaultHomePage';
import GPTHomePage from './GPTHomePage';

const HomePage = (): ReactElement => {
	const canViewGPTHome = usePermission('view-gpts-home');
	useEffect(() => {
		KonchatNotification.getDesktopPermission();
	}, []);

	const customOnly = useSetting('Layout_Custom_Body_Only');

	if (canViewGPTHome) {
		return <GPTHomePage />;
	}

	if (customOnly) {
		return <CustomHomePage />;
	}

	return <DefaultHomePage />;
};

export default HomePage;
