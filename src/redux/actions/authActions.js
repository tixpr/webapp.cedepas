//import axios from 'axios';

export const is_login_type = "IS_LOGIN";
export const is_login_error_type = 'IS_LOGIN_ERROR';

const def = {
	pk: 1,
	name: "Adderlyn Tito Palacios Rojas",
	email: "tixpr7@gmail.com",
	nick: "tixpr",
	roles: [
		"admin",
		"teacher",
		"student"
	]
};

export const isLoginAction = ()=>{
	return dispatch=>{
		/*
		axios.get('api/user')
		.then(res=>{
			console.info('is login =>', res);
			return dispatch({
				type:is_login_type,
				payload: res.data
			});
		}).catch(err=>{
			console.error('error is login=>',err);
			return dispatch({
				type:is_login_error_type,
				payload: err
			});
		});
		*/
		setTimeout(() => {
			dispatch({
				type:is_login_type,
				payload: def
			});
		}, 700);
	};
};

export const login_type = 'LOGIN_USER';
export const login_error_type = "LOGIN_ERROR";

export const loginAction = (email, password) => {
	return dispatch => {
		/*
		axios.get('/sanctum/csrf-cookie').then( () => {
			axios.post('/login',{
				email,
				password
			}).then(res=>{
				console.info('login success=>',res.data);
				return dispatch({type:login_type, payload:res.data});
			}).catch(err=>{
				console.error('login error=>',err);
				return dispatch({type:login_error_type,payload:err});
			});
		}).catch(err=>{
			console.error('error sanctum=>', err);
			return dispatch({type:login_error_type,payload:err.message});
		});
		*/
		setTimeout(() => {
			dispatch({
				type:login_type,
				payload: def
			});
		}, 700);
	};
};

export const logout_type = "logout";
export const logout_error_type = "logout_error";
export const logoutAction = () => {
	return dispatch => {
		/*
		axios.post('/logout')
		.then(res=>{
			console.info('logout success',res);
			return dispatch({
				type:logout_type
			});
		})
		.catch(err=>{
			console.info('logout error',err);
			return dispatch({
				type: logout_error_type,
				payload: err.message
			});
		});
		*/
		setTimeout(() => {
			dispatch({
				type:logout_type,
				payload: null
			});
		}, 700);
	};
};
