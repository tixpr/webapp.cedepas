import { combineReducers } from "redux";
import groups from "./reducers/groupsReducer";
import courses from "./reducers/coursesReducer";
import course from "./reducers/courseReducer";

const createTeacherReducers = () =>
	combineReducers({
		groups,
		courses,
		course,
	});

export default createTeacherReducers;
