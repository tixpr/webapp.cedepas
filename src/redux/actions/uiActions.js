export const change_ui_user_mode_type = "change_ui_user_mode";

export const changeUiUserModeAction = (mode) => {
	return (dispatch, getState) => {
		const { roles } = getState().auth.user;
		if (roles.includes(mode)) {
			window.sessionStorage.setItem("ui_mode", mode);
			return dispatch({
				type: change_ui_user_mode_type,
				payload: mode,
			});
		}
		return dispatch({
			type: change_ui_user_mode_type,
			payload: getState().ui.mode,
		});
	};
};

export const get_ui_user_mode_type = "get_ui_user_mode";
export const getUiUserModeAction = () => {
	return (dispatch, getState) => {
		let ui_mode = window.sessionStorage.getItem("ui_mode");
		const roles = getState().auth.user.roles;
		if (roles.includes(ui_mode)) {
			return dispatch({
				type: get_ui_user_mode_type,
				payload: ui_mode,
			});
		} else {
			let r = roles[roles.length - 1];
			window.sessionStorage.setItem("ui_mode", r);
			return dispatch({
				type: get_ui_user_mode_type,
				payload: r,
			});
		}
	};
};
