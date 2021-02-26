import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import HomeView from "./Groups/HomeView";
import GroupView from "./Groups/GroupView";
import CourseGroupView from "./Groups/CourseGroupView";
import MatriculaView from "./Groups/MatriculaView";
import PagosView from "./Groups/PagosView";
import NotView from "../../views/NotView";

const GroupsView = () => {
	const { url } = useRouteMatch();
	return (
		<Switch>
			<Route exact path={url} component={HomeView} />
			<Route exact path={`${url}/:group_id`} component={GroupView} />
			<Route
				exact
				path={`${url}/:group_id/:course_group_id`}
				component={CourseGroupView}
			/>
			<Route
				exact
				path={`${url}/:group_id/:course_group_id/matricula`}
				component={MatriculaView}
			/>
			<Route
				exact
				path={`${url}/:group_id/:course_group_id/pagos`}
				component={PagosView}
			/>
			<Route path="*" component={NotView} />
		</Switch>
	);
};

export default GroupsView;
