import axios from "axios";
import err_fnc from "../../../components/err_fnc";

export const load_get_course_type = "admin_load_get_course";
export const loadGetCourseAction = () => {
	return {
		type: load_get_course_type,
	};
};

export const clear_get_course_type = "admin_clear_get_course";
export const clearGetCourseAction = () => {
	return {
		type: clear_get_course_type,
	};
};

export const get_course_type = "admin_get_course";
export const get_course_error_type = "admin_get_course_error";
export const getCourseAction = (course_id) => {
	return (dispatch) => {
		axios
			.get(`api/course/${course_id}`)
			.then(({ data }) => {
				return dispatch({
					type: get_course_type,
					payload: data.data,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, get_course_error_type, response, message)
			);
	};
};
