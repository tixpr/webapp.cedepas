import React from "react";
import { Switch, Route } from "react-router-dom";
//vistas
import HomeView from "../components/HomeView";
import GroupsView from "./views/HomeView";
import LibraryView from "../components/LibraryView";
import GroupView from "./views/GroupView";
import CourseView from "./views/CourseView";
import PagosView from "./views/PagosView";
import GroupsRegisterView from "./views/GroupsRegisterView";
import CoursesGroupRegisterView from "./views/CoursesGroupRegisterView";
import NotView from "../views/NotView";

//iconos
import {
	faFolderOpen,
	faBookReader,
	faIdCard,
} from "@fortawesome/free-solid-svg-icons";

export const student_menu = [
	{
		to: "/academic",
		icon: faFolderOpen,
		text: "Cursos",
	},
	{
		to: "/matriculas",
		icon: faIdCard,
		text: "Matriculas",
	},
	{
		to: "/library",
		icon: faBookReader,
		text: "Biblioteca",
	},
];

const Student = () => {
	return (
		<Switch>
			<Route exact path="/" component={HomeView} />
			<Route path="/academic">
				<Switch>
					<Route exact path="/academic/" component={GroupsView} />
					<Route
						exact
						path="/academic/group/:group_id"
						component={GroupView}
					/>
					<Route
						exact
						path="/academic/group/:group_id/:course_group_id"
						component={CourseView}
					/>
					<Route
						exact
						path="/academic/group/:group_id/:course_group_id/pagos"
						component={PagosView}
					/>
					<Route path="*" component={NotView} />
				</Switch>
			</Route>
			<Route path="/matriculas">
				<Switch>
					<Route
						exact
						path="/matriculas/"
						component={GroupsRegisterView}
					/>
					<Route
						exact
						path="/matriculas/:group_id"
						component={CoursesGroupRegisterView}
					/>
					<Route path="*" component={NotView} />
				</Switch>
			</Route>
			<Route exact path="/library" component={LibraryView} />
			<Route path="*" component={NotView} />
		</Switch>
	);
};

export default Student;
