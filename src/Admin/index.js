import React from "react";
//Rutas
import { Switch, Route } from "react-router-dom";
//Vistas
import HomeView from "./views/HomeView";
import UsersView from "./views/UsersView";
import PlanView from "./views/PlanView";
import GroupsView from "./views/GroupsView";
import PaymentsView from "./views/PaymentsView";
import NotView from "../views/NotView";
//Iconos para el menu
import { faUsers, faBook, faFolder } from "@fortawesome/free-solid-svg-icons";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";

export const admin_menu = [
	{
		to: "/users",
		icon: faUsers,
		text: "Usuarios",
	},
	{
		to: "/plan",
		icon: faFolder,
		text: "Plan",
	},
	{
		to: "/groups",
		icon: faBook,
		text: "Grupos",
	},
	{
		to: "/payments",
		icon: faPaypal,
		text: "Pagos",
	},
];

const Admin = () => {
	return (
		<Switch>
			<Route exact path="/" component={HomeView} />
			<Route path={`/users`} component={UsersView} />
			<Route path={`/plan`} component={PlanView} />
			<Route path={`/groups`} component={GroupsView} />
			<Route path={`/payments`} component={PaymentsView} />
			<Route path="*" component={NotView} />
		</Switch>
	);
};

export default Admin;
