import { combineReducers } from "redux";
import groupsReducer from "./reducers/groupsReducer";
import coursesReducer from "./reducers/coursesReducer";
import courseReducer from "./reducers/courseReducer";

const createTeacherReducers = () =>
	combineReducers({
		groups: groupsReducer,
		courses: coursesReducer,
		course: courseReducer,
	});

export default createTeacherReducers;
