import {
	get_all_users_type,
	set_filter_user_type,
	enabled_load_type,
} from "../actions/usersActions";

const initial = {
	data: [],
	is_load: true,
	filters: {
		students: false,
		teachers: false,
		enableds: false,
		disableds: false,
		search: "",
	},
};

const usersReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case get_all_users_type:
			return Object.assign(state, {
				...payload,
				is_load: false,
			});
		case set_filter_user_type:
			let t = Object.assign(state.filters, {});
			t[payload.name] = payload.value;
			return Object.assign(state, {
				filters: t,
			});
		case enabled_load_type:
			return Object.assign(state, {
				is_load: true,
			});
		default:
			return state;
	}
};
export default usersReducer;
