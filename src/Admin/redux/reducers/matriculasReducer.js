import {
	clear_matricula_groups_type,
	get_matricula_groups_type,
	get_matricula_groups_error_type,
	load_delete_matricula_student_type,
	delete_matricula_student_type,
	delete_matricula_student_error_type,
	load_matricula_students_type,
	matricula_students_type,
	matricula_students_error_type,
} from "../actions/matriculasActions";

const init = {
	data: [],
	get_load: true,
	get_errors: null,
	post_load: false,
	post_errors: null,
	post_success: false,
	delete_load: false,
	delete_errors: null,
};

const matriculaReducer = (state = init, { type, payload }) => {
	switch (type) {
		case get_matricula_groups_type:
			return Object.assign(state, {
				get_load: false,
				get_errors: null,
				data: payload,
			});
		case get_matricula_groups_error_type:
			return Object.assign(state, {
				get_load: false,
				get_errors: payload,
			});
		case clear_matricula_groups_type:
			return Object.assign(state, {
				get_load: true,
				get_errors: null,
				data: [],
				post_load: false,
				post_errors: null,
				post_success: false,
			});
		case load_delete_matricula_student_type:
			return Object.assign(state, {
				delete_load: true,
				delete_errors: null,
			});
		case delete_matricula_student_type:
			return Object.assign(state, {
				data: payload,
				delete_load: false,
				delete_errors: null,
			});
		case delete_matricula_student_error_type:
			return Object.assign(state, {
				delete_load: false,
				delete_errors: payload,
			});
		case load_matricula_students_type:
			return Object.assign(state, {
				post_load: true,
				post_errors: null,
				post_success: false,
			});
		case matricula_students_type:
			return Object.assign(state, {
				post_success: true,
				post_load: false,
				post_errors: null,
			});
		case matricula_students_error_type:
			return Object.assign(state, {
				post_success: false,
				post_load: false,
				post_errors: payload,
			});
		default:
			return state;
	}
};

export default matriculaReducer;
