import { combineReducers } from "redux";
import usersReducer from "./reducers/usersReducer";
import userReducer from './reducers/userReducer';
import importUsersReducer from './reducers/importUsersReducer';

const createAdminReducers = () =>
	combineReducers({
		users: usersReducer,
		user: userReducer,
		import: importUsersReducer
	});

export default createAdminReducers;
