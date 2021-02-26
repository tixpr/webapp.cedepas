import { combineReducers } from "redux";
import users from "./reducers/usersReducer";
import groups from "./reducers/groupsReducer";
import courses from "./reducers/coursesReducer";
import course from "./reducers/courseReducer";
import areas from "./reducers/areasReducer";
import courses_group from "./reducers/coursesGroupReducer";
import course_group from "./reducers/courseGroupReducer";
import library from "./reducers/libraryReducer";
import matricula from "./reducers/matriculasReducer";
import pagos from "./reducers/pagosReducer";

const createAdminReducers = () =>
	combineReducers({
		users,
		groups,
		courses,
		course,
		areas,
		library,
		courses_group,
		course_group,
		matricula,
		pagos,
	});

export default createAdminReducers;
