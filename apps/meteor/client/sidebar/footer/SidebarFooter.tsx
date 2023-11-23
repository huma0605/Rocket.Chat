import type { ReactElement } from 'react';
import React from 'react';

import { useIsCallEnabled, useIsCallReady } from '../../contexts/CallContext';
import SidebarFooterDefault from './SidebarFooterDefault';
import { VoipFooter } from './voip';

const SidebarFooter = (): ReactElement => {
	const isCallEnabled = useIsCallEnabled();
	const ready = useIsCallReady();

	if (isCallEnabled && ready) {
		return <VoipFooter />;
	}

	// Don't want to have default sidebar footer
	return <></>;
};

export default SidebarFooter;
