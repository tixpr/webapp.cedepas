import React from "react";
import clsx from "clsx";
import "./Drawer.scss";
import LinkMenu from "./LinkMenu";
import { useSelector } from "react-redux";

const Drawer = ({ main_menu = null }) => {
	const drawer = useSelector((state) => state.ui.drawer);
	return (
		<nav
			className={clsx(
				"flex-column drawer align-strech justify-start bg-dark",
				drawer && "show"
			)}
		>
			{main_menu &&
				main_menu.map((mm) => <LinkMenu key={mm.to} {...mm} />)}
		</nav>
	);
};

export default Drawer;
