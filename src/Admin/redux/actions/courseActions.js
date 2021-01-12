import axios from "axios";

export const load_get_course_type = "load_get_course";
export const loadGetCourseAction = () => {
	return {
		type: load_get_course_type,
	};
};

export const clear_get_course_type = "clear_get_course";
export const clearGetCourseAction = () => {
	return {
		type: clear_get_course_type,
	};
};

export const get_course_type = "get_course";
export const get_course_error_type = "get_course_error";
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
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: get_course_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: get_course_error_type,
					payload: message,
				});
			});
	};
};
