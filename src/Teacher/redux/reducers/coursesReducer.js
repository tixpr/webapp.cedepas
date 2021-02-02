import {
	reset_get_courses_group_type,
	get_courses_group_type,
	get_courses_group_error_type,
} from "../actions/coursesActions";

const initial = {
	courses: [],
	load: true,
	errors: null,
};

const coursesReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case reset_get_courses_group_type:
			return Object.assign(state, {
				courses: [],
				load: true,
				errors: null,
			});
		case get_courses_group_type:
			return Object.assign(state, {
				courses: payload,
				load: false,
				errors: null,
			});
		case get_courses_group_error_type:
			return Object.assign(state, {
				courses: [],
				load: false,
				errors: payload,
			});
		default:
			return state;
	}
};

export default coursesReducer;
