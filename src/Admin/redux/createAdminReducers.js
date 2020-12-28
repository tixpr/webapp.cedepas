import { combineReducers } from "redux";
import usersReducer from "./reducers/usersReducer";
import importUsersReducer from "./reducers/importUsersReducer";
import groupsReducer from "./reducers/groupsReducer";
import coursesReducer from "./reducers/coursesReducer";


const createAdminReducers = () =>
	combineReducers({
		users: usersReducer,
		import: importUsersReducer,
		groups: groupsReducer,
		courses: coursesReducer
	});

export default createAdminReducers;
