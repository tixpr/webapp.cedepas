export const change_mode_user_type = "CHANGE_USER_MODE";

export const changeUserModeAction = (mode) => {
	return {
		type: change_mode_user_type,
		payload: mode,
	};
};
