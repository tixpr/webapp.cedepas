import {
	reset_get_groups_type,
	get_groups_type,
	get_groups_error_type,
} from "../actions/groupsActions";

const initial = {
	groups: [],
	load: true,
	errors: null,
};

const groupsReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case reset_get_groups_type:
			return Object.assign(state, {
				groups: [],
				load: true,
				errors: null,
			});
		case get_groups_type:
			return Object.assign(state, {
				groups: payload,
				load: false,
				errors: null,
			});
		case get_groups_error_type:
			return Object.assign(state, {
				groups: [],
				load: false,
				errors: payload,
			});
		default:
			return state;
	}
};

export default groupsReducer;
