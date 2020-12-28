import axios from "axios";

//obtener cursos
export const load_get_courses_type = "load_get_courses";
export const loadGetCoursesAction = () => {
	return {
		type: load_get_courses_type,
	};
};

export const clear_get_courses_type = "clear_get_courses";
export const clearGetCoursesAction = () => {
	return {
		type: clear_get_courses_type,
	};
};

export const get_courses_type = "GET_courses_type";
export const get_courses_error_type = "get_courses_error_type";
export const getCoursesAction = (group_id) => {
	return (dispatch) => {
		axios
			.get(`api/courses/${group_id}`)
			.then(({ data }) => {
				return dispatch({
					type: get_courses_type,
					payload: data.data,
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
				} else {
					return dispatch({
						type: get_courses_error_type,
						payload: message,
					});
				}
			});
	};
};

//obtener docentes
export const load_get_teachers_type = "load_get_teachers";
export const loadGetTeachersAction = () => {
	return {
		type: load_get_teachers_type,
	};
};
export const get_teachers_type = "GET_teachers";
export const get_teachers_error_type = "get_teachers_error";
export const getTeachersAction = () => {
	return (dispatch) => {
		axios
			.get("api/users/teachers")
			.then(({ data }) => {
				return dispatch({
					type: get_teachers_type,
					payload: data.data,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: get_teachers_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: get_teachers_error_type,
					payload: message,
				});
			});
	};
};
//crear curso
export const load_post_course_type = 'load_post_course';
export const loadPostCourseAction=()=>{
	return {
		type:load_post_course_type
	};
};
export const clear_post_course_type = "clear_post_course";
export const clearPostCourseAction = () => {
	return {
		type: clear_post_course_type,
	};
};
export const post_course_type = 'post_course_type';
export const post_course_error_type = 'post_course_error';
export const postCourseAction = (data,group_id)=>{
	return (dispatch,getState)=>{
		axios.post(`api/courses/${group_id}`,data)
		.then(({data})=>{
			const courses = getState().admin.courses.data;
			return dispatch({
				type: post_course_type,
				payload: [data.data].concat(courses)
			});
		})
		.catch(({response,message})=>{
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
			} else {
				return dispatch({
					type: post_course_error_type,
					payload: message,
				});
			}
		});
	};
};

//importanto cursos
export const post_import_courses_type = "IMPORT_courses";
export const post_import_courses_error_type = 'IMPORT_courses_ERROR';
export const postImportCoursesAction = (file, progressFunc) => {
	return (dispatch) => {
		let fd = new FormData();
		fd.append("import_courses", file);
		axios.post("api/courses/import", fd, {
			onUploadProgress: e=>{
				let p = Math.round((e.loaded * 100) / e.total);
				progressFunc&&progressFunc(p);
			},
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}).then(({data})=>{
			return dispatch({
				type: post_import_courses_type,
				payload: data.message,
			});
		}).catch(({response, message})=>{
			if(response){
				if (response.status === 401) {
					window.location.reload();
				}
				return dispatch({
					type: post_import_courses_error_type,
					payload: {
						data:response.data,
						status:response.status
					},
				});
			}
			return dispatch({
				type: post_import_courses_error_type,
				payload: message,
			});
		});
	};
};
export const clear_import_courses_type='CLEAR_IMPORT_courses';
export const clearImportCoursesAction = ()=>{
	return {
		type: clear_import_courses_type
	};
};
//editar curso
export const load_put_course_type = 'load_put_course';
export const loadPutCourseAction = ()=>{
	return {
		type: load_put_course_type
	};
};

export const clear_put_course_type = 'clear_put_course';
export const clearPutCourseAction = ()=>{
	return {
		type: clear_put_course_type
	};
};

export const put_course_type = 'put_course';
export const put_course_error_type='put_course_error';
export const putCourseAction=(data,course_id)=>{
	return (dispatch,getState)=>{
		axios.put(`api/course/${course_id}`,data)
		.then(({data})=>{
			let temp = getState().admin.courses.data;
			let i = temp.findIndex(e=>e.id===course_id);
			let nd = [].concat(temp);
			nd[i]=data.data;
			return dispatch({
				type: put_course_type,
				payload: nd
			});
		})
		.catch(({response,message})=>{
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
//eliminar un curso
export const load_delete_course_type = 'load_delete_course';
export const loadDeleteCourseAction = ()=>{
	return {
		type: load_delete_course_type
	};
};

export const clear_delete_course_type = 'clear_delete_course';
export const clearDeleteCourseAction = ()=>{
	return {
		type: clear_delete_course_type
	};
};

export const delete_course_type = 'delete_course';
export const delete_course_error_type='delete_course_error';
export const deleteCourseAction=(course_id)=>{
	return (dispatch,getState)=>{
		axios.delete(`api/course/${course_id}`)
		.then(()=>{
			let temp = getState().admin.courses.data;
			return dispatch({
				type: delete_course_type,
				payload: temp.filter(el=>el.id!==course_id)
			});
		})
		.catch(({response,message})=>{
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