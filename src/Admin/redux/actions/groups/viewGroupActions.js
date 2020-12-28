import axios from "axios";

export const get_courses_with_group_type = "get_courses_with_period";
export const get_courses_with_group_error_type =
	"get_courses_with_group_error";
export const getCoursesWithGroup = (period_id) => {
	return (dispatch) => {
		axios
			.get(`api/groups/${period_id}`)
			.then(({ data }) => {
				return dispatch({
					type: get_courses_with_group_type,
					payload: data,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: get_courses_with_group_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: get_courses_with_group_error_type,
					payload: message,
				});
			});
	};
};