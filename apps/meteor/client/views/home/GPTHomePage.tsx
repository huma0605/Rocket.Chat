import { Box } from '@rocket.chat/fuselage';
import { useSetting, useTranslation } from '@rocket.chat/ui-contexts';
import type { ReactElement } from 'react';
import React from 'react';

import Page from '../../components/Page/Page';
import PageScrollableContent from '../../components/Page/PageScrollableContent';
import HomePageHeader from './HomePageHeader';

const GPTHomePage = (): ReactElement => {
	const t = useTranslation();
	const workspaceName = useSetting('Site_Name');

	return (
		<Page color='default' data-qa='page-home' data-qa-type='default' background='tint'>
			<HomePageHeader />
			<PageScrollableContent>
				<Box is='h2' fontScale='h1' mb={20} data-qa-id='homepage-welcome-text'>
					{t('Welcome_to_workspace', { Site_Name: workspaceName })}
				</Box>
			</PageScrollableContent>
		</Page>
	);
};

export default GPTHomePage;
