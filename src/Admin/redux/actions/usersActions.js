import axios from "axios";

export const load_get_all_users_type = 'load_get_all_users';
export const loadGetAllUsersAction=()=>{
	return {
		type: load_get_all_users_type
	};
};

export const get_all_users_type = "GET_ALL_USERS";
export const get_all_users_error_type = "GET_ALL_USERS_ERROR";

export const getAllUsersAction = (url = null) => {
	return (dispatch, getState) => {
		axios
			.get(url ? url : "api/users", {
				params: getState().admin.users.filters,
			})
			.then(({data}) => {
				dispatch({
					type: get_all_users_type,
					payload: data,
				});
			})
			.catch(({response, message}) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: get_all_users_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: get_all_users_error_type,
					payload: message,
				});
			});
	};
};

export const set_filter_user_type = "SET_FILTER_USER_TYPE";
export const setFilterUserAction = (filter) => {
	return {
		type: set_filter_user_type,
		payload: filter,
	};
};

//crear usuario

export const load_post_user_type = "load_post_user";
export const loadPostUserAction = () => {
	return {
		type: load_post_user_type,
	};
};
export const clear_post_user_type = "CLEAR_post_USER_ACTION";
export const clearPostUserAction = () => {
	return {
		type: clear_post_user_type,
	};
};

export const post_user_type = "POST_USER";
export const post_user_error_type = "POST_USER_ERROR";

export const postUserAction = (data) => {
	return (dispatch, getState) => {
		axios
			.post("api/users", data)
			.then(({ data }) => {
				let users = getState().admin.users.users;
				let t = getState().admin.users.total;
				users.pop();
				return dispatch({
					type: post_user_type,
					payload: {
						data: [data.data].concat(users),
						total: ++t
					},
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: post_user_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				} else {
					return dispatch({
						type: post_user_error_type,
						payload: message,
					});
				}
			});
	};
};
//importar usuarios

export const post_import_users_type = "IMPORT_USERS";
export const post_import_users_error_type = 'IMPORT_USERS_ERROR';
export const postImportUsersAction = (file, progressFunc) => {
	return (dispatch) => {
		let fd = new FormData();
		fd.append("import_users", file);
		axios.post("api/users/import", fd, {
			onUploadProgress: e=>{
				let p = Math.round((e.loaded * 100) / e.total);
				progressFunc&&progressFunc(p);
			},
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}).then(({data})=>{
			return dispatch({
				type: post_import_users_type,
				payload: data.message,
			});
		}).catch(({response, message})=>{
			if(response){
				if (response.status === 401) {
					window.location.reload();
				}
				return dispatch({
					type: post_import_users_error_type,
					payload: {
						data:response.data,
						status:response.status
					},
				});
			}
			return dispatch({
				type: post_import_users_error_type,
				payload: message,
			});
		});
	};
};

export const clear_import_users_type='CLEAR_IMPORT_USERS';
export const clearImportUsersAction = ()=>{
	return {
		type: clear_import_users_type
	};
};
//editar usuario

export const load_put_user_type = "load_put_user";
export const loadPutUserAction = () => {
	return {
		type: load_put_user_type,
	};
};
export const clear_put_user_type = "CLEAR_put_USER_ACTION";
export const clearPutUserAction = () => {
	return {
		type: clear_put_user_type,
	};
};

export const put_user_type = "PuT_USER";
export const put_user_error_type = "PuT_USER_ERROR";

export const putUserAction = (data,user_id) => {
	return (dispatch, getState) => {
		axios
			.put(`api/users/${user_id}`, data)
			.then(({ data }) => {
				let users = getState().admin.users.users;
				const i = users.findIndex(u=>u.id===user_id);
				let d = [].concat(users);
				d[i] = data.data;
				return dispatch({
					type: put_user_type,
					payload: d,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: put_user_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				} else {
					return dispatch({
						type: put_user_error_type,
						payload: message,
					});
				}
			});
	};
};

//eliminar usuario
export const load_delete_user_type = "load_delete_user";
export const loadDeleteUserAction = () => {
	return {
		type: load_delete_user_type,
	};
};
export const clear_delete_user_type = "CLEAR_delete_USER_ACTION";
export const clearDeleteUserAction = () => {
	return {
		type: clear_delete_user_type,
	};
};

export const delete_user_type = "delete_USER";
export const delete_user_error_type = "delete_USER_ERROR";

export const deleteUserAction = (user_id) => {
	return (dispatch, getState) => {
		axios
			.delete(`api/users/${user_id}`)
			.then(() => {
				let users = getState().admin.users.users;
				let t = getState().admin.users.total;
				let nd = users.filter(e=>e.id!==user_id);
				return dispatch({
					type: delete_user_type,
					payload: {
						data:nd,
						total:--t
					},
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: delete_user_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				} else {
					return dispatch({
						type: delete_user_error_type,
						payload: message,
					});
				}
			});
	};
};

//activar desactivar usuario

export const load_active_user_type = "load_active_user";
export const loadActiveUserAction = () => {
	return {
		type: load_active_user_type,
	};
};
export const clear_active_user_type = "CLEAR_active_USER_ACTION";
export const clearActiveUserAction = () => {
	return {
		type: clear_active_user_type,
	};
};

export const active_user_type = "active_USER";
export const active_user_error_type = "active_USER_ERROR";

export const activeUserAction = (user_id) => {
	return (dispatch, getState) => {
		axios
			.put(`api/users/${user_id}/active`)
			.then(({data}) => {
				let users = getState().admin.users.users;
				let i = users.findIndex(e=>e.id===user_id);
				let nd = [].concat(users);
				nd[i]=data.data;
				return dispatch({
					type: active_user_type,
					payload: nd,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: active_user_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				} else {
					return dispatch({
						type: active_user_error_type,
						payload: message,
					});
				}
			});
	};
};