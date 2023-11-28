import type { IUser } from '@rocket.chat/core-typings';
import { Button } from '@rocket.chat/fuselage';
import { Card, CardBody, CardFooter, CardFooterWrapper, CardTitle } from '@rocket.chat/ui-client';
import { useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import type { ReactElement } from 'react';
import React from 'react';

import { goToRoomById } from '../../../lib/utils/goToRoomById';

const JoinAgentCard = (props: {
	name: string | undefined;
	description: string | undefined;
	username: string | undefined;
	ownerUserId: string;
}): ReactElement => {
	const createDirectAction = useEndpoint('POST', '/v1/dm.create.agent');
	const mutateDirectMessage = useMutation({
		mutationFn: createDirectAction,
		onSuccess: ({ room: { rid } }) => {
			goToRoomById(rid);
		},
		onError: (error: any) => {
			dispatchToastMessage({ type: 'error', message: error });
		},
	});
	const dispatchToastMessage = useToastMessageDispatch();
	const handleCreate = async ({ users }: { users: IUser['username'][] }) => {
		return mutateDirectMessage.mutateAsync({ usernames: users.join(',') });
	};

	return (
		<Card data-qa-id='homepage-join-agent-card'>
			<CardTitle>{props.name}</CardTitle>
			<CardBody>{props.description}</CardBody>
			<CardFooterWrapper>
				<CardFooter>
					<Button onClick={() => handleCreate({ users: [props.username] })}>start chat</Button>
				</CardFooter>
			</CardFooterWrapper>
		</Card>
	);
};

export default JoinAgentCard;
