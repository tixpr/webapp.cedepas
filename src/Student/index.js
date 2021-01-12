import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
//vistas
import HomeView from "./views/HomeView";
import NotView from "../views/NotView";

const Student = () => {
	const { url } = useRouteMatch();
	return (
		<Switch>
			<Route exact path={url} component={HomeView} />
			<Route exact path={`${url}/:group_id`} component={null} />
			<Route path="*" component={NotView} />
		</Switch>
	);
};

export default Student;
