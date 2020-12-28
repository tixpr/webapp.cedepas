import {
	load_get_courses_type,
	clear_get_courses_type,
	get_courses_type,
	get_courses_error_type,
	load_get_teachers_type,
	get_teachers_type,
	get_teachers_error_type,
	load_post_course_type,
	clear_post_course_type,
	post_course_type,
	post_course_error_type,
	load_put_course_type,
	clear_put_course_type,
	put_course_type,
	put_course_error_type,
	load_delete_course_type,
	clear_delete_course_type,
	delete_course_type,
	delete_course_error_type,
} from "../actions/coursesActions";

const initial = {
	data: [],
	teachers: [],
	get_courses_errors: null,
	get_courses_success: false,
	get_courses_load: true,
	get_teachers_errors: null,
	get_teachers_success: false,
	get_teachers_load: true,
	post_course_errors: null,
	post_course_success: false,
	post_course_load: false,
	put_course_errors: null,
	put_course_success: false,
	put_course_load: false,
	delete_course_errors: null,
	delete_course_success: false,
	delete_course_load: false,
};

const coursesReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case load_get_courses_type:
			return Object.assign(state, {
				get_courses_load: true,
				get_courses_errors: null,
				get_courses_success: false,
			});
		case clear_get_courses_type:
			return Object.assign(state, {
				get_courses_errors: null,
				get_courses_success: false,
				get_courses_load: false,
			});
		case get_courses_type:
			return Object.assign(state, {
				data: payload,
				get_courses_success: true,
				get_courses_load: false,
				get_courses_errors: null,
			});
		case get_courses_error_type:
			return Object.assign(state, {
				data: [],
				get_courses_errors: payload,
				get_courses_success: false,
				get_courses_load: false,
			});
		case load_get_teachers_type:
			return Object.assign(state, {
				get_teacher_errors: null,
				get_teachers_success: false,
				get_teachers_load: true,
			});
		case get_teachers_type:
			return Object.assign(state, {
				teachers: payload,
				get_teacher_errors: null,
				get_teachers_success: true,
				get_teachers_load: false,
			});
		case get_teachers_error_type:
			return Object.assign(state, {
				get_teachers_load: false,
				get_teachers_errors: payload,
				get_teachers_success: false,
			});
		case load_post_course_type:
			return Object.assign(state, {
				post_course_load: true,
				post_course_errors: null,
				post_course_success: false,
			});
		case clear_post_course_type:
			return Object.assign(state, {
				post_course_errors: null,
				post_course_success: false,
				post_course_load: false,
			});
		case post_course_type:
			return Object.assign(state, {
				data: payload,
				post_course_success: true,
				post_course_load: false,
				post_course_errors: null,
			});
		case post_course_error_type:
			return Object.assign(state, {
				data: [],
				post_course_errors: payload,
				post_course_success: false,
				post_course_load: false,
			});
		case load_put_course_type:
			return Object.assign(state, {
				put_course_load: true,
				put_course_errors: null,
				put_course_success: false,
			});
		case clear_put_course_type:
			return Object.assign(state, {
				put_course_errors: null,
				put_course_success: false,
				put_course_load: false,
			});
		case put_course_type:
			return Object.assign(state, {
				data: payload,
				put_course_success: true,
				put_course_load: false,
				put_course_errors: null,
			});
		case put_course_error_type:
			return Object.assign(state, {
				put_course_errors: payload,
				put_course_success: false,
				put_course_load: false,
			});
		case load_delete_course_type:
			return Object.assign(state, {
				delete_course_load: true,
				delete_course_errors: null,
				delete_course_success: false,
			});
		case clear_delete_course_type:
			return Object.assign(state, {
				delete_course_errors: null,
				delete_course_success: false,
				delete_course_load: false,
			});
		case delete_course_type:
			return Object.assign(state, {
				data: payload,
				delete_course_success: true,
				delete_course_load: false,
				delete_course_errors: null,
			});
		case delete_course_error_type:
			return Object.assign(state, {
				delete_course_errors: payload,
				delete_course_success: false,
				delete_course_load: false,
			});
		default:
			return state;
	}
};

export default coursesReducer;
