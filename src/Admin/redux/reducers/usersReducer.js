import {
	load_get_all_users_type,
	get_all_users_type,
	set_filter_user_type,
	post_user_type,
	post_user_error_type,
	load_post_user_type,
	clear_post_user_type,
	post_import_users_type,
	post_import_users_error_type,
	clear_import_users_type,
	load_put_user_type,
	clear_put_user_type,
	put_user_type,
	put_user_error_type,
	load_delete_user_type,
	clear_delete_user_type,
	delete_user_type,
	delete_user_error_type,
	load_active_user_type,
	clear_active_user_type,
	active_user_type,
	active_user_error_type,
} from "../actions/usersActions";

const initial = {
	users: [],
	links: [],
	total: 0,
	is_load: true,
	filters: {
		students: false,
		teachers: false,
		search: "",
	},
	post_user_errors: null,
	post_user_load: false,
	post_user_success: false,
	put_user_errors: null,
	put_user_load: false,
	put_user_success: false,
	delete_user_errors: null,
	delete_user_load: false,
	delete_user_success: false,
	import_users_errors: null,
	import_users_success: false,
	active_user_errors: null,
	active_user_load: false,
	active_user_success: false,
};

const usersReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case get_all_users_type:
			return Object.assign(state, {
				users: payload.data,
				total: payload.meta.total,
				links: payload.meta.links,
				is_load: false,
			});
		case set_filter_user_type:
			let t = Object.assign(state.filters, {});
			t[payload.name] = payload.value;
			return Object.assign(state, {
				filters: t,
			});
		case load_get_all_users_type:
			return Object.assign(state, {
				is_load: true,
			});
		case post_user_type:
			return Object.assign(state, {
				users: payload.data,
				total: payload.total,
				post_user_success: true,
				post_user_load: false,
				post_user_error: null,
			});
		case post_user_error_type:
			return Object.assign(state, {
				post_user_errors: payload,
				post_user_load: false,
				post_user_success: false,
			});
		case load_post_user_type:
			return Object.assign(state, {
				post_user_load: true,
				post_user_error: null,
				post_user_success: false,
			});
		case clear_post_user_type:
			return Object.assign(state, {
				post_user_load: false,
				post_user_errors: null,
				post_user_success: false,
			});
		case post_import_users_type:
			return Object.assign(state, {
				import_users_success: true,
				import_users_error: null,
			});
		case post_import_users_error_type:
			return Object.assign(state, {
				import_users_error: payload,
				import_users_success: false,
			});
		case clear_import_users_type:
			return Object.assign(state, {
				import_users_error: null,
				import_users_success: false,
			});
		case clear_put_user_type:
			return Object.assign(state, {
				put_user_errors: null,
				put_user_load: false,
				put_user_success: false,
			});
		case load_put_user_type:
			return Object.assign(state, {
				put_user_errors: null,
				put_user_load: true,
				put_user_success: false,
			});
		case put_user_type:
			return Object.assign(state, {
				users: payload,
				put_user_errors: null,
				put_user_load: false,
				put_user_success: true,
			});
		case put_user_error_type:
			return Object.assign(state, {
				put_user_errors: payload,
				put_user_load: false,
				put_user_success: false,
			});
		case clear_delete_user_type:
			return Object.assign(state, {
				delete_user_errors: null,
				delete_user_load: false,
				delete_user_success: false,
			});
		case load_delete_user_type:
			return Object.assign(state, {
				delete_user_errors: null,
				delete_user_load: true,
				delete_user_success: false,
			});
		case delete_user_type:
			return Object.assign(state, {
				users: payload.data,
				total: payload.total,
				delete_user_errors: null,
				delete_user_load: false,
				delete_user_success: true,
			});
		case delete_user_error_type:
			return Object.assign(state, {
				delete_user_errors: payload,
				delete_user_load: false,
				delete_user_success: false,
			});
		case clear_active_user_type:
			return Object.assign(state, {
				active_user_errors: null,
				active_user_load: false,
				active_user_success: false,
			});
		case load_active_user_type:
			return Object.assign(state, {
				active_user_errors: null,
				active_user_load: true,
				active_user_success: false,
			});
		case active_user_type:
			return Object.assign(state, {
				users: payload,
				active_user_errors: null,
				active_user_load: false,
				active_user_success: true,
			});
		case active_user_error_type:
			return Object.assign(state, {
				active_user_errors: payload,
				active_user_load: false,
				active_user_success: false,
			});
		default:
			return state;
	}
};
export default usersReducer;
