import axios from "axios";

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
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: get_course_group_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: get_course_group_error_type,
					payload: message,
				});
			});
	};
};