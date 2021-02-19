import axios from "axios";
import err_fnc from "../../../components/err_fnc";

export const clear_matricula_groups_type = "admin_clear_get_matricula_groups";
export const clearMatriculaGroupsAction = () => {
	return {
		type: clear_matricula_groups_type,
	};
};

export const get_matricula_groups_type = "admin_get_matricula_groups";
export const get_matricula_groups_error_type =
	"admin_get_matricula_groups_error";
export const getMatriculaGroupsAction = (course_group_id) => {
	return (dispatch) => {
		axios
			.get(`/api/matriculas/${course_group_id}`)
			.then(({ data }) => {
				return dispatch({
					type: get_matricula_groups_type,
					payload: data.data,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(
					dispatch,
					get_matricula_groups_error_type,
					response,
					message
				)
			);
	};
};

//eliminar usuario pre matriculado
export const load_delete_matricula_student_type =
	"admin_load_delete_matricula_student";
export const loadDeleteMatriculaStudentAction = () => {
	return {
		type: load_delete_matricula_student_type,
	};
};

export const delete_matricula_student_type = "admin_delete_matricula_student";
export const delete_matricula_student_error_type =
	"admin_delete_matricula_student_error";
export const deleteMatriculaStudentAction = (course_group_id, user_id) => {
	return (dispatch, getState) => {
		axios
			.delete(`/api/matriculas/${course_group_id}/${user_id}`)
			.then(() => {
				return dispatch({
					type: delete_matricula_student_type,
					payload: getState().admin.matricula.data.filter(
						(st) => st.id !== user_id
					),
				});
			})
			.catch(({ response, message }) =>
				err_fnc(
					dispatch,
					delete_matricula_student_error_type,
					response,
					message
				)
			);
	};
};

//realizar matricula

export const load_matricula_students_type = "admin_load_matricula_students";
export const loadMatriculaStudentsAction = () => {
	return {
		type: load_matricula_students_type,
	};
};

export const matricula_students_type = "admin_matricula_students";
export const matricula_students_error_type = "admin_matricula_students_error";
export const matriculaStudentsAction = (course_group_id) => {
	return (dispatch) => {
		axios
			.post(`/api/matriculas/${course_group_id}`)
			.then(() => {
				return dispatch({
					type:matricula_students_type,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(
					dispatch,
					matricula_students_error_type,
					response,
					message
				)
			);
	};
};
