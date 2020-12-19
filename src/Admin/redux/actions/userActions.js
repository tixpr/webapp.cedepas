import axios from "axios";

export const load_user_type = "load_user";
export const loadUserAction = () => {
	return {
		type: load_user_type,
	};
};

export const clear_user_message_action_type = "CLEAR_USER_MESSAGE_ACTION";
export const clearUserMessagesAction = () => {
	return {
		type: clear_user_message_action_type,
	};
};

export const post_user_type = "POST_USER";
export const post_user_error_type = "POST_USER_ERROR";

export const postUserAction = (data) => {
	return (dispatch) => {
		axios
			.post("api/users", data)
			.then(({ data }) => {
				return dispatch({
					type: post_user_type,
					payload: data.message,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: post_user_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				} else {
					return dispatch({
						type: post_user_error_type,
						payload: message,
					});
				}
			});
	};
};
