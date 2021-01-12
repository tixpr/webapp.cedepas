import React from "react";
import clsx from "clsx";
import "./Header.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Text from "./Text";
import Back from "./Back";
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
			<div className={clsx("flex-row grow", !lg && "justify-center")}>
				<Link to="/" className="flex-row align-center justify-center">
					<Text h2 className="text-white">
						CEDEPAS-CENTRO
					</Text>
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
