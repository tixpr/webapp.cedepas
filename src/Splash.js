import React from 'react';
import {
	Switch,
	Route,
} from "react-router-dom";
import { useSelector } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import VLogin from './views/VLogin';
import VNotAllowed from './views/VNotAllowed';
import Loading from './components/Loading';
import App from './App';

const Splash = ()=>{
	const is_load = useSelector(state=>state.auth.is_load);
	if(is_load){
		return <Loading />;
	}
	return (
		<Switch>
			<Route exact strict path="/login" component={VLogin} />
			<PrivateRoute path="/" component={App} />
			<Route path="*" component={VNotAllowed} />
		</Switch>
	);
}

export default Splash;