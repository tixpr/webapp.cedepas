import { combineReducers } from "redux";
import course from "./reducers/courseReducer";
import courses from "./reducers/coursesReducer";
import groups from "./reducers/groupsReducer";
import pagos from "./reducers/pagosReducer";
import register from "./reducers/registerReducer";

const createStudentReducers = () =>
	combineReducers({
		groups,
		courses,
		course,
		pagos,
		register,
	});

export default createStudentReducers;
