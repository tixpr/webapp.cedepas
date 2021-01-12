import React from "react";
import clsx from "clsx";
import "./Drawer.scss";
import LinkMenu from "./LinkMenu";
import {useMediaQuery} from 'react-responsive';

const Drawer = ({ main_menu = null }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	return (
		<nav
			className={clsx(
				!lg&&"flex-row align-stretch justify-stretch",
				lg&&'flex-Column',
				"drawer bg-dark"
			)}
		>
			{main_menu &&
				main_menu.map((mm) => <LinkMenu key={mm.to} {...mm} />)}
		</nav>
	);
};

export default Drawer;
