import {
	reset_pagos_type,
	get_pagos_error_type,
	get_pagos_type,
	load_put_student_pago_type,
	clear_put_student_pago_type,
	put_student_pago_type,
	put_student_pago_error_type,
	load_put_pago_type,
	clear_put_pago_type,
	put_pago_type,
	put_pago_error_type,
	load_delete_pago_type,
	clear_delete_pago_type,
	delete_pago_type,
	delete_pago_error_type,
	load_pago_active_user_type,
	clear_pago_active_user_type,
	pago_active_user_type,
	pago_active_user_error_type,
} from "../actions/pagosActions";

const init = {
	students: [],
	pagos: [],
	get_errors: null,
	get_load: true,
	put_errors: null,
	put_load: false,
	put_success: false,
	put_pago_errors: null,
	put_pago_load: false,
	put_pago_success: false,
	active_user_errors: null,
	active_user_load: false,
	active_user_success: false,
};

const pagosReducer = (state = init, { type, payload }) => {
	switch (type) {
		case reset_pagos_type:
			return Object.assign(state, {
				students: [],
				pagos: [],
				get_errors: null,
				get_load: true,
				put_errors: null,
				put_load: false,
				put_success: false,
			});
		case get_pagos_type:
			return Object.assign(state, {
				students: payload.students,
				pagos: payload.pagos,
				get_load: false,
				get_errors: null,
			});
		case get_pagos_error_type:
			return Object.assign(state, {
				students: [],
				pagos: [],
				get_load: false,
				get_errors: payload,
			});
		case load_put_student_pago_type:
			return Object.assign(state, {
				put_load: true,
				put_errors: null,
				put_success: false,
			});
		case clear_put_student_pago_type:
			return Object.assign(state, {
				put_load: false,
				put_errors: null,
				put_success: false,
			});
		case put_student_pago_type:
			return Object.assign(state, {
				students: payload,
				put_load: false,
				put_errors: null,
				put_success: true,
			});
		case put_student_pago_error_type:
			return Object.assign(state, {
				put_load: false,
				put_errors: payload,
				put_success: false,
			});
		case load_put_pago_type:
			return Object.assign(state, {
				put_pago_load: true,
				put_pago_errors: null,
				put_pago_success: false,
			});
		case clear_put_pago_type:
			return Object.assign(state, {
				put_pago_load: false,
				put_pago_errors: null,
				put_pago_success: false,
			});
		case put_pago_type:
			return Object.assign(state, {
				pagos: payload,
				put_pago_load: false,
				put_pago_errors: null,
				put_pago_success: true,
			});
		case put_pago_error_type:
			return Object.assign(state, {
				put_pago_load: false,
				put_pago_errors: payload,
				put_pago_success: false,
			});
		case load_delete_pago_type:
			return Object.assign(state, {
				delete_pago_load: true,
				delete_pago_errors: null,
				delete_pago_success: false,
			});
		case clear_delete_pago_type:
			return Object.assign(state, {
				delete_pago_load: false,
				delete_pago_errors: null,
				delete_pago_success: false,
			});
		case delete_pago_type:
			return Object.assign(state, {
				pagos: payload,
				delete_pago_load: false,
				delete_pago_errors: null,
				delete_pago_success: true,
			});
		case delete_pago_error_type:
			return Object.assign(state, {
				delete_pago_load: false,
				delete_pago_errors: payload,
				delete_pago_success: false,
			});
		case clear_pago_active_user_type:
			return Object.assign(state, {
				active_user_errors: null,
				active_user_load: false,
				active_user_success: false,
			});
		case load_pago_active_user_type:
			return Object.assign(state, {
				active_user_errors: null,
				active_user_load: true,
				active_user_success: false,
			});
		case pago_active_user_type:
			return Object.assign(state, {
				students: payload,
				active_user_errors: null,
				active_user_load: false,
				active_user_success: true,
			});
		case pago_active_user_error_type:
			return Object.assign(state, {
				active_user_errors: payload,
				active_user_load: false,
				active_user_success: false,
			});
		default:
			return state;
	}
};

export default pagosReducer;
