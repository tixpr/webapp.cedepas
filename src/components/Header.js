import React from "react";
import "./Header.scss";
import { changeDrawerAction } from "../redux/actions/uiActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../img/cedepas_centro.jpg";
import { logoutAction } from "../redux/actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
	const user = useSelector((state) => state.auth.user);
	const drawer = useSelector((state) => state.ui.drawer);
	const dispatch = useDispatch();
	return (
		<header className="flex-row header bg-primary">
			<div className="flex-row grow align-center justify-start">
				<button
					onClick={() => dispatch(changeDrawerAction())}
					className="btn-menu text-white"
				>
					<FontAwesomeIcon
						icon={drawer ? faAngleDoubleLeft : faBars}
						size="2x"
					/>
				</button>
				<Link
					to="/"
					className="flex-row align-center justify-center logo-cont"
				>
					<img
						src={logo}
						alt="CEDEPAS-CENTRO"
						className="img-responsive"
					/>
				</Link>
			</div>
			<div className="flex-row flex-center"></div>
			<div className="flex-row flex-center">
				<div className="h-user-menu">
					{user ? (
						<button onClick={() => dispatch(logoutAction())}>
							Salir
						</button>
					) : null}
				</div>
			</div>
		</header>
	);
};

export default Header;
