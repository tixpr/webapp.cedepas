import {
	load_get_course_group_type,
	clear_get_course_group_type,
	get_course_group_type,
	get_course_group_error_type,
	clear_get_search_student_type,
	load_get_search_student_type,
	get_search_student_error_type,
	get_search_student_type,
	clear_post_student_course_group_type,
	load_post_student_course_group_type,
	post_student_course_group_error_type,
	post_student_course_group_type,
} from "../actions/courseGroupActions";

const initial = {
	course: null,
	teacher: null,
	students: null,
	notes: null,
	presences: null,
	search: [],
	search_load: false,
	search_errors: null,
	get_course_group_load: true,
	get_course_group_success: false,
	get_course_group_errors: null,
	post_student_load: false,
	post_student_errors: null,
	post_student_success: false,
};

const courseGroupReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case load_get_course_group_type:
			return Object.assign(state, {
				get_course_group_load: true,
				get_course_group_success: false,
				get_course_group_errors: null,
			});
		case clear_get_course_group_type:
			return Object.assign(state, {
				get_course_group_load: true,
				get_course_group_success: false,
				get_course_group_errors: null,
			});
		case get_course_group_type:
			return Object.assign(state, {
				get_course_group_load: false,
				get_course_group_success: false,
				get_course_group_errors: null,
				...payload,
			});
		case get_course_group_error_type:
			return Object.assign(state, {
				course: null,
				teacher: null,
				students: null,
				notes: null,
				presences: null,
				get_course_group_load: false,
				get_course_group_success: false,
				get_course_group_errors: payload,
			});
		case load_get_search_student_type:
			return Object.assign(state, {
				search_load: true,
				search_errors: null,
				search: [],
			});
		case clear_get_search_student_type:
			return Object.assign(state, {
				search_load: false,
				search_errors: null,
				search: [],
			});
		case get_search_student_type:
			return Object.assign(state, {
				search_load: false,
				search_errors: null,
				search: payload,
			});
		case get_search_student_error_type:
			return Object.assign(state, {
				search: [],
				search_load: false,
				search_errors: payload,
			});
		case load_post_student_course_group_type:
			return Object.assign(state, {
				post_student_load: true,
				post_student_success:false,
				post_student_errors: null,
			});
		case clear_post_student_course_group_type:
			return Object.assign(state, {
				post_student_load: false,
				post_student_success:false,
				post_student_errors: null,
			});
		case post_student_course_group_type:
			return Object.assign(state, {
				post_student_load: false,
				post_student_errors: null,
				post_student_success:true,
				students: payload,
			});
		case post_student_course_group_error_type:
			return Object.assign(state, {
				post_student_load: false,
				post_student_success:false,
				post_student_errors: payload,
			});
		default:
			return state;
	}
};

export default courseGroupReducer;
