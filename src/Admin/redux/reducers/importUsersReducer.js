import {
	post_import_users_type,
	post_import_users_error_type,
	clear_import_users_type
} from "../actions/importUsersActions";

const initial = {
	action_error: null,
	action_success:null
};

const importUsersReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case post_import_users_type:
			return Object.assign(state, {
				action_success: payload,
				action_error: null,
			});
		case post_import_users_error_type:
			return Object.assign(state,{
				action_error: payload,
				action_success: null
			});
		case clear_import_users_type:
			return Object.assign(state,{
				action_error:null,
				action_success:null
			});
		default:
			return state;
	}
};
export default importUsersReducer;