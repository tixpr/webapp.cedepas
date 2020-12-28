import {
	get_courses_type,
	get_courses_error_type,
	load_courses_type,
} from "../../actions/courses/coursesActions";

const initial = {
	data: [],
	errors: null,
	is_load: true,
};

const coursesReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case get_courses_type:
			return Object.assign(state, {
				...payload,
				is_load: false,
				errors: null,
			});
		case get_courses_error_type:
			return Object.assign(state, {
				data: [],
				is_load: false,
				errors: payload,
			});
		case load_courses_type:
			return Object.assign(state, {
				is_load: true,
				errors: null,
			});
		default:
			return state;
	}
};

export default coursesReducer;