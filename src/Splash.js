import React from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import LoginView from "./views/LoginView";
import NotView from "./views/NotView";
import Loading from "./components/Loading";
import App from "./App";

const Splash = () => {
	//const is_load = useSelector((state) => state.auth.is_login_load);
	const is_load=true;
	const logout_load = useSelector((state) => state.auth.logout_load);
	if (is_load || logout_load) {
		return <Loading />;
	}
	return (
		<Switch>
			<Route exact strict path="/login" component={LoginView} />
			<PrivateRoute path="/" component={App} />
			<Route path="*" component={NotView} />
		</Switch>
	);
};

export default Splash;
