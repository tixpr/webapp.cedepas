import {
	is_login_type,
	is_login_error_type,
	login_type,
	login_error_type,
	logout_type,
	logout_error_type
} from '../actions/authActions';

const initial = {
	user: null,
	is_load: true,
	is_login_error: null,
	login_error: null,
	logout_error: null
};

const authReducer = (state = initial, { type, payload }) => {
	switch (type) {
		case is_login_type:
			return Object.assign(state,{
				is_login_error:null,
				user:payload,
				is_load:false
			});
		case is_login_error_type:
			return Object.assign(state,{
				is_load:false
			});
		case login_type:
			return Object.assign(state, {
				user: payload,
				is_load: false,
				login_error: null
			});
		case login_error_type:
			return Object.assign(state, { login_error: 'Error en la autenticación' });
		case logout_error_type:
			return Object.assign(state, { logout_error: payload });
		case logout_type:
			return Object.assign(state, {
				user: null,
				logout_error: null
			});
		default: return state;
	}
}
export default authReducer;