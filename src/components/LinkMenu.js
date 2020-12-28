import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./LinkMenu.scss";
import clsx from "clsx";
import {useMediaQuery} from 'react-responsive';

export default function LinkMenu({ to = "#", icon = null, text = "Link" }) {
	const {pathname} = useLocation();
	let active = pathname.split("/")[1] === to.split("/")[1];
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	return (
		<NavLink
			to={to}
			exact
			className={clsx(
				!lg&&'flex-row grow',
				lg&&"flex-column justify-start",
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
