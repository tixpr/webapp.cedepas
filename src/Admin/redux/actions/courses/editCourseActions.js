import axios from "axios";

export const load_edit_course_type = "LOAD_edit_COURSE";

export const loadEditCourseAction = () => {
	return {
		type: load_edit_course_type,
	};
};

export const clear_edit_course_type = "CLEAR_edit_COURSE";

export const clearEditCoureAction = () => {
	return {
		type: clear_edit_course_type,
	};
};

export const put_edit_course_type = "put_edit_COURSE";
export const put_edit_course_error_type = "put_edit_COURSE_ERROR";

export const putEditCourseAction = (data,course_id) => {
	return (dispatch) => {
		axios
			.put(`api/courses/${course_id}`, data)
			.then(({ data }) => {
				return dispatch({
					type: put_edit_course_type,
					payload: data,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: put_edit_course_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: put_edit_course_error_type,
					payload: message,
				});
			});
	};
};

export const get_edit_course_type = "get_edit_COURSE";
export const get_edit_course_error_type = "get_edit_COURSE_ERROR";

export const getEditCourseAction = (course_id) => {
	return (dispatch) => {
		axios
			.get(`api/courses/${course_id}`)
			.then(({ data }) => {
				console.info('data get course',data);
				return dispatch({
					type: get_edit_course_type,
					payload: data,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: get_edit_course_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: get_edit_course_error_type,
					payload: message,
				});
			});
	};
};
