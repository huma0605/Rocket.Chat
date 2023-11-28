import { useSetting, usePermission } from '@rocket.chat/ui-contexts';
import type { ReactElement } from 'react';
import React, { useEffect } from 'react';

import { KonchatNotification } from '../../../app/ui/client/lib/KonchatNotification';
import CustomHomePage from './CustomHomePage';
import DefaultHomePage from './DefaultHomePage';
import GPTHomePage from './GPTHomePage';

const HomePage = (): ReactElement => {
	const canViewGPTHome = usePermission('view-gpts-home');
	const canViewRocketChatDefaultHome = usePermission('view-rocket-chat-default-home');
	const customOnly = useSetting('Layout_Custom_Body_Only');

	useEffect(() => {
		KonchatNotification.getDesktopPermission();
	}, []);

	const RocketChatDefaultHome = customOnly ? CustomHomePage : DefaultHomePage;

	return (
		<>
			{canViewRocketChatDefaultHome && <RocketChatDefaultHome />}
			{canViewGPTHome && <GPTHomePage />};
		</>
	);
};

export default HomePage;
