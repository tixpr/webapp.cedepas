import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeDrawerAction } from "../redux/actions/uiActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./LinkMenu.scss";
import clsx from "clsx";

export default function LinkMenu({ to = "#", icon = null, text = "Link" }) {
	const drawer = useSelector((state) => state.ui.drawer);
	const dispatch = useDispatch();
	const location = useLocation();
	let active = location.pathname.split("/")[1] === to.split("/")[1];

	return (
		<NavLink
			to={to}
			exact
			className={clsx(
				"flex-column align-center justify-start nav-link",
				active&&'text-dark bg-warning',
				!active&&'text-white'
			)}
			onClick={() => {
				drawer && dispatch(changeDrawerAction());
			}}
		>
			<div>
				<FontAwesomeIcon icon={icon} size="2x" />
			</div>
			<span>{text}</span>
		</NavLink>
	);
}
