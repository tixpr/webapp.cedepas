import { combineReducers } from "redux";
import courseReducer from "./reducers/courseReducer";
import coursesReducer from "./reducers/coursesReducer";
import groupsReducer from "./reducers/groupsReducer";

const createStudentReducers = () =>
	combineReducers({
		groups: groupsReducer,
		courses: coursesReducer,
		course: courseReducer,
	});

export default createStudentReducers;
