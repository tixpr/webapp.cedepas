import axios from "axios";
import err_fnc from "../../../components/err_fnc";

export const load_post_pago_file_type = "student_load_post_pago_file";
export const loadPostPagoFileAction = () => {
	return {
		type: load_post_pago_file_type,
	};
};

export const clear_post_pago_file_type = "student_clear_post_pago_file";
export const clearPostPagoFileAction = () => {
	return {
		type: clear_post_pago_file_type,
	};
};

export const post_pago_file_type = "student_post_pago_file";
export const post_pago_file_error_type = "student_post_pago_file_error";
export const postPagoFileAction = (course_group_id, file, progressFunc) => {
	return (dispatch) => {
		let fd = new FormData();
		fd.append("vaucher", file);
		axios
			.post(`/api/student/course_group/${course_group_id}/vaucher`, fd, {
				onUploadProgress: (e) => {
					let p = Math.round((e.loaded * 100) / e.total);
					progressFunc && progressFunc(p);
				},
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then(({ data }) => {
				return dispatch({
					type: post_pago_file_type,
					payload: data.filename,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, post_pago_file_error_type, response, message)
			);
	};
};
//obtener todos los pagos
export const load_get_pagos_type = "student_load_get_pagos";
export const loadGetPagosAction = () => {
	return {
		type: load_get_pagos_type,
	};
};

export const clear_get_pagos_type = "student_clear_get_pagos";
export const clearGetPagosAction = () => {
	return {
		type: clear_get_pagos_type,
	};
};

export const get_pagos_type = "student_get_pagos";
export const get_pagos_error_type = "student_get_pagos_error";
export const getPagosAction = (course_group_id) => {
	return (dispatch) => {
		axios
			.get(`/api/student/course_group/${course_group_id}/pagos`)
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
//crear pago nuevo
export const load_post_pago_type = "student_load_post_pago";
export const loadPostPagoAction = () => {
	return {
		type: load_post_pago_type,
	};
};

export const clear_post_pago_type = "student_clear_post_pago";
export const clearPostPagoAction = () => {
	return {
		type: clear_post_pago_type,
	};
};

export const post_pago_type = "student_post_pago";
export const post_pago_error_type = "student_post_pago_error";
export const postPagoAction = (course_group_id, req) => {
	return (dispatch, getState) => {
		axios
			.post(`/api/student/course_group/${course_group_id}/pagos`, req)
			.then(({ data }) => {
				console.info(data);
				const npagos = [data.pago].concat(
					getState().student.pagos.pagos
				);
				return dispatch({
					type: post_pago_type,
					payload: npagos,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, post_pago_error_type, response, message)
			);
	};
};
