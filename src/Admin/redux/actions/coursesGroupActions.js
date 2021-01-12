import axios from "axios";

export const load_get_courses_group_type = "load_get_courses_group";
export const loadGetCoursesGroupAction = () => {
	return {
		type: load_get_courses_group_type,
	};
};

export const clear_get_courses_group_type = "clear_get_courses_group";
export const clearGetCoursesGroupAction = () => {
	return {
		type: clear_get_courses_group_type,
	};
};

export const get_courses_group_type = "get_courses_group";
export const get_courses_group_error_type = "get_courses_group_error";
export const getCoursesGroupAction = (group_id) => {
	return (dispatch) => {
		axios
			.get(`api/groups/${group_id}`)
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

//cargar cursos aun no agregados y todos los docentes
export const load_get_courses_teachers_type = "load_get_courses_teachers";
export const loadGetCoursesTeachersAction = () => {
	return {
		type: load_get_courses_teachers_type,
	};
};

export const clear_get_courses_teachers_type = "clear_get_courses_teacher";
export const clearGetCoursesTeachersAction = () => {
	return {
		type: clear_get_courses_teachers_type,
	};
};

export const get_courses_teachers_type = "get_courses_teachers";
export const get_courses_teachers_error_type = "get_courses_teachers_error";
export const getCoursesTeacherAction = (group_id) => {
	return (dispatch) => {
		axios
			.get(`api/courses_teachers/${group_id}`)
			.then(({ data }) => {
				return dispatch({
					type: get_courses_teachers_type,
					payload: data.data,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: get_courses_teachers_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: get_courses_teachers_error_type,
					payload: message,
				});
			});
	};
};

export const load_post_course_group_type = "load_post_course_group";
export const loadPostCourseGroupAction = () => {
	return {
		type: load_post_course_group_type,
	};
};

export const clear_post_course_group_type = "clear_post_course_group";
export const clearPostCourseGroupAction = () => {
	return {
		type: clear_post_course_group_type,
	};
};

export const post_course_group_type = "post_course_group";
export const post_course_group_error_type = "post_course_group_error";
export const postCourseGroupAction = (d, group_id) => {
	return (dispatch, getState) => {
		axios
			.post(`api/groups/${group_id}`, d)
			.then(({ data }) => {
				const ndata = [data.data].concat(
					getState().admin.courses_group.data
				);
				console.info("course_id", d.course_id);
				const ncourses = getState().admin.courses_group.courses.filter(
					(c) => c.id !== d.course_id
				);
				return dispatch({
					type: post_course_group_type,
					payload: {
						data: ndata,
						courses: ncourses,
					},
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: post_course_group_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: post_course_group_error_type,
					payload: message,
				});
			});
	};
};

export const load_put_course_group_type = "load_put_course_group";
export const loadPutCourseGroupAction = () => {
	return {
		type: load_put_course_group_type,
	};
};
export const clear_put_course_group_type = "clear_put_course_group";
export const clearPutCourseGroupAction = () => {
	return {
		type: clear_put_course_group_type,
	};
};

export const put_course_group_type = "put_course_group";
export const put_course_group_error_type = "put_course_group_error";
export const putCourseGroupAction = (d, course_group_id) => {
	return (dispatch, getState) => {
		axios
			.put(`api/course_group/${course_group_id}`,d)
			.then(({ data }) => {
				let ndata = [].concat(getState().admin.courses_group.data);
				const id = ndata.findIndex((d) => d.id === course_group_id);
				ndata[id] = data.data;
				return dispatch({
					type: put_course_group_type,
					payload: ndata,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: put_course_group_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: put_course_group_error_type,
					payload: message,
				});
			});
	};
};

//Eliminar course group
export const load_delete_course_group_type = "load_delete_course_group";
export const loadDeleteCourseGroupAction = () => {
	return {
		type: load_delete_course_group_type,
	};
};
export const clear_delete_course_group_type = "clear_delete_course_group";
export const clearDeleteCourseGroupAction = () => {
	return {
		type: clear_delete_course_group_type,
	};
};

export const delete_course_group_type = "delete_course_group";
export const delete_course_group_error_type = "delete_course_group_error";
export const deleteCourseGroupAction = (course_group_id) => {
	return (dispatch, getState) => {
		axios
			.delete(`api/course_group/${course_group_id}`)
			.then(() => {
				return dispatch({
					type: delete_course_group_type,
					payload: getState().admin.courses_group.data.filter(d=>d.id!==course_group_id),
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: delete_course_group_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: delete_course_group_error_type,
					payload: message,
				});
			});
	};
};



