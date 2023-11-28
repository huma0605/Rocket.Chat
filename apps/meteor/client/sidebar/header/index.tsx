import { FeaturePreview, FeaturePreviewOn, FeaturePreviewOff } from '@rocket.chat/ui-client';
import { usePermission } from '@rocket.chat/ui-contexts';
import type { ReactElement } from 'react';
import React, { lazy, memo } from 'react';

const Header = lazy(() => import('./Header'));
const GPTsHeader = lazy(() => import('./GPTsHeader'));
const HeaderUnstable = lazy(() => import('./HeaderUnstable'));

const HeaderWrapper = (): ReactElement => {
	const viewGPTsHeader = usePermission('view-gpts-sidebar-header');
	const viewRocketChatDefaultsHeader = usePermission('view-rocket-chat-default-sidebar-header');

	return (
		<FeaturePreview feature='navigationBar'>
			<FeaturePreviewOff>
				{viewRocketChatDefaultsHeader && <Header />}
				{viewGPTsHeader && <GPTsHeader />}
			</FeaturePreviewOff>
			<FeaturePreviewOn>
				<HeaderUnstable />
			</FeaturePreviewOn>
		</FeaturePreview>
	);
};

export default memo(HeaderWrapper);
