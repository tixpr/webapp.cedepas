import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import HomeView from "./Users/HomeView";
import NewUserView from "./Users/NewUserView";
import ImportUsersView from './Users/ImportUsersView';

const UsersView = ()=>{
	const {url} = useRouteMatch();
	return (
		<Switch>
			<Route exact path={url} component={HomeView} />
			<Route path={`${url}/new`} component={NewUserView} />
			<Route path={`${url}/import`} component={ImportUsersView} />
		</Switch>
	);
};

export default UsersView;