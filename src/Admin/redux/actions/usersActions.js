import axios from "axios";

export const get_all_users_type = "GET_ALL_USERS";
export const get_all_users_error_type = "GET_ALL_USERS_ERROR";

export const getAllUsersAction = (url = null) => {
	return (dispatch, getState) => {
		axios
			.get(url ? url : "api/users", {
				params: getState().admin.users.filters,
			})
			.then(({data}) => {
				dispatch({
					type: get_all_users_type,
					payload: data,
				});
			})
			.catch(({response, message}) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: get_all_users_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: get_all_users_error_type,
					payload: message,
				});
			});
	};
};

export const set_filter_user_type = "SET_FILTER_USER_TYPE";
export const setFilterUserAction = (filter) => {
	return {
		type: set_filter_user_type,
		payload: filter,
	};
};

export const enabled_load_type = "ENABLED_LOAD";
export const enabledLoadAction = () => {
	return {
		type: enabled_load_type,
	};
};
