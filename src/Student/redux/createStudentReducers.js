import { combineReducers } from "redux";
import course from "./reducers/courseReducer";
import courses from "./reducers/coursesReducer";
import groups from "./reducers/groupsReducer";

const createStudentReducers = () =>
	combineReducers({
		groups,
		courses,
		course,
	});

export default createStudentReducers;
