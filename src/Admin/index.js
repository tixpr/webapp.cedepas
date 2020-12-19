import React from "react";
//Rutas
import { Switch, Route, useRouteMatch } from "react-router-dom";
//Vistas
import HomeView from "./views/HomeView";
import UsersView from "./views/UsersView";
import CoursesView from "./views/CoursesView";
import PaymentsView from "./views/PaymentsView";
import NotView from "../views/NotView";

//Iconos para el menu
import { faUsers, faBook } from "@fortawesome/free-solid-svg-icons";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";

export const admin_menu = [
	{
		to: "/users",
		icon: faUsers,
		text: "Usuarios",
	},
	{
		to: "/courses",
		icon: faBook,
		text: "Cursos",
	},
	{
		to: "/payments",
		icon: faPaypal,
		text: "Pagos",
	},
];

const Admin = () => {
	const { url } = useRouteMatch();
	return (
		<Switch>
			<Route exact path={url} component={HomeView} />
			<Route path={`${url}users`} component={UsersView} />
			<Route path={`${url}courses`} component={CoursesView} />
			<Route path={`${url}payments`} component={PaymentsView} />
			<Route path="*" component={NotView} />
		</Switch>
	);
};

export default Admin;
