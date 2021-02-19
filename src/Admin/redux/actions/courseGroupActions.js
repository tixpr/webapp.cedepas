import axios from "axios";
import err_fnc from "../../../components/err_fnc";

export const load_get_course_group_type = "admin_load_get_course_group";
export const loadGetCourseGroupAction = () => {
	return {
		type: load_get_course_group_type,
	};
};

export const clear_get_course_group_type = "admin_clear_get_course_group";
export const clearGetCourseGroupAction = () => {
	return {
		type: clear_get_course_group_type,
	};
};

export const get_course_group_type = "admin_get_course_group";
export const get_course_group_error_type = "admin_get_course_group_error";
export const getCourseGroupAction = (course_group_id) => {
	return (dispatch) => {
		axios
			.get(`api/course_group/${course_group_id}`)
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

export const clear_get_search_student_type = "admin_clear_get_search_student";
export const clearGetSearchStudentAction = () => {
	return {
		type: clear_get_search_student_type,
	};
};

export const load_get_search_student_type = "admin_load_get_search_student";
export const loadGetSearchStudentAction = () => {
	return {
		type: load_get_search_student_type,
	};
};

export const get_search_student_type = "admin_get_search_student";
export const get_search_student_error_type = "admin_get_search_student_error";
export const getSearchStudentAction = (course_group_id, search) => {
	return (dispatch) => {
		axios
			.get(`api/course_group/${course_group_id}/students`, {
				params: search,
			})
			.then(({ data }) => {
				return dispatch({
					type: get_search_student_type,
					payload: data.data,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(
					dispatch,
					get_search_student_error_type,
					response,
					message
				)
			);
	};
};

export const clear_post_student_course_group_type =
	"clear_post_student_course_group";
export const cleaPostStudentCourseGroupAction = () => {
	return {
		type: clear_post_student_course_group_type,
	};
};

export const load_post_student_course_group_type =
	"load_post_student_course_group";
export const loadPostStudentCourseGroupAction = () => {
	return {
		type: load_post_student_course_group_type,
	};
};

export const post_student_course_group_type = "admin_post_student_course_group";
export const post_student_course_group_error_type =
	"post_student_course_group_error";
export const postStudentCourseGroupAction = (course_group_id, d) => {
	return (dispatch, getState) => {
		axios
			.post(`api/course_group/${course_group_id}/students`, d)
			.then(({ data }) => {
				return dispatch({
					type: post_student_course_group_type,
					payload: getState().admin.course_group.students.concat([
						data.data,
					]),
				});
			})
			.catch(({ response, message }) =>
				err_fnc(
					dispatch,
					post_student_course_group_error_type,
					response,
					message
				)
			);
	};
};
