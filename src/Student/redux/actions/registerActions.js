import axios from "axios";
import err_fnc from "../../../components/err_fnc";

export const clear_get_groups_register_type =
	"student_clear_get_groups_register";
export const clearGetGroupsRegisterAction = () => {
	return {
		type: clear_get_groups_register_type,
	};
};

export const get_groups_register_type = "student_get_groups_register";
export const get_groups_register_error_type =
	"student_get_groups_register_error";
export const getGroupsRegisterAction = () => {
	return (dispatch) => {
		axios
			.get("/api/student/pre_register")
			.then(({ data }) => {
				return dispatch({
					type: get_groups_register_type,
					payload: data.data,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(
					dispatch,
					get_groups_register_error_type,
					response,
					message
				)
			);
	};
};
//course groups para pre matriculas en base al grupo
export const clear_get_course_groups_reg_type =
	"student_clear_get_course_groups_reg";
export const clearGetCourseGroupsRegAction = () => {
	return {
		type: clear_get_course_groups_reg_type,
	};
};
export const get_course_groups_reg_type = "student_get_course_groups_reg";
export const get_course_groups_reg_error_type =
	"student_get_course_groups_reg_error";
export const getCourseGroupsRegAction = (group_id) => {
	return (dispatch) => {
		axios
			.get(`/api/student/pre_register/${group_id}`)
			.then(({ data }) => {
				console.info("respuesta courses_groups register");
				return dispatch({
					type: get_course_groups_reg_type,
					payload: data.data,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(
					dispatch,
					get_course_groups_reg_error_type,
					response,
					message
				)
			);
	};
};
//registrando una pre matricula
export const load_post_register_type = "student_load_post_register";
export const loadPostRegisterAction = () => {
	return {
		type: load_post_register_type,
	};
};
export const clear_post_register_type = "student_clear_post_register";
export const clearPostRegisterAction = () => {
	return {
		type: clear_post_register_type,
	};
};
export const post_register_type = "student_post_register";
export const post_register_error_type = "student_post_register_error";
export const postRegisterAction = (course_group_id) => {
	return (dispatch, getState) => {
		axios
			.post(`/api/student/pre_register/course/${course_group_id}`)
			.then(() => {
				const ncourses = getState().student.register.courses.filter(
					(c) => c.id !== course_group_id
				);
				return dispatch({
					type: post_register_type,
					payload: ncourses,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, post_register_error_type, response, message)
			);
	};
};
