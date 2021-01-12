import {
	load_get_course_type,
	clear_get_course_type,
	get_course_error_type,
	get_course_type,
} from "../actions/courseActions";

const initial = {
	id: null,
	name: null,
	teacher: null,
	students: [],
	get_course_load: true,
	get_course_errors: null,
	get_course_success: false,
};

const courseReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case load_get_course_type:
			return Object.assign(state, {
				get_course_load: true,
				get_course_errors: null,
				get_course_success: false,
			});
		case clear_get_course_type:
			return Object.assign(state, {
				get_course_load: false,
				get_course_errors: null,
				get_course_success: false,
			});
		case get_course_type:
			return Object.assign(state, {
				...payload,
				get_course_load: false,
				get_course_success: true,
				get_course_errors: null,
			});
		case get_course_error_type:
			return Object.assign(state, {
				get_course_load: false,
				get_course_success: false,
				get_course_errors: payload,
			});
		default:
			return state;
	}
};

export default courseReducer;
