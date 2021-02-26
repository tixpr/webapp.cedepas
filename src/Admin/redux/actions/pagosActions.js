import axios from "axios";
import err_fnc from "../../../components/err_fnc";

export const reset_pagos_type = "admin_reset_pagos";
export const resetPagosAction = () => {
	return {
		type: reset_pagos_type,
	};
};
export const get_pagos_type = "admin_get_pagos_type";
export const get_pagos_error_type = "admin_get_pagos_error";
export const getPagosAction = (course_group_id) => {
	return (dispatch) => {
		axios
			.get(`/api/pagos/${course_group_id}`)
			.then(({ data }) => {
				return dispatch({
					type: get_pagos_type,
					payload: data,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, get_pagos_error_type, response, message)
			);
	};
};

export const load_put_student_pago_type = "admin_load_student_pago";
export const loadPutStudentPagoAction = () => {
	return {
		type: load_put_student_pago_type,
	};
};
export const clear_put_student_pago_type = "admin_clear_put_student_pago";
export const clearPutStudentPagoAction = () => {
	return {
		type: clear_put_student_pago_type,
	};
};

export const put_student_pago_type = "admin_put_student_pago";
export const put_student_pago_error_type = "admin_put_student_pago_error";
export const putStudentPagoAction = (student_pago_id, datos) => {
	return (dispatch, getState) => {
		axios
			.put(`/api/student_pago/${student_pago_id}`, datos)
			.then(() => {
				const students = getState().admin.pagos.students;
				const i = students.findIndex(
					(e) => e.student_pago_id === student_pago_id
				);
				let nd = [].concat(students);

				nd[i] = Object.assign(nd[i], {
					cost: datos.cost,
				});
				return dispatch({
					type: put_student_pago_type,
					payload: nd,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(
					dispatch,
					put_student_pago_error_type,
					response,
					message
				)
			);
	};
};

//aprobar pago
export const load_put_pago_type = "admin_load_put_pago";
export const loadPutPagoAction = () => {
	return {
		type: load_put_pago_type,
	};
};

export const clear_put_pago_type = "admin_clear_put_pago";
export const clearPutPagoAction = () => {
	return {
		type: clear_put_pago_type,
	};
};

export const put_pago_type = "admin_put_pago";
export const put_pago_error_type = "admin_put_pago_error";
export const putPagoAction = (pago_id) => {
	return (dispatch, getState) => {
		axios
			.put(`/api/pago/${pago_id}`)
			.then(({ data }) => {
				const pagos = getState().admin.pagos.pagos;
				const i = pagos.findIndex((p) => p.id === pago_id);
				let pgs = [].concat(pagos);
				pgs[i] = Object.assign(pgs[i], {
					approved: data.approved,
				});
				return dispatch({
					type: put_pago_type,
					payload: pgs,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, put_pago_error_type, response, message)
			);
	};
};

//eliminar pago
export const load_delete_pago_type = "admin_load_delete_pago";
export const loadDeletePagoAction = () => {
	return {
		type: load_delete_pago_type,
	};
};

export const clear_delete_pago_type = "admin_clear_delete_pago";
export const clearDeletePagoAction = () => {
	return {
		type: clear_delete_pago_type,
	};
};

export const delete_pago_type = "admin_delete_pago";
export const delete_pago_error_type = "admin_delete_pago_error";
export const deletePagoAction = (pago_id) => {
	return (dispatch, getState) => {
		axios
			.delete(`/api/pago/${pago_id}`)
			.then(() => {
				return dispatch({
					type: delete_pago_type,
					payload: getState().admin.pagos.pagos.filter(
						(p) => p.id !== pago_id
					),
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, delete_pago_error_type, response, message)
			);
	};
};
//activar desactivar usuario por falta de pago
export const load_pago_active_user_type = "admin_load_pago_active_user";
export const loadPagoActiveUserAction = () => {
	return {
		type: load_pago_active_user_type,
	};
};
export const clear_pago_active_user_type =
	"admin_CLEAR_pago_active_USER_ACTION";
export const clearPagoActiveUserAction = () => {
	return {
		type: clear_pago_active_user_type,
	};
};

export const pago_active_user_type = "admin_pago_active_USER";
export const pago_active_user_error_type = "admin_pago_active_USER_ERROR";

export const pagoActiveUserAction = (user_id) => {
	return (dispatch, getState) => {
		axios
			.put(`api/users/${user_id}/active`)
			.then(({ data }) => {
				const users = getState().admin.pagos.students;
				const i = users.findIndex((e) => e.id === user_id);
				let nd = [].concat(users);
				nd[i] = Object.assign(nd[i], {
					active: data.data.active,
				});
				return dispatch({
					type: pago_active_user_type,
					payload: nd,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(
					dispatch,
					pago_active_user_error_type,
					response,
					message
				)
			);
	};
};
