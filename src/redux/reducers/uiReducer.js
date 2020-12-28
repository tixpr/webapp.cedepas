import { change_mode_user_type } from "../actions/uiActions";

const initial = {
	mode: null,
};

const uiReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case change_mode_user_type:
			return Object.assign(state, {
				mode: payload,
			});
		default:
			return state;
	}
};
export default uiReducer;
