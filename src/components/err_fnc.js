const err_fnc = (dispatch, type, response, message) => {
	if (response) {
		if (response.status === 401) {
			window.location.reload();
		}
		return dispatch({
			type,
			payload: {
				data: response.data,
				status: response.status,
			},
		});
	}
	return dispatch({
		type,
		payload: message,
	});
};
export default err_fnc;
