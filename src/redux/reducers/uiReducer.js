import {
	change_ui_user_mode_type,
	get_ui_user_mode_type,
} from "../actions/uiActions";

const initial = {
	mode: null,
};

const uiReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case get_ui_user_mode_type:
			return Object.assign(state, {
				mode: payload,
			});
		case change_ui_user_mode_type:
			return Object.assign(state, {
				mode: payload,
			});
		default:
			return state;
	}
};
export default uiReducer;
