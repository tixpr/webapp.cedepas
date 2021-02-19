import axios from "axios";
import err_fnc from "../../../components/err_fnc";

export const reset_course_group_type = "student_clear_course_group";
export const resetCourseGroupAction = () => {
	return {
		type: reset_course_group_type,
	};
};

export const get_course_group_type = "student_get_course_group";
export const get_course_group_error_type = "student_get_course_group_error";
export const getCourseGroupAction = (course_group_id) => {
	return (dispatch) => {
		axios
			.get(`api/student/course_group/${course_group_id}`)
			.then(({ data }) => {
				return dispatch({
					type: get_course_group_type,
					payload: data.data,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(
					dispatch,
					get_course_group_error_type,
					response,
					message
				)
			);
	};
};
