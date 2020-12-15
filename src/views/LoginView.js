import React, {Fragment} from 'react';
import './LoginView.scss';
import Input from '../components/Input';
import Submit from '../components/Submit';

import {useForm} from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import {loginAction} from '../redux/actions/authActions';

function LoginView(){
	const { register, handleSubmit, errors } = useForm({
		defaultValues:{
			email: "tixpr@gmail.com",
			password: "usuario"
		}
	});
	const h= useHistory();
	const user = useSelector(state=>state.auth.user);
	const dispatch = useDispatch();
	const on_submit = (data) => {
		console.info('Login acction');
		dispatch(loginAction(data.email,data.password));
	};
	if(user){
		return (
			<Redirect
				to={{
					pathname: "/",
					state: { from: h.location }
				}}
			/>
		);
	}
	return (
		<Fragment>
			<form
				className="flex-column flex-center login-form"
				onSubmit={handleSubmit(on_submit)}>
				<div className="flex-column">
					<Input
						name="email"
						pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
						register={register}
						label="Correo electrónico"
						error={errors.email}
						/>
					<Input
						name="password"
						type="password"
						register={register}
						label="Contraseña"
						error={errors.password}
						/>
					<Submit>
						Ingresar
					</Submit>
				</div>
			</form>
			<div className="slider-login grow">
			</div>
		</Fragment>
	);
};

export default LoginView;