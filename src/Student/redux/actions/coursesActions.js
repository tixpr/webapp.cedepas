import axios from "axios";
import err_fnc from "../../../components/err_fnc";

export const reset_get_courses_group_type = "student_reset_get_courses_group";
export const resetGetCoursesGroupAction = () => {
	return {
		type: reset_get_courses_group_type,
	};
};

export const get_courses_group_type = "student_get_courses_group";
export const get_courses_group_error_type = "student_get_courses_group_error";
export const getCoursesGroupAction = (group_id) => {
	return (dispatch) => {
		axios
			.get(`api/student/groups/${group_id}`)
			.then(({ data }) => {
				return dispatch({
					type: get_courses_group_type,
					payload: data.data,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(
					dispatch,
					get_courses_group_error_type,
					response,
					message
				)
			);
	};
};
