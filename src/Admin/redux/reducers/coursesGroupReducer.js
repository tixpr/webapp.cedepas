import {
	load_get_courses_group_type,
	clear_get_courses_group_type,
	get_courses_group_type,
	get_courses_group_error_type,
	load_get_courses_teachers_type,
	clear_get_courses_teachers_type,
	get_courses_teachers_type,
	get_courses_teachers_error_type,
	load_post_course_group_type,
	clear_post_course_group_type,
	post_course_group_type,
	post_course_group_error_type,
	load_put_course_group_type,
	clear_put_course_group_type,
	put_course_group_type,
	put_course_group_error_type,
	load_delete_course_group_type,
	clear_delete_course_group_type,
	delete_course_group_type,
	delete_course_group_error_type,
} from "../actions/coursesGroupActions";

const initial = {
	data: [],
	teachers: [],
	courses: [],
	get_courses_group_success: false,
	get_courses_group_errors: null,
	get_courses_group_load: true,
	get_courses_teachers_success: false,
	get_courses_teachers_errors: null,
	get_courses_teachers_load: true,
	post_course_group_success: false,
	post_course_group_errors: null,
	post_course_group_load: false,
};

const coursesGroupReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case load_get_courses_group_type:
			return Object.assign(state, {
				get_courses_group_load: true,
				get_courses_group_errors: null,
				get_courses_group_success: false,
			});
		case clear_get_courses_group_type:
			return Object.assign(state, {
				get_courses_group_errors: null,
				get_courses_group_success: false,
				get_courses_group_load: true,
			});
		case get_courses_group_type:
			return Object.assign(state, {
				data: payload,
				get_courses_group_success: true,
				get_courses_group_load: false,
				get_courses_group_errors: null,
			});
		case get_courses_group_error_type:
			return Object.assign(state, {
				data: [],
				get_courses_group_errors: payload,
				get_courses_group_success: false,
				get_courses_group_load: false,
			});
		case load_get_courses_teachers_type:
			return Object.assign(state, {
				get_courses_teachers_load: true,
				get_courses_teachers_errors: null,
				get_courses_teachers_success: false,
			});
		case clear_get_courses_teachers_type:
			return Object.assign(state, {
				courses: [],
				teachers: [],
				get_courses_teachers_errors: null,
				get_courses_teachers_success: false,
				get_courses_teachers_load: true,
			});
		case get_courses_teachers_type:
			return Object.assign(state, {
				courses: payload.courses,
				teachers: payload.teachers,
				get_courses_teachers_success: true,
				get_courses_teachers_load: false,
				get_courses_teachers_errors: null,
			});
		case get_courses_teachers_error_type:
			return Object.assign(state, {
				courses: [],
				teachers: [],
				get_courses_teachers_errors: payload,
				get_courses_teachers_success: false,
				get_courses_teachers_load: false,
			});
		case load_post_course_group_type:
			return Object.assign(state, {
				post_course_group_load: true,
				post_course_group_errors: null,
				post_course_group_success: false,
			});
		case clear_post_course_group_type:
			return Object.assign(state, {
				post_course_group_errors: null,
				post_course_group_success: false,
				post_course_group_load: false,
			});
		case post_course_group_type:
			return Object.assign(state, {
				data: payload.data,
				courses: payload.courses,
				post_course_group_success: true,
				post_course_group_load: false,
				post_course_group_errors: null,
			});
		case post_course_group_error_type:
			return Object.assign(state, {
				data: [],
				post_course_group_errors: payload,
				post_course_group_success: false,
				post_course_group_load: false,
			});
		case load_put_course_group_type:
			return Object.assign(state, {
				put_course_group_load: true,
				put_course_group_errors: null,
				put_course_group_success: false,
			});
		case clear_put_course_group_type:
			return Object.assign(state, {
				put_course_group_errors: null,
				put_course_group_success: false,
				put_course_group_load: false,
			});
		case put_course_group_type:
			return Object.assign(state, {
				data: payload,
				put_course_group_success: true,
				put_course_group_load: false,
				put_course_group_errors: null,
			});
		case put_course_group_error_type:
			return Object.assign(state, {
				put_course_group_errors: payload,
				put_course_group_success: false,
				put_course_group_load: false,
			});
		case load_delete_course_group_type:
			return Object.assign(state, {
				delete_course_group_load: true,
				delete_course_group_errors: null,
				delete_course_group_success: false,
			});
		case clear_delete_course_group_type:
			return Object.assign(state, {
				delete_course_group_errors: null,
				delete_course_group_success: false,
				delete_course_group_load: false,
			});
		case delete_course_group_type:
			return Object.assign(state, {
				data: payload,
				delete_course_group_success: true,
				delete_course_group_load: false,
				delete_course_group_errors: null,
			});
		case delete_course_group_error_type:
			return Object.assign(state, {
				delete_course_group_errors: payload,
				delete_course_group_success: false,
				delete_course_group_load: false,
			});

		default:
			return state;
	}
};

export default coursesGroupReducer;
