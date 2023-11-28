import { Box, Grid } from '@rocket.chat/fuselage';
import { useSetting, useTranslation, useEndpoint, useUserId } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { ReactElement } from 'react';
import React from 'react';

import Page from '../../components/Page/Page';
import PageScrollableContent from '../../components/Page/PageScrollableContent';
import HomePageHeader from './HomePageHeader';
import HomepageGridItem from './HomepageGridItem';
import JoinAgentCard from './cards/JoinAgentCard';

const GPTHomePage = (): ReactElement => {
	const t = useTranslation();
	const workspaceName = useSetting('Site_Name');
	const botUsers = useEndpoint('GET', '/v1/users.getBotUsers');
	const userId = useUserId();
	const { data, isLoading } = useQuery([], async () => botUsers());

	return (
		<Page color='default' data-qa='page-home' data-qa-type='default' background='tint'>
			<HomePageHeader />
			<PageScrollableContent>
				<Box is='h2' fontScale='h1' mb={20} data-qa-id='homepage-welcome-text'>
					{t('Welcome_to_workspace', { Site_Name: workspaceName })}
				</Box>
				<Grid margin='neg-x8'>
					{!isLoading &&
						userId &&
						data?.users?.map((user) => {
							if (user.username === 'rocket.cat') return null;
							return (
								<HomepageGridItem key={user._id}>
									<JoinAgentCard name={user.name} description={user.bio} username={user.username} ownerUserId={userId} />
								</HomepageGridItem>
							);
						})}
				</Grid>
			</PageScrollableContent>
		</Page>
	);
};

export default GPTHomePage;
