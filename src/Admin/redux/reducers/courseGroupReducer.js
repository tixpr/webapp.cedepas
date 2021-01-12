import {
	load_get_course_group_type,
	clear_get_course_group_type,
	get_course_group_type,
	get_course_group_error_type,
} from "../actions/courseGroupActions";

const initial = {
	course: null,
	teacher: null,
	students: null,
	notes: null,
	presences: null,
	get_course_group_load: true,
	get_course_group_success: false,
	get_course_group_errors: null,
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
		default:
			return state;
	}
};

export default courseGroupReducer;
