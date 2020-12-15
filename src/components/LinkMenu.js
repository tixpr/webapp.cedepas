import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './LinkMenu.scss';

export default function LinkMenu({to='#', icon=null, text='Link'}){
	return (
		<Link to={to} className="flex-column nav-link">
			<FontAwesomeIcon icon={icon} size="2x" />
			<span>
				{text}
			</span>
		</Link>
	);
};