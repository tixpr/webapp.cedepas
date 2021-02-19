import axios from "axios";
import err_fnc from "../../../components/err_fnc";

export const reset_get_groups_type = "teacher_reset_get_groups";
export const resetGetGroupsAction = () => {
	return {
		type: reset_get_groups_type,
	};
};

export const get_groups_type = "teacher_get_groups";
export const get_groups_error_type = "teacher_get_groups_error";
export const getGroupsAction = () => {
	return (dispatch) => {
		axios
			.get("/api/teacher/groups")
			.then(({ data }) => {
				return dispatch({
					type: get_groups_type,
					payload: data.data,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, get_groups_error_type, response, message)
			);
	};
};
