import {
	get_active_register_type,
	get_active_register_error_type,
	load_put_active_register_type,
	put_active_register_type,
	put_active_register_error_type,
} from "../actions/registerActions";

const init = {
	register: false,
	get_load: true,
	get_success: false,
	get_errors: null,
	put_errors: null,
	put_success: false,
	put_load: false,
};

const registerReducer = (state = init, { type, payload }) => {
	switch (type) {
		case get_active_register_type:
			return Object.assign(state, {
				register: payload,
				get_load: false,
				get_errors: null,
				get_success: true,
			});
		case get_active_register_error_type:
			return Object.assign(state, {
				register: false,
				get_load: false,
				get_errors: payload,
				get_success: false,
			});
		case load_put_active_register_type:
			return Object.assign(state, {
				put_load: true,
				put_errors: null,
				put_success: false,
			});
		case put_active_register_type:
			return Object.assign(state, {
				register: payload,
				put_load: false,
				put_success: true,
				put_errors: null,
			});
		case put_active_register_error_type:
			return Object.assign(state, {
				put_load: false,
				put_success: false,
				put_errors: payload,
			});
		default:
			return state;
	}
};

export default registerReducer;
