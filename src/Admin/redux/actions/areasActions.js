import axios from "axios";
export const clear_get_areas_type = "clear_get_areas";
export const clearGetAreasAction = () => {
	return {
		type: clear_get_areas_type,
	};
};

export const get_areas_type = "get_areas";
export const get_areas_error_type = "get_areas_error";
export const getAreasAction = () => {
	return (dispatch) => {
		axios
			.get("api/areas")
			.then(({ data }) => {
				return dispatch({
					type: get_areas_type,
					payload: data.data,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: get_areas_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: get_areas_error_type,
					payload: message,
				});
			});
	};
};

export const clear_post_area_type = "clear_post_area";
export const clearPostAreaAction = () => {
	return {
		type: clear_post_area_type,
	};
};
export const load_post_area_type = "load_post_area";
export const loadPostAreaAction = () => {
	return {
		type: load_post_area_type,
	};
};

export const post_area_type = "post_area_type";
export const post_area_error_type = "post_area_error";

export const postAreaAction = (data) => {
	return (dispatch, getState) => {
		axios
			.post("api/areas", data)
			.then(({ data }) => {
				return dispatch({
					type: post_area_type,
					payload: [data.data].concat(getState().admin.areas.areas),
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: post_area_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: post_area_error_type,
					payload: message,
				});
			});
	};
};

export const load_put_area_type = "load_put_area";
export const loadPutAreaAction = () => {
	return {
		type: load_put_area_type,
	};
};
export const clear_put_area_type = "clear_put_area";
export const clearPutAreaAction = () => {
	return {
		type: clear_put_area_type,
	};
};

export const put_area_type = "put_area";
export const put_area_error_type = "put_area_error";
export const putAreaAction = (data, area_id) => {
	return (dispatch, getState) => {
		axios
			.put(`api/areas/${area_id}`, data)
			.then(({ data }) => {
				let areas = getState().admin.areas.areas;
				let i = areas.findIndex((a) => a.id === area_id);
				let nareas = [].concat(areas);
				nareas[i] = data.data;
				return dispatch({
					type: put_area_type,
					payload: nareas,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: put_area_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: put_area_error_type,
					payload: message,
				});
			});
	};
};

export const load_delete_area_type = "load_delete_area";
export const loadDeleteAreaAction = () => {
	return {
		type: load_delete_area_type,
	};
};

export const clear_delete_area_type = "clear_delete_area";
export const clearDeleteAreaAction = () => {
	return {
		type: clear_delete_area_type,
	};
};

export const delete_area_type = "delete_area";
export const delete_area_error_type = "delete_area_error";
export const deleteAreaAction = (area_id) => {
	return (dispatch, getState) => {
		axios
			.delete(`api/areas/${area_id}`)
			.then(() => {
				return dispatch({
					type: delete_area_type,
					payload: getState().admin.areas.areas.filter(
						(a) => a.id !== area_id
					),
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: delete_area_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: delete_area_error_type,
					payload: message,
				});
			});
	};
};

//CURSOS
export const load_post_course_type = "load_post_course_";
export const loadPostCourseAction = () => {
	return {
		type: load_post_course_type,
	};
};

export const clear_post_course_type = "clear_post_course_";
export const clearPostCourseAction = () => {
	return {
		type: clear_post_course_type,
	};
};

export const post_course_type = "post_course_";
export const post_course_error_type = "post_course_error_";
export const postCourseAction = (data, area_id) => {
	return (dispatch, getState) => {
		axios
			.post(`api/course/${area_id}`, data)
			.then(({ data }) => {
				const ia = getState().admin.areas.areas.findIndex(
					(a) => a.id === area_id
				);
				let area = getState().admin.areas.areas[ia];
				let ccs = [].concat(area.courses);
				ccs.push(data.data);
				let narea = Object.assign(area, { courses: ccs });
				let nareas = [].concat(getState().admin.areas.areas);
				nareas[ia] = narea;
				return dispatch({
					type: post_course_type,
					payload: nareas,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: post_course_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: post_course_error_type,
					payload: message,
				});
			});
	};
};

export const load_put_course_type = "load_put_course_";
export const loadPutCourseAction = () => {
	return {
		type: load_put_course_type,
	};
};

export const clear_put_course_type = "clear_put_course_";
export const clearPutCourseAction = () => {
	return {
		type: clear_put_course_type,
	};
};

export const put_course_type = "put_course_";
export const put_course_error_type = "put_course_error_";
export const putCourseAction = (data, area_id, course_id) => {
	return (dispatch, getState) => {
		axios
			.put(`api/course/${course_id}`, data)
			.then(({ data }) => {
				const ia = getState().admin.areas.areas.findIndex(
					(a) => a.id === area_id
				);
				let area = getState().admin.areas.areas[ia];
				const ic = area.courses.findIndex((c) => c.id === course_id);
				let ncourses = [].concat(area.courses);
				ncourses[ic]= data.data;
				let narea = Object.assign(area,{courses:ncourses});
				let nareas = [].concat(getState().admin.areas.areas);
				nareas[ia] = narea;
				return dispatch({
					type: put_course_type,
					payload: nareas,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: put_course_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: put_course_error_type,
					payload: message,
				});
			});
	};
};

export const load_delete_course_type = "load_delete_course_";
export const loadDeleteCourseAction = () => {
	return {
		type: load_delete_course_type,
	};
};

export const clear_delete_course_type = "clear_delete_course_";
export const clearDeleteCourseAction = () => {
	return {
		type: clear_delete_course_type,
	};
};

export const delete_course_type = "delete_course_";
export const delete_course_error_type = "delete_course_error_";
export const deleteCourseAction = (area_id, course_id) => {
	return (dispatch, getState) => {
		axios
			.delete(`api/course/${course_id}`)
			.then(() => {
				const ia = getState().admin.areas.areas.findIndex(
					(a) => a.id === area_id
				);
				let area = getState().admin.areas.areas[ia];
				let ncourses = area.courses.filter((c) => c.id !== course_id);
				let narea = Object.assign(area,{courses:ncourses});
				let nareas = [].concat(getState().admin.areas.areas);
				nareas[ia] = narea;
				return dispatch({
					type: delete_course_type,
					payload: nareas,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: delete_course_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: delete_course_error_type,
					payload: message,
				});
			});
	};
};
