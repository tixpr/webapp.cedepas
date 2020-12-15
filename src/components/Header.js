import React from 'react';
import './Header.scss';
import {useSelector, useDispatch} from 'react-redux';
import {logoutAction} from '../redux/actions/authActions';

const Header = (props)=>{
	const user = useSelector(state=>state.auth.user);
	const dispatch= useDispatch();
	return (
		<header className="flex-row header">
			<div className="flex-row grow flex-center">
			</div>
			<div className="flex-row flex-center">
			</div>
			<div className="flex-row flex-center">
				<div className="h-user-menu">
					{(user)?(<button onClick={()=>dispatch(logoutAction())}>Salir</button>):(null)}
				</div>
			</div>
		</header>
	);
};

export default Header;