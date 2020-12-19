import axios from "axios";

export const is_login_type = "IS_LOGIN";
export const is_login_error_type = "IS_LOGIN_ERROR";

export const isLoginAction = () => {
	return (dispatch) => {
		axios
			.get("api/user")
			.then((res) => {
				return dispatch({
					type: is_login_type,
					payload: res.data,
				});
			})
			.catch((err) => {
				return dispatch({
					type: is_login_error_type,
					payload: err.message,
				});
			});
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
					.then(({data}) => {
						return dispatch({
							type: login_type,
							payload: data,
						});
					})
					.catch(({response, message}) => {
						if(response){
							return dispatch({
								type: login_error_type,
								payload: {
									data:response.data,
									status:response.status
								},
							});
						}
						return dispatch({
							type: login_error_type,
							payload: message,
						});
					});
			})
			.catch(({response, message}) => {
				if(response){
					if(response.status===401){
						window.location.reload();
					}
					return dispatch({
						type: login_error_type,
						payload: {
							data:response.data,
							status:response.status
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
			.catch(({response, message}) => {
				if(response){
					return dispatch({
						type: logout_error_type,
						payload: {
							data:response.data,
							status:response.status
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
