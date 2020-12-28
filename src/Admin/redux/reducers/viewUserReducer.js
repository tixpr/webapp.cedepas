import {
	get_user_info_type,
	get_user_info_error_type,
	set_load_info_user_type,
	clear_action_user_info_type,
} from "../actions/viewUserActions";

const initial = {
	is_load: true,
	action_error: null,
	action_success: null,
};

const viewUserReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case get_user_info_type:
			return Object.assign(state, {
				is_lod: false,
				action_success: payload,
				action_error: null,
			});
		case get_user_info_error_type:
			return Object.assign(state, {
				action_error: payload,
				action_success: null,
			});
		case set_load_info_user_type:
			return Object.assign(state, {
				is_load: true,
			});
		case clear_action_user_info_type:
			return Object.assign(state, {
				action_error: null,
				action_success: null,
			});
		default:
			return state;
	}
};
export default viewUserReducer;
