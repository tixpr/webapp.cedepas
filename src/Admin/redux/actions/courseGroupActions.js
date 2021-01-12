import axios from "axios";
export const load_get_course_group_type = "load_get_course_group";
export const loadGetCourseGroupAction = () => {
	return {
		type: load_get_course_group_type,
	};
};

export const clear_get_course_group_type = "clear_get_course_group";
export const clearGetCourseGroupAction = () => {
	return {
		type: clear_get_course_group_type,
	};
};

export const get_course_group_type = "get_course_group";
export const get_course_group_error_type = "get_course_group_error";
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
