import axios from "axios";
export const get_user_info_type = "GET_USER_INFO";
export const get_user_info_error_type = "GET_USER_INFO_ERROR";

export const getUserInfoAction = (user_id) => {
	return (dispatch) => {
		axios
			.get(`api/users/${user_id}`)
			.then(({ data }) => {
				return dispatch({
					type: get_user_info_type,
					payload: data.message,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: get_user_info_error_type,
						payload: response.data,
					});
				}
				return dispatch({
					type: get_user_info_error_type,
					payload: message,
				});
			});
	};
};

export const set_load_info_user_type = "SET_LOAD_INFO_USER";
export const setLoadInfoUser = () => {
	return {
		type: set_load_info_user_type,
	};
};

export const clear_action_user_info_type = "CLEAR_ACTION_USER_INFO";

export const clearActionUserInfo = () => {
	return {
		type: clear_action_user_info_type,
	};
};
