import {
	load_post_pago_file_type,
	clear_post_pago_file_type,
	post_pago_file_type,
	post_pago_file_error_type,
	load_get_pagos_type,
	clear_get_pagos_type,
	get_pagos_type,
	get_pagos_error_type,
	load_post_pago_type,
	clear_post_pago_type,
	post_pago_type,
	post_pago_error_type,
} from "../actions/pagosActions";

const init = {
	cost: 0,
	pagos: [],
	load: true,
	errors: null,
	filename: null,
	upload_load: false,
	upload_errors: null,
	upload_success: false,
	post_errors: null,
	post_load: false,
	post_success: false,
};

const pagosReducer = (state = init, { type, payload }) => {
	switch (type) {
		case load_post_pago_file_type:
			return Object.assign(state, {
				filename: null,
				upload_load: true,
				upload_errors: null,
				upload_success: false,
			});
		case clear_post_pago_file_type:
			return Object.assign(state, {
				filename: null,
				upload_load: false,
				upload_errors: null,
				upload_success: false,
			});
		case post_pago_file_type:
			return Object.assign(state, {
				filename: payload,
				upload_load: false,
				upload_errors: null,
				upload_success: true,
			});
		case post_pago_file_error_type:
			return Object.assign(state, {
				filename: null,
				upload_load: false,
				upload_errors: payload,
				upload_success: false,
			});
		case load_get_pagos_type:
			return Object.assign(state, {
				load: true,
				errors: null,
			});
		case clear_get_pagos_type:
			return Object.assign(state, {
				cost: 0,
				pagos: [],
				load: false,
				errors: null,
			});
		case get_pagos_type:
			return Object.assign(state, {
				cost: payload.cost,
				pagos: payload.pagos,
				load: false,
				errors: null,
			});
		case get_pagos_error_type:
			return Object.assign(state, {
				cost: 0,
				pagos: [],
				load: false,
				errors: payload,
			});
		case load_post_pago_type:
			return Object.assign(state, {
				post_load: true,
				post_errors: null,
				post_success: false,
			});
		case clear_post_pago_type:
			return Object.assign(state, {
				post_load: false,
				post_errors: null,
				post_success: false,
			});
		case post_pago_type:
			return Object.assign(state, {
				pagos: payload,
				post_load: false,
				post_errors: null,
				post_success: true,
			});
		case post_pago_error_type:
			return Object.assign(state, {
				post_load: false,
				post_errors: payload,
				post_success: false,
			});
		default:
			return state;
	}
};

export default pagosReducer;
