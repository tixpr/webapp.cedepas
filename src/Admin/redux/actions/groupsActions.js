import axios from "axios";
import err_fnc from "../../../components/err_fnc";

export const get_groups_type = "admin_GET_groups";
export const get_groups_error_type = "admin_GET_groups_ERROR";
export const getGroupsAction = (url = null) => {
	return (dispatch) => {
		axios
			.get(url ? url : "api/groups")
			.then(({ data }) => {
				return dispatch({
					type: get_groups_type,
					payload: data,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, get_groups_error_type, response, message)
			);
	};
};

export const load_groups_type = "admin_LOAD_groups";
export const loadGroupsAction = () => {
	return {
		type: load_groups_type,
	};
};
//nuevo groupo
export const load_post_group_type = "admin_LOAD_post_group";

export const loadPostGroupAction = () => {
	return {
		type: load_post_group_type,
	};
};

export const clear_post_group_type = "admin_CLEAR_post_group";

export const clearPostGroupAction = () => {
	return {
		type: clear_post_group_type,
	};
};

export const post_group_type = "admin_post_group";
export const post_group_error_type = "admin_post_group_ERROR";

export const postGroupAction = (data) => {
	return (dispatch, getState) => {
		axios
			.post("api/groups", data)
			.then(({ data }) => {
				let t1 = getState().admin.groups.data;
				let t2 = getState().admin.groups.total + 1;
				t1.pop();
				return dispatch({
					type: post_group_type,
					payload: {
						data: [data.data].concat(t1),
						total: t2,
					},
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, post_group_error_type, response, message)
			);
	};
};

//editar groupo

export const load_put_group_type = "admin_LOAD_put_group";

export const loadPutGroupAction = () => {
	return {
		type: load_put_group_type,
	};
};

export const clear_put_group_type = "admin_CLEAR_put_group";

export const clearPutGroupAction = () => {
	return {
		type: clear_put_group_type,
	};
};

export const put_group_type = "admin_put_group";
export const put_group_error_type = "admin_put_group_ERROR";

export const putGroupAction = (data, group_id) => {
	return (dispatch, getState) => {
		axios
			.put(`api/groups/${group_id}`, data)
			.then(({ data }) => {
				let d = getState().admin.groups.data;
				let t1 = d.findIndex((e) => e.id === group_id);
				let a = [].concat(d);
				a[t1] = data.data;
				return dispatch({
					type: put_group_type,
					payload: a,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, put_group_error_type, response, message)
			);
	};
};
//eliminar groupo

export const load_delete_group_type = "admin_LOAD_delete_group";

export const loadDeleteGroupAction = () => {
	return {
		type: load_delete_group_type,
	};
};

export const clear_delete_group_type = "admin_CLEAR_delete_group";

export const clearDeleteGroupAction = () => {
	return {
		type: clear_delete_group_type,
	};
};

export const delete_group_type = "admin_delete_group";
export const delete_group_error_type = "admin_delete_group_ERROR";

export const deleteGroupAction = (group_id) => {
	return (dispatch, getState) => {
		axios
			.delete(`api/groups/${group_id}`)
			.then(() => {
				let d = getState().admin.groups.data;
				let to = getState().admin.groups.total;
				let t = d.filter((e) => e.id !== group_id);
				return dispatch({
					type: delete_group_type,
					payload: {
						data: t,
						total: --to,
					},
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, delete_group_error_type, response, message)
			);
	};
};
