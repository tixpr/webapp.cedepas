import axios from "axios";

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
			.get("api/user")
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

export const loginAction = (email, password) => {
	return (dispatch) => {
		axios
			.get("/sanctum/csrf-cookie")
			.then(() => {
				axios
					.post("/login", {
						email,
						password,
					})
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
					.catch(({ response, message }) => {
						if (response) {
							return dispatch({
								type: login_error_type,
								payload: {
									data: response.data,
									status: response.status,
								},
							});
						}
						return dispatch({
							type: login_error_type,
							payload: message,
						});
					});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: login_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: login_error_type,
					payload: message,
				});
			});
	};
};

export const logout_type = "logout";
export const logout_error_type = "logout_error";
export const logoutAction = () => {
	return (dispatch) => {
		axios
			.post("/logout")
			.then((res) => {
				console.info("logout success", res);
				return dispatch({
					type: logout_type,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					return dispatch({
						type: logout_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: logout_error_type,
					payload: message,
				});
			});
	};
};

export const load_logout_type = "load_logout_user";
export const loadLogoutAction = () => {
	return {
		type: load_logout_type,
	};
};
