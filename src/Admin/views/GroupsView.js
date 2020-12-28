import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import HomeView from './Groups/HomeView';
import GroupView from './Groups/GroupView';
import CourseView from './Groups/CourseView';
import NotView from '../../views/NotView';

const GroupsView = () => {
	const {url} = useRouteMatch();
	return (
		<Switch>
			<Route exact path={url} component={HomeView} />
			<Route exact path={`${url}/:group_id`} component={GroupView} />
			<Route exact path={`${url}/:group_id/:course_id`} component={CourseView} />
			<Route path="*" component={NotView} />
		</Switch>
	);
};

export default GroupsView;
