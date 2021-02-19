import axios from "axios";
import err_fnc from "../../../components/err_fnc";

export const load_get_all_users_type = "admin_load_get_all_users";
export const loadGetAllUsersAction = () => {
	return {
		type: load_get_all_users_type,
	};
};

export const get_all_users_type = "admin_GET_ALL_USERS";
export const get_all_users_error_type = "admin_GET_ALL_USERS_ERROR";

export const getAllUsersAction = (url = null) => {
	return (dispatch, getState) => {
		axios
			.get(url ? url : "/api/users", {
				params: getState().admin.users.filters,
			})
			.then(({ data }) => {
				dispatch({
					type: get_all_users_type,
					payload: data,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, get_all_users_error_type, response, message)
			);
	};
};

export const set_filter_user_type = "admin_SET_FILTER_USER_TYPE";
export const setFilterUserAction = (filter) => {
	return {
		type: set_filter_user_type,
		payload: filter,
	};
};

//crear usuario

export const load_post_user_type = "admin_load_post_user";
export const loadPostUserAction = () => {
	return {
		type: load_post_user_type,
	};
};
export const clear_post_user_type = "admin_CLEAR_post_USER_ACTION";
export const clearPostUserAction = () => {
	return {
		type: clear_post_user_type,
	};
};

export const post_user_type = "admin_POST_USER";
export const post_user_error_type = "admin_POST_USER_ERROR";

export const postUserAction = (data) => {
	return (dispatch, getState) => {
		axios
			.post("/api/users", data)
			.then(({ data }) => {
				let users = getState().admin.users.users;
				let t = getState().admin.users.total;
				users.pop();
				return dispatch({
					type: post_user_type,
					payload: {
						data: [data.data].concat(users),
						total: ++t,
					},
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, post_user_error_type, response, message)
			);
	};
};
//editar usuario

export const load_put_user_type = "admin_load_put_user";
export const loadPutUserAction = () => {
	return {
		type: load_put_user_type,
	};
};
export const clear_put_user_type = "admin_CLEAR_put_USER_ACTION";
export const clearPutUserAction = () => {
	return {
		type: clear_put_user_type,
	};
};

export const put_user_type = "admin_PuT_USER";
export const put_user_error_type = "admin_PuT_USER_ERROR";

export const putUserAction = (data, user_id) => {
	return (dispatch, getState) => {
		axios
			.put(`api/users/${user_id}`, data)
			.then(({ data }) => {
				let users = getState().admin.users.users;
				const i = users.findIndex((u) => u.id === user_id);
				let d = [].concat(users);
				d[i] = data.data;
				return dispatch({
					type: put_user_type,
					payload: d,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, put_user_error_type, response, message)
			);
	};
};

//eliminar usuario
export const load_delete_user_type = "admin_load_delete_user";
export const loadDeleteUserAction = () => {
	return {
		type: load_delete_user_type,
	};
};
export const clear_delete_user_type = "admin_CLEAR_delete_USER_ACTION";
export const clearDeleteUserAction = () => {
	return {
		type: clear_delete_user_type,
	};
};

export const delete_user_type = "admin_delete_USER";
export const delete_user_error_type = "admin_delete_USER_ERROR";

export const deleteUserAction = (user_id) => {
	return (dispatch, getState) => {
		axios
			.delete(`api/users/${user_id}`)
			.then(() => {
				let users = getState().admin.users.users;
				let t = getState().admin.users.total;
				let nd = users.filter((e) => e.id !== user_id);
				return dispatch({
					type: delete_user_type,
					payload: {
						data: nd,
						total: --t,
					},
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, delete_user_error_type, response, message)
			);
	};
};

//activar desactivar usuario

export const load_active_user_type = "admin_load_active_user";
export const loadActiveUserAction = () => {
	return {
		type: load_active_user_type,
	};
};
export const clear_active_user_type = "admin_CLEAR_active_USER_ACTION";
export const clearActiveUserAction = () => {
	return {
		type: clear_active_user_type,
	};
};

export const active_user_type = "admin_active_USER";
export const active_user_error_type = "admin_active_USER_ERROR";

export const activeUserAction = (user_id) => {
	return (dispatch, getState) => {
		axios
			.put(`api/users/${user_id}/active`)
			.then(({ data }) => {
				let users = getState().admin.users.users;
				let i = users.findIndex((e) => e.id === user_id);
				let nd = [].concat(users);
				nd[i] = data.data;
				return dispatch({
					type: active_user_type,
					payload: nd,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, active_user_error_type, response, message)
			);
	};
};
