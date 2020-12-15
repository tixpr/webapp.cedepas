import React from 'react';
import clsx from 'clsx';
import './Drawer.scss';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import LinkMenu from './LinkMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngular } from '@fortawesome/free-brands-svg-icons';

const Drawer = ({main_menu=null})=>{
	const drawer = useSelector(state=>state.drawer);
	return (
		<nav className={clsx('flex-column drawer', !drawer && 'close')}>
			<Link to="/" className="flex-row logo-cont">
				<FontAwesomeIcon icon={faAngular} size="3x"/>
			</Link>
			{main_menu && main_menu.map(mm=><LinkMenu key={mm.to} {...mm} />)}
		</nav>
	);
};

export default Drawer;