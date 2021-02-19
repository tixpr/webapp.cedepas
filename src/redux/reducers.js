import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import auth from "./reducers/authReducer";
import ui from "./reducers/uiReducer";
import library from "./reducers/libraryReducer";
import register from "./reducers/registerReducer";
import createAdminReducers from "../Admin/redux/createAdminReducers";
import createStudentReducers from "../Student/redux/createStudentReducers";
import createTeacherReducers from "../Teacher/redux/createTeacherReducers";

const createRootReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		admin: createAdminReducers(),
		teacher: createTeacherReducers(),
		student: createStudentReducers(),
		auth,
		ui,
		library,
		register,
	});
export default createRootReducer;
