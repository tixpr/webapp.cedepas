import React from "react";
import clsx from "clsx";
import "./Header.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Back from "./Back";
import logo from "../images/header_logo.jpeg";
import UserButton from "./UserButton";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";

const Header = () => {
	const user = useSelector((state) => state.auth.user);
	const { pathname } = useLocation();
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	return (
		<header className="flex-row header bg-primary">
			{pathname !== "/" ? <Back text_color="white" /> : null}
			<div
				className={clsx(
					"grow flex-row align-start",
					!lg && "justify-center",
					lg && "justify-start"
				)}
			>
				<Link
					to="/"
					className="flex-row"
				>
					<div className="bg-white">
						<img
							className="logo"
							src={logo}
							alt="Seminario San Pablo"
						/>
					</div>
					<div className="flex-column align-center justify-center">
						<h1 className="tt t1 text-white">
							San Pablo
						</h1>
						<h1 className="tt t2 text-white">
							Seminario Andíno
						</h1>
					</div>
				</Link>
			</div>
			<div className="flex-row align-center"></div>
			<div className="flex-row align-center">
				{user ? <UserButton /> : null}
			</div>
		</header>
	);
};

export default Header;
