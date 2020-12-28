import React from "react";
import clsx from 'clsx';
import { useMediaQuery } from "react-responsive";
//componentes
import Drawer from "../components/Drawer";
//Rutas
import { Switch, Route } from "react-router-dom";
//Vistas
import HomeView from "./views/HomeView";
import UsersView from "./views/UsersView";
import GroupsView from "./views/GroupsView";
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
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	return (
		<div
			className={clsx(
				!lg && "flex-column-reverse",
				lg && "flex-row",
				"grow justify-start overflow-hidden"
			)}
		>
			<Drawer main_menu={admin_menu} />
			<main className="grow bg-grey-200 overflow-y">
				<Switch>
					<Route exact path='/' component={HomeView} />
					<Route path={`/users`} component={UsersView} />
					<Route path={`/groups`} component={GroupsView} />
					<Route path={`/payments`} component={PaymentsView} />
					<Route path="*" component={NotView} />
				</Switch>
			</main>
		</div>
	);
};

export default Admin;
