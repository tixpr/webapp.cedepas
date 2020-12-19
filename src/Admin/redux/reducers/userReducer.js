import {
	post_user_type,
	post_user_error_type,
	load_user_type,
	clear_user_message_action_type
} from "../actions/userActions";

const initial = {
	user:null,
	action_error: null,
	action_success: null,
	is_load: false,
};

const userReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case post_user_type:
			return Object.assign(state, {
				action_success: payload,
				is_load: false,
				action_error: null,
			});
		case post_user_error_type:
			return Object.assign(state, {
				action_error: payload,
				is_load: false,
				action_success: null,
			});
		case load_user_type:
			return Object.assign(state, {
				is_load: true,
				action_error: null,
				action_success: null
			});
		case clear_user_message_action_type:
			return Object.assign(state,{
				is_load: false,
				action_error: null,
				action_success: null
			});
		default:
			return state;
	}
};

export default userReducer;
