import axios from "axios";

export const get_courses_type = "GET_courses";
export const get_courses_error_type = "GET_courses_ERROR";
export const getCoursesAction = (url=null) => {
	return (dispatch) => {
		axios
			.get(url?url:'api/courses')
			.then(({ data }) => {
				return dispatch({
					type: get_courses_type,
					payload: data,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: get_courses_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: get_courses_error_type,
					payload: message,
				});
			});
	};
};

export const load_courses_type = 'LOAD_Courses';
export const loadGroupAction = ()=>{
	return {
		type: load_courses_type
	};
};