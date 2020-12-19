import { change_drawer_type } from "../actions/uiActions";

const initial = {
	drawer: false,
};

const drawerReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case change_drawer_type:
			let d = !state.drawer;
			return Object.assign(state, {
				drawer: d,
			});
		default:
			return state;
	}
};
export default drawerReducer;
