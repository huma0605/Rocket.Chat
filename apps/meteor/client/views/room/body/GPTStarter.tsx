import { Flex, Box, Button } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { ReactElement } from 'react';
import React from 'react';

import { useChat } from '../contexts/ChatContext';

type GPTStarterProps = {
	username: string;
	messageSize: number;
};

const GPTStarter = ({ username, messageSize }: GPTStarterProps): ReactElement => {
	const agentsConfigs = useEndpoint('GET', '/v1/agents.starters');
	const chat = useChat();

	if (!chat) {
		throw new Error('No ChatContext provided');
	}

	const { data, isLoading } = useQuery(['/v1/agents.starters', username], () => agentsConfigs({ username }));
	const handleStarterClick = async (starter: string) => {
		const text: string = starter;
		try {
			await chat?.flows.sendMessage({
				text,
			});
		} catch (error) {
			console.log(error);
		}
	};

	if (messageSize > 0) {
		return <></>;
	}

	if (isLoading) {
		return <></>;
	}

	return (
		<Box is='div' className='gpt-starter-container' display='flex' justifyContent='center' flexDirection='column'>
			<Flex.Item grow={1}>
				<Box display='flex' color='default' fontScale='h4' justifyContent='center' flexWrap='wrap'>
					{data?.agents?.[0].starters.map((starter, index) => (
						<Button margin='20px 10px' key={index} onClick={() => handleStarterClick(starter)}>
							{starter}
						</Button>
					))}
				</Box>
			</Flex.Item>
		</Box>
	);
};

export default GPTStarter;
