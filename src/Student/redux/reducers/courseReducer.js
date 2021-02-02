import {
	reset_course_group_type,
	get_course_group_type,
	get_course_group_error_type,
} from "../actions/courseActions";

const initial = {
	course: null,
	teacher: null,
	notes: null,
	presences: null,
	user_notes: null,
	user_presences: null,
	load: true,
	errors: null,
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
				user_notes: null,
				user_presences: null,
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
				user_notes: null,
				user_presences: null,
				notes: null,
				presences: null,
			});
		default:
			return state;
	}
};

export default courseReducer;
