import axios from "axios";

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
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: get_courses_group_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: get_courses_group_error_type,
					payload: message,
				});
			});
	};
};
