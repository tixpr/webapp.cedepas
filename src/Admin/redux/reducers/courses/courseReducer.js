import {
	clear_new_course_type,
	load_new_course_type,
	post_new_course_type,
	post_new_course_error_type,
} from "../../actions/courses/newCourseActions";

const initial = {
	errors: null,
	success: null,
	is_load: false,
};

const coursesReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case clear_new_course_type:
			return Object.assign(state, {
				is_load: false,
				errors: null,
				success: null,
			});
		case load_new_course_type:
			return Object.assign(state,{
				is_load:true,
				errors:null,
				success:null
			});
		case post_new_course_type:
			return Object.assign(state, {
				is_load: false,
				errors: null,
				success: payload,
			});
		case post_new_course_error_type:
			return Object.assign(state, {
				is_load: false,
				errors: payload,
				success: null,
			});
		default:
			return state;
	}
};

export default coursesReducer;
