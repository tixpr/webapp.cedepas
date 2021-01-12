import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./LinkMenu.scss";
import clsx from "clsx";

export default function LinkMenu({ to = "#", icon = null, text = "Link" }) {
	const {pathname} = useLocation();
	let active = pathname.split("/")[1] === to.split("/")[1];
	return (
		<NavLink
			to={to}
			exact
			className={clsx(
				"grow flex-column justify-start",
				'align-center nav-link',
				active&&'text-dark bg-warning',
				!active&&'text-white'
			)}
		>
			<div>
				<FontAwesomeIcon icon={icon} size="2x" />
			</div>
			<span>{text}</span>
		</NavLink>
	);
}
