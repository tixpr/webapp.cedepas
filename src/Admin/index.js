import React from "react";
//Rutas
import { Switch, Route } from "react-router-dom";
//Vistas
import HomeView from "../components/HomeView";
import UsersView from "./views/UsersView";
import PlanView from "./views/PlanView";
import GroupsView from "./views/GroupsView";
import PagosView from "./views/PagosView";
import LibraryView from "./views/LibraryView";
import NotView from "../views/NotView";
//Iconos para el menu
import {
	faUsers,
	faFolder,
	faFolderPlus,
	faBookReader,
} from "@fortawesome/free-solid-svg-icons";
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
		icon: faFolderPlus,
		text: "Grupos",
	},
	{
		to: "/pagos",
		icon: faPaypal,
		text: "Pagos",
	},
	{
		to: "/library",
		icon: faBookReader,
		text: "Biblioteca",
	},
];

const Admin = () => {
	return (
		<Switch>
			<Route exact path="/" component={HomeView} />
			<Route path={`/users`} component={UsersView} />
			<Route path={`/plan`} component={PlanView} />
			<Route path={`/groups`} component={GroupsView} />
			<Route path={`/pagos`} component={PagosView} />
			<Route path={"/library"} component={LibraryView} />
			<Route path="*" component={NotView} />
		</Switch>
	);
};

export default Admin;
