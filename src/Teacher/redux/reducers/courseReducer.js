import {
	reset_course_group_type,
	get_course_group_type,
	get_course_group_error_type,
	load_post_note_type,
	reset_post_note_type,
	post_note_type,
	post_note_error_type,
	load_post_presence_type,
	reset_post_presence_type,
	post_presence_type,
	post_presence_error_type,
	load_put_user_note_type,
	reset_put_user_note_type,
	put_user_note_type,
	put_user_note_error_type,
	load_put_user_presence_type,
	reset_put_user_presence_type,
	put_user_presence_type,
	put_user_presence_error_type,
	load_delete_note_type,
	reset_delete_note_type,
	delete_note_type,
	delete_note_error_type,
	load_delete_presence_type,
	reset_delete_presence_type,
	delete_presence_type,
	delete_presence_error_type,
} from "../actions/courseActions";

const initial = {
	course: null,
	teacher: null,
	students: null,
	notes: null,
	presences: null,
	load: true,
	errors: null,
	post_note_load: false,
	post_note_errors: null,
	post_note_success: false,
	post_presence_load: false,
	post_presence_errors: null,
	post_presence_success: false,
	put_user_note_load: false,
	put_user_note_errors: null,
	put_user_note_success: false,
	put_user_presence_load: false,
	put_user_presence_errors: null,
	put_user_presence_success: false,
	delete_note_load: false,
	delete_note_errors: null,
	delete_note_success: null,
	delete_presence_load: false,
	delete_presence_errors: null,
	delete_presence_success: null,
};

const courseReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case reset_course_group_type:
			return Object.assign(state, {
				course: null,
				teacher: null,
				students: null,
				notes: null,
				presences: null,
				load: true,
				errors: null,
			});
		case get_course_group_type:
			return Object.assign(state, {
				load: false,
				errors: null,
				...payload,
			});
		case get_course_group_error_type:
			return Object.assign(state, {
				load: false,
				errors: payload,
				course: null,
				teacher: null,
				students: null,
				notes: null,
				presences: null,
			});
		case load_put_user_note_type:
			return Object.assign(state, {
				put_user_note_load: true,
				put_user_note_errors: null,
				put_user_note_success: false,
			});
		case reset_put_user_note_type:
			return Object.assign(state, {
				put_user_note_load: false,
				put_user_note_errors: null,
				put_user_note_success: false,
			});
		case put_user_note_type:
			return Object.assign(state, {
				notes: payload,
				put_user_note_load: false,
				put_user_note_errors: null,
				put_user_note_success: true,
			});
		case put_user_note_error_type:
			return Object.assign(state, {
				put_user_note_load: false,
				put_user_note_errors: payload,
				put_user_note_success: false,
			});
		case load_put_user_presence_type:
			return Object.assign(state, {
				put_user_presence_load: true,
				put_user_presence_errors: null,
				put_user_presence_success: false,
			});
		case reset_put_user_presence_type:
			return Object.assign(state, {
				put_user_presence_load: false,
				put_user_presence_errors: null,
				put_user_presence_success: false,
			});
		case put_user_presence_type:
			return Object.assign(state, {
				presences: payload,
				put_user_presence_load: false,
				put_user_presence_errors: null,
				put_user_presence_success: true,
			});
		case put_user_presence_error_type:
			return Object.assign(state, {
				put_user_presence_load: false,
				put_user_presence_errors: payload,
				put_user_presence_success: false,
			});
		case load_delete_note_type:
			return Object.assign(state, {
				delete_note_load: true,
				delete_note_errors: null,
				delete_note_success: false,
			});
		case reset_delete_note_type:
			return Object.assign(state, {
				delete_note_load: false,
				delete_note_errors: null,
				delete_note_success: false,
			});
		case delete_note_type:
			return Object.assign(state, {
				notes: payload,
				delete_note_load: false,
				delete_note_errors: null,
				delete_note_success: true,
			});
		case delete_note_error_type:
			return Object.assign(state, {
				delete_note_load: false,
				delete_note_errors: payload,
				delete_note_success: false,
			});
		case load_delete_presence_type:
			return Object.assign(state, {
				delete_presence_load: true,
				delete_presence_errors: null,
				delete_presence_success: false,
			});
		case reset_delete_presence_type:
			return Object.assign(state, {
				delete_presence_load: false,
				delete_presence_errors: null,
				delete_presence_success: false,
			});
		case delete_presence_type:
			return Object.assign(state, {
				presences: payload,
				delete_presence_load: false,
				delete_presence_errors: null,
				delete_presence_success: true,
			});
		case delete_presence_error_type:
			return Object.assign(state, {
				delete_presence_load: false,
				delete_presence_errors: payload,
				delete_presence_success: false,
			});
		case load_post_note_type:
			return Object.assign(state, {
				post_note_load: true,
				post_note_errors: null,
				post_note_success: false,
			});
		case reset_post_note_type:
			return Object.assign(state, {
				post_note_load: false,
				post_note_errors: null,
				post_note_success: false,
			});
		case post_note_type:
			return Object.assign(state, {
				notes: payload,
				post_note_load: false,
				post_note_errors: null,
				post_note_success: true,
			});
		case post_note_error_type:
			return Object.assign(state, {
				post_note_load: false,
				post_note_errors: payload,
				post_note_success: false,
			});
		case load_post_presence_type:
			return Object.assign(state, {
				post_presence_load: true,
				post_presence_errors: null,
				post_presence_success: false,
			});
		case reset_post_presence_type:
			return Object.assign(state, {
				post_presence_load: false,
				post_presence_errors: null,
				post_presence_success: false,
			});
		case post_presence_type:
			return Object.assign(state, {
				presences: payload,
				post_presence_load: false,
				post_presence_errors: null,
				post_presence_success: true,
			});
		case post_presence_error_type:
			return Object.assign(state, {
				post_presence_load: false,
				post_presence_errors: payload,
				post_presence_success: false,
			});

		default:
			return state;
	}
};

export default courseReducer;
