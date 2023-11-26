import { useMutableCallback } from '@rocket.chat/fuselage-hooks';
import { useRouteParameter, useRoute, useTranslation } from '@rocket.chat/ui-contexts';
import type { ReactElement } from 'react';
import React from 'react';

import { Contextualbar, ContextualbarHeader, ContextualbarTitle, ContextualbarClose } from '../../../components/Contextualbar';
import EditRolePageWithData from './EditRolePageWithData';

const PermissionsContextBar = (): ReactElement | null => {
	const t = useTranslation();
	const _id = useRouteParameter('_id');
	const context = useRouteParameter('context');
	const router = useRoute('admin-permissions');

	const handleCloseContextualbar = useMutableCallback(() => {
		router.push({});
	});

	return (
		(context && (
			<Contextualbar>
				<ContextualbarHeader>
					<ContextualbarTitle>{context === 'edit' ? t('Role_Editing') : t('New_role')}</ContextualbarTitle>
					<ContextualbarClose onClick={handleCloseContextualbar} />
				</ContextualbarHeader>
				<EditRolePageWithData roleId={_id} />
			</Contextualbar>
		)) ||
		null
	);
};

export default PermissionsContextBar;
