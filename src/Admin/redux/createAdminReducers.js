import { combineReducers } from "redux";
import usersReducer from "./reducers/usersReducer";
import importUsersReducer from "./reducers/importUsersReducer";
import groupsReducer from "./reducers/groupsReducer";
import coursesReducer from "./reducers/coursesReducer";
import courseReducer from "./reducers/courseReducer";
import areasReducer from "./reducers/areasReducer";
import coursesGroupReducer from "./reducers/coursesGroupReducer";
import courseGroupReducer from "./reducers/courseGroupReducer";

const createAdminReducers = () =>
	combineReducers({
		users: usersReducer,
		import: importUsersReducer,
		groups: groupsReducer,
		courses: coursesReducer,
		course: courseReducer,
		areas: areasReducer,
		courses_group: coursesGroupReducer,
		course_group: courseGroupReducer,
	});

export default createAdminReducers;
