import {
	get_courses_with_group_type,
	get_courses_with_group_error_type
} from "../../actions/groups/viewGroupActions";

const initial = {
	data: [],
	errors: null,
	is_load: true,
};

const coursesReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case get_courses_with_group_type:
			return Object.assign(state, {
				data: payload,
				is_load: false,
				errors: null,
			});
		case get_courses_with_group_error_type:
			return Object.assign(state, {
				data: [],
				is_load: false,
				errors: payload,
			});
		default:
			return state;
	}
};

export default coursesReducer;