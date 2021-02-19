import {
	is_login_type,
	is_login_error_type,
	login_type,
	login_error_type,
	logout_type,
	logout_error_type,
	load_login_type,
	load_logout_type,
} from "../actions/authActions";

const initial = {
	user: null,
	is_login_load: true,
	login_load: false,
	logout_load: false,
	login_error: null,
	logout_error: null,
};

const authReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case is_login_type:
			return Object.assign(state, {
				is_login_error: null,
				user: payload,
				is_login_load: false,
			});
		case is_login_error_type:
			return Object.assign(state, {
				is_login_error: null,
				user: null,
				is_login_load: false,
			});
		case load_login_type:
			return Object.assign(state, {
				login_load: true,
				login_error: null,
			});
		case login_type:
			return Object.assign(state, {
				user: payload,
				login_load: false,
				login_error: null,
				is_login_error: null,
			});
		case login_error_type:
			return Object.assign(state, {
				user: null,
				login_load: false,
				login_error: payload,
			});
		case load_logout_type:
			return Object.assign(state, {
				logout_error: null,
				logout_load: true,
			});
		case logout_error_type:
			return Object.assign(state, {
				logout_error: payload,
				logout_load: false,
			});
		case logout_type:
			return Object.assign(state, {
				user: null,
				logout_error: null,
				logout_load: false,
			});
		default:
			return state;
	}
};
export default authReducer;
