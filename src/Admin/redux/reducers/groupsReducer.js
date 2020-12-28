import {
	get_groups_type,
	get_groups_error_type,
	load_groups_type,
	clear_post_group_type,
	load_post_group_type,
	post_group_type,
	post_group_error_type,
	clear_put_group_type,
	load_put_group_type,
	put_group_type,
	put_group_error_type,
	clear_delete_group_type,
	load_delete_group_type,
	delete_group_type,
	delete_group_error_type,
} from "../actions/groupsActions";

const initial = {
	data: [],
	links: [],
	total: 0,
	groups_errors: null,
	groups_load: true,
	post_group_errors: null,
	post_group_load: false,
	post_group_success: false,
	put_group_errors: null,
	put_group_load: false,
	put_group_success: false,
	delete_group_errors: null,
	delete_group_load: false,
	delete_group_success: false,
};

const coursesReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case get_groups_type:
			return Object.assign(state, {
				data: payload.data,
				links: payload.links,
				total: payload.total,
				groups_load: false,
				groups_errors: null,
			});
		case get_groups_error_type:
			return Object.assign(state, {
				groups_load: false,
				groups_errors: payload,
			});
		case load_groups_type:
			return Object.assign(state, {
				groups_load: true,
				groups_errors: null,
			});
		case clear_post_group_type:
			return Object.assign(state, {
				post_group_load: false,
				post_group_errors: null,
				post_group_success: false,
			});
		case load_post_group_type:
			return Object.assign(state, {
				post_group_load: true,
				post_group_errors: null,
				post_group_success: false,
			});
		case post_group_type:
			return Object.assign(state, {
				data: payload.data,
				total: payload.total,
				post_group_load: false,
				post_group_errors: null,
				post_group_success: true,
			});
		case post_group_error_type:
			return Object.assign(state, {
				post_group_load: false,
				post_group_errors: payload,
				post_group_success: false,
			});
		case clear_put_group_type:
			return Object.assign(state, {
				put_group_load: false,
				put_group_errors: null,
				put_group_success: false,
			});
		case load_put_group_type:
			return Object.assign(state, {
				put_group_load: true,
				put_group_errors: null,
				put_group_success: false,
			});
		case put_group_type:
			return Object.assign(state, {
				data: payload,
				put_group_load: false,
				put_group_errors: null,
				put_group_success: true,
			});
		case put_group_error_type:
			return Object.assign(state, {
				put_group_load: false,
				put_group_errors: payload,
				put_group_success: false,
			});
		case clear_delete_group_type:
			return Object.assign(state, {
				delete_group_load: false,
				delete_group_errors: null,
				delete_group_success: false,
			});
		case load_delete_group_type:
			return Object.assign(state, {
				delete_group_load: true,
				delete_group_errors: null,
				delete_group_success: false,
			});
		case delete_group_type:
			return Object.assign(state, {
				data: payload.data,
				total: payload.total,
				delete_group_load: false,
				delete_group_errors: null,
				delete_group_success: true,
			});
		case delete_group_error_type:
			return Object.assign(state, {
				delete_group_load: false,
				delete_group_errors: payload,
				delete_group_success: false,
			});
		default:
			return state;
	}
};

export default coursesReducer;
