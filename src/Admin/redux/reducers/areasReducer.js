import {
	clear_get_areas_type,
	get_areas_type,
	get_areas_error_type,
	load_post_area_type,
	clear_post_area_type,
	post_area_type,
	post_area_error_type,
	load_put_area_type,
	clear_put_area_type,
	put_area_type,
	put_area_error_type,
	load_delete_area_type,
	clear_delete_area_type,
	delete_area_type,
	delete_area_error_type,
	load_post_course_type,
	clear_post_course_type,
	post_course_type,
	post_course_error_type,
	load_put_course_type,
	clear_put_course_type,
	put_course_type,
	put_course_error_type,
	load_delete_course_type,
	clear_delete_course_type,
	delete_course_type,
	delete_course_error_type,
} from "../actions/areasActions";

const initial = {
	areas: [],
	get_areas_load: true,
	get_areas_success: false,
	get_areas_errors: null,
	post_area_load: false,
	post_area_success: false,
	post_area_errors: null,
	put_area_load: false,
	put_area_success: false,
	put_area_errors: null,
	delete_area_load: false,
	delete_area_success: false,
	delete_area_errors: null,
	post_course_load: false,
	post_course_success: false,
	post_course_errors: null,
	put_course_load: false,
	put_course_success: false,
	put_course_errors: null,
	delete_course_load: false,
	delete_course_success: false,
	delete_course_errors: null,
};

const areasReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case clear_get_areas_type:
			return Object.assign(state, {
				get_areas_success: false,
				get_areas_errors: null,
				get_areas_load: false,
			});
		case get_areas_type:
			return Object.assign(state, {
				areas: payload,
				get_areas_load: false,
				get_areas_success: true,
				get_areas_errors: null,
			});
		case get_areas_error_type:
			return Object.assign(state, {
				areas: [],
				get_areas_load: false,
				get_areas_success: false,
				get_areas_errors: payload,
			});
		case load_post_area_type:
			return Object.assign(state, {
				post_area_success: false,
				post_area_errors: null,
				post_area_load: true,
			});
		case clear_post_area_type:
			return Object.assign(state, {
				post_area_success: false,
				post_area_errors: null,
				post_area_load: false,
			});
		case post_area_type:
			return Object.assign(state, {
				areas: payload,
				post_area_success: true,
				post_area_errors: null,
				post_area_load: false,
			});
		case post_area_error_type:
			return Object.assign(state, {
				post_area_errors: payload,
				post_area_success: false,
				post_area_load: false,
			});
		case load_put_area_type:
			return Object.assign(state, {
				put_area_success: false,
				put_area_errors: null,
				put_area_load: true,
			});
		case clear_put_area_type:
			return Object.assign(state, {
				put_area_success: false,
				put_area_errors: null,
				put_area_load: false,
			});
		case put_area_type:
			return Object.assign(state, {
				areas: payload,
				put_area_success: true,
				put_area_errors: null,
				put_area_load: false,
			});
		case put_area_error_type:
			return Object.assign(state, {
				put_area_errors: payload,
				put_area_success: false,
				put_area_load: false,
			});
		case load_delete_area_type:
			return Object.assign(state, {
				delete_area_success: false,
				delete_area_errors: null,
				delete_area_load: true,
			});
		case clear_delete_area_type:
			return Object.assign(state, {
				delete_area_success: false,
				delete_area_errors: null,
				delete_area_load: false,
			});
		case delete_area_type:
			return Object.assign(state, {
				areas: payload,
				delete_area_success: false,
				delete_area_errors: null,
				delete_area_load: false,
			});
		case delete_area_error_type:
			return Object.assign(state, {
				delete_area_errors: payload,
				delete_area_success: false,
				delete_area_load: false,
			});
		case load_post_course_type:
			return Object.assign(state, {
				post_course_success: false,
				post_course_errors: null,
				post_course_load: true,
			});
		case clear_post_course_type:
			return Object.assign(state, {
				post_course_success: false,
				post_course_errors: null,
				post_course_load: false,
			});
		case post_course_type:
			return Object.assign(state, {
				areas: payload,
				post_course_success: true,
				post_course_errors: null,
				post_course_load: false,
			});
		case post_course_error_type:
			return Object.assign(state, {
				post_course_errors: payload,
				post_course_success: false,
				post_course_load: false,
			});
		case load_put_course_type:
			return Object.assign(state, {
				put_course_success: false,
				put_course_errors: null,
				put_course_load: true,
			});
		case clear_put_course_type:
			return Object.assign(state, {
				put_course_success: false,
				put_course_errors: null,
				put_course_load: false,
			});
		case put_course_type:
			return Object.assign(state, {
				areas: payload,
				put_course_success: true,
				put_course_errors: null,
				put_course_load: false,
			});
		case put_course_error_type:
			return Object.assign(state, {
				put_course_errors: payload,
				put_course_success: false,
				put_course_load: false,
			});
		case load_delete_course_type:
			return Object.assign(state, {
				delete_course_success: false,
				delete_course_errors: null,
				delete_course_load: true,
			});
		case clear_delete_course_type:
			return Object.assign(state, {
				delete_course_success: false,
				delete_course_errors: null,
				delete_course_load: false,
			});
		case delete_course_type:
			return Object.assign(state, {
				areas: payload,
				delete_course_success: false,
				delete_course_errors: null,
				delete_course_load: false,
			});
		case delete_course_error_type:
			return Object.assign(state, {
				delete_course_errors: payload,
				delete_course_success: false,
				delete_course_load: false,
			});
		default:
			return state;
	}
};

export default areasReducer;
