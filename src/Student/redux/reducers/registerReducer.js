import {
	clear_get_groups_register_type,
	get_groups_register_type,
	get_groups_register_error_type,
	clear_get_course_groups_reg_type,
	get_course_groups_reg_type,
	get_course_groups_reg_error_type,
	load_post_register_type,
	clear_post_register_type,
	post_register_type,
	post_register_error_type,
} from "../actions/registerActions";

const init = {
	groups: [],
	courses: [],
	load: true,
	errors: null,
	get_load: true,
	get_errors: null,
	post_load: false,
	post_errors: null,
};

const registerReducer = (state = init, { type, payload }) => {
	switch (type) {
		case clear_get_groups_register_type:
			return Object.assign(state, {
				groups: [],
				load: true,
				errors: null,
			});
		case get_groups_register_type:
			return Object.assign(state, {
				groups: payload,
				load: false,
				errors: null,
			});
		case get_groups_register_error_type:
			return Object.assign(state, {
				groups: [],
				load: false,
				errors: payload,
			});
		case clear_get_course_groups_reg_type:
			return Object.assign(state, {
				courses: [],
				get_load: true,
				get_errors: null,
			});
		case get_course_groups_reg_type:
			return Object.assign(state, {
				courses: payload,
				get_load: false,
				get_errors: null,
			});
		case get_course_groups_reg_error_type:
			return Object.assign(state, {
				courses: [],
				get_load: false,
				get_errors: payload,
			});
		case load_post_register_type:
			return Object.assign(state, {
				post_load: true,
				post_errors: null,
			});
		case clear_post_register_type:
			return Object.assign(state, {
				post_load: false,
				post_errors: null,
			});
		case post_register_type:
			return Object.assign(state, {
				courses: payload,
				post_load: false,
				post_errors: null,
			});
		case post_register_error_type:
			return Object.assign(state, {
				post_load: false,
				post_errors: payload,
			});
		default:
			return state;
	}
};

export default registerReducer;
