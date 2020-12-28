import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import HomeView from "./Users/HomeView";
import UserView from './Users/UserView';

const UsersView = ()=>{
	const {url} = useRouteMatch();
	return (
		<Switch>
			<Route exact path={url} component={HomeView} />
			<Route path={`${url}/:user_id`} component={UserView} />
		</Switch>
	);
};

export default UsersView;