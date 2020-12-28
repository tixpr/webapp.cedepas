import {
	clear_edit_course_type,
	load_edit_course_type,
	put_edit_course_type,
	put_edit_course_error_type,
	get_edit_course_type,
	get_edit_course_error_type
} from "../../actions/courses/editCourseActions";

const initial = {
	data:null,
	errors: null,
	success: null,
	is_load: true,
};

const editCourseReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case clear_edit_course_type:
			return Object.assign(state, {
				is_load: false,
				errors: null,
				success: null,
			});
		case load_edit_course_type:
			return Object.assign(state,{
				is_load:true,
				errors:null,
				success:null
			});
		case put_edit_course_type:
			return Object.assign(state, {
				is_load: false,
				data: payload.data,
				errors: null,
				success: payload.message,
			});
		case put_edit_course_error_type:
			return Object.assign(state, {
				is_load: false,
				errors: payload,
				success: null,
			});
		case get_edit_course_type:
			return Object.assign(state,{
				data: payload,
				is_load:false,
				errors:null,
				success:null
			});
		case get_edit_course_error_type:
			return Object.assign(state,{
				data:null,
				errors:payload,
				is_load:false,
				success: null
			});
		default:
			return state;
	}
};

export default editCourseReducer;
