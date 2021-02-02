import React from "react";
import "./LoginView.scss";
import InputForm from "../components/InputForm";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import Load from "../components/Load";
import Form, { Submit } from "../components/Form";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { loginAction, loadLoginAction } from "../redux/actions/authActions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMediaQuery } from "react-responsive";
import clsx from "clsx";
import logo_cedepas250 from "../images/logo_cedepas250.jpeg";
import ButtonLink from "../components/ButtonLink";

const schema = yup.object().shape({
	email: yup
		.string()
		.email("Debe de ser un correo")
		.required("Es obligatorio"),
	password: yup.string().required("Es obligatorio"),
});
const LoginView = () => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		defaultValues: {
			email: "cedepas_admin@gmail.com",
			password: "contraseña",
		},
		resolver: yupResolver(schema),
	});
	const h = useHistory();
	const user = useSelector((state) => state.auth.user);
	const action_error = useSelector((state) => state.auth.login_error);
	const load = useSelector((state) => state.auth.login_load);
	const dispatch = useDispatch();
	const on_submit = (data) => {
		dispatch(loadLoginAction());
		dispatch(loginAction(data.email, data.password));
	};
	if (user) {
		return (
			<Redirect
				to={{
					pathname: "/",
					state: { from: h.location },
				}}
			/>
		);
	}
	return (
		<div
			className={clsx(
				"grow login-container",
				lg && "flex-row",
				!lg && "flex-column justify-center"
			)}
		>
			<Form
				className={clsx(
					"flex-column login-form bg-white",
					lg && "login-max",
					!lg && "grow"
				)}
				fielset="grow"
				onSubmit={handleSubmit(on_submit)}
				errors={action_error}
			>
				<div className="grow flex-column justify-center">
					<img
						className="logo-login"
						src={logo_cedepas250}
						alt="logo"
					/>
					<div className="flex-column">{load && <Load />}</div>
					<InputForm
						name="email"
						register={register}
						hidden={load}
						label="Correo electrónico"
						error={errors.email}
					/>
					<InputForm
						hidden={load}
						name="password"
						type="password"
						register={register}
						label="Contraseña"
						error={errors.password}
					/>
					<Submit
						hidden={load}
						icon={faSignInAlt}
						text="Ingresar"
						center
					/>
					<ButtonLink
						to="/password_recovery"
						text="¿Olvide mi contraseña?"
						not_border
						hidden={load}
						bg_color="white"
						center
						text_color="danger"
					/>
				</div>
			</Form>
			{lg && <div className="grow slider-login"></div>}
		</div>
	);
};

export default LoginView;
