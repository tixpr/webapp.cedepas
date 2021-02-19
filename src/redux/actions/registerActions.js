import axios from "axios";
import err_fnc from "../../components/err_fnc";

export const get_active_register_type = "GET_ACTIVE_REGISTER";
export const get_active_register_error_type = "GET_ACTIVE_REGISTER_ERROR";
export const getActiveRegisterAction = () => {
	return (dispatch) => {
		axios
			.get("/api/register")
			.then(({ data }) => {
				return dispatch({
					type: get_active_register_type,
					payload: data.register,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(
					dispatch,
					get_active_register_error_type,
					response,
					message
				)
			);
	};
};

export const load_put_active_register_type = "load_put_active_register";
export const loadPutActiveRegisterAction = () => {
	return {
		type: load_put_active_register_type,
	};
};

export const put_active_register_type = "PUT_ACTIVE_REGISTER";
export const put_active_register_error_type = "PUT_ACTIVE_REGISTER_ERROR";
export const putActiveRegisterAction = () => {
	return (dispatch) => {
		axios
			.put("/api/register")
			.then(({ data }) => {
				return dispatch({
					type: put_active_register_type,
					payload: data.register,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(
					dispatch,
					put_active_register_error_type,
					response,
					message
				)
			);
	};
};
