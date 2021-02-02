import React from "react";
import { Switch, Route } from "react-router-dom";
//vistas
import HomeView from "./views/HomeView";
import GroupView from "./views/GroupView";
import CourseView from "./views/CourseView";
import NotView from "../views/NotView";

const Student = () => {
	return (
		<Switch>
			<Route exact path="/" component={HomeView} />
			<Route exact path="/group/:group_id" component={GroupView} />
			<Route
				exact
				path="/course/:course_group_id"
				component={CourseView}
			/>
			<Route path="*" component={NotView} />
		</Switch>
	);
};

export default Student;
