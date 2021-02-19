import axios from "axios";
import err_fnc from "../../components/err_fnc";

const setDefaultRole = (roles) => {
	if (roles.length > 1) {
		window.localStorage.setItem("ui_mode", roles[roles.length - 1]);
	}
	if (roles.length === 1) {
		window.localStorage.setItem("ui_mode", roles[0]);
	}
};

export const is_login_type = "IS_LOGIN";
export const is_login_error_type = "IS_LOGIN_ERROR";

export const isLoginAction = () => {
	return (dispatch) => {
		axios
			.get("/api/user")
			.then(({ data }) => {
				const { roles } = data.data;
				const ls_role = window.localStorage.getItem("ui_mode");
				if (ls_role && ls_role.length > 0) {
					if (!roles.includes(ls_role)) {
						setDefaultRole(roles);
					}
				} else {
					setDefaultRole(roles);
				}
				return dispatch({
					type: is_login_type,
					payload: data.data,
				});
			})
			.catch(() => {
				return dispatch({
					type: is_login_error_type,
					payload: null,
				});
			});
	};
};

export const load_login_type = "load_login_user";
export const loadLoginAction = () => {
	return {
		type: load_login_type,
	};
};

export const login_type = "LOGIN_USER";
export const login_error_type = "LOGIN_ERROR";

export const loginAction = (d) => {
	return (dispatch) => {
		axios
			.get("/sanctum/csrf-cookie")
			.then(() => {
				axios
					.post("/login", d)
					.then(({ data }) => {
						const { roles } = data.data;
						const ls_role = window.localStorage.getItem("ui_mode");
						if (ls_role && ls_role.length > 0) {
							if (!roles.includes(ls_role)) {
								setDefaultRole(roles);
							}
						} else {
							setDefaultRole(roles);
						}
						return dispatch({
							type: login_type,
							payload: data.data,
						});
					})
					.catch(({ response, message }) =>
						err_fnc(dispatch, login_error_type, response, message)
					);
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, login_error_type, response, message)
			);
	};
};

export const logout_type = "logout";
export const logout_error_type = "logout_error";
export const logoutAction = () => {
	return (dispatch) => {
		axios
			.post("/logout")
			.then(() => {
				return dispatch({
					type: logout_type,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, logout_error_type, response, message)
			);
	};
};

export const load_logout_type = "load_logout_user";
export const loadLogoutAction = () => {
	return {
		type: load_logout_type,
	};
};
