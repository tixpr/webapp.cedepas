import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({
	component: Component,
	children,
	onChange,
	...others
}) => {
	const user = useSelector((state) => state.auth.user);
	if (!user) {
		return (
			<Redirect
				to={{
					pathname: "/login",
					state: { from: others.location },
				}}
			/>
		);
	}
	return (
		<Route
			{...others}
			onChange={onChange}
			render={(props) => (children ? children : <Component {...props} />)}
		/>
	);
};

export default PrivateRoute;
