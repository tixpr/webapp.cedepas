import React from "react";
//Rutas
import { Switch, Route } from "react-router-dom";

//Vistas
import HomeView from "../components/HomeView";
import GroupsView from "./views/HomeView";
import GroupView from "./views/GroupView";
import CourseView from "./views/CourseView";
import NotView from "../views/NotView";
import LibraryView from "../components/LibraryView";

//iconos
import { faFolderOpen, faBookReader } from "@fortawesome/free-solid-svg-icons";

export const teacher_menu = [
	{
		to: "/academic",
		icon: faFolderOpen,
		text: "Cursos",
	},
	{
		to: "/library",
		icon: faBookReader,
		text: "Biblioteca",
	},
];

const Teacher = () => {
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
					<Route path="*" component={NotView} />
				</Switch>
			</Route>
			<Route exact path="/library" component={LibraryView} />
			<Route path="*" component={NotView} />
		</Switch>
	);
};

export default Teacher;
