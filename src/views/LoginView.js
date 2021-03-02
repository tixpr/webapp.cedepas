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
import ErrorMessage from "../components/ErrorMessage";
import SwitchForm from "../components/SwitchForm";

const schema = yup.object().shape({
	email: yup
		.string()
		.email("Debe de ser un correo")
		.required("Es obligatorio"),
	password: yup.string().required("Es obligatorio"),
	remember: yup.boolean(),
});
const LoginView = () => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		defaultValues: {
			email: "cedepas.webapp@gmail.com",
			password: "c3d3p@sc3ntr0",
			remember: true,
		},
		resolver: yupResolver(schema),
	});
	const h = useHistory();
	const user = useSelector((state) => state.auth.user);
	const action_error = useSelector((state) => state.auth.login_error);
	const load = useSelector((state) => state.auth.login_load);
	const is_register = useSelector((state) => state.register.register);
	const error_register = useSelector((state) => state.register.get_errors);
	const success_register = useSelector((state) => state.register.get_success);
	const load_register = useSelector((state) => state.register.get_load);
	const dispatch = useDispatch();
	const on_submit = (d) => {
		dispatch(loadLoginAction());
		dispatch(loginAction(d));
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
					<SwitchForm
						text="Recordarme"
						name="remember"
						hidden={load}
						error={errors.remember}
						register={register}
					/>
					<Submit
						hidden={load}
						icon={faSignInAlt}
						text="Ingresar"
						center
						add_class="box-shadow"
					/>
					<p className="text-center">
						{!load && (
							<a
								href="http://localhost:8000/password/reset"
								className="bg-white text-danger"
							>
								<strong>
									<i>¿Olvide mi contraseña?</i>
								</strong>
							</a>
						)}
					</p>
					{!lg && (
						<p className="text-center">
							{!load && !lg && (
								<div className="flex-column">
									{load_register && <Load />}
									{error_register && (
										<ErrorMessage msg={error_register} />
									)}
									{is_register &&
										!load_register &&
										success_register && (
											<h4 className="flex-column bg-warning margin-10 text-center box-shadow">
												<a
													href="http://localhost:8000/register"
													className="padding-10 text-dark"
												>
													Registrarse
												</a>
											</h4>
										)}
								</div>
							)}
						</p>
					)}
				</div>
			</Form>
			{lg && (
				<div className="grow flex-column slider-login">
					<div className="grow flex-row flex-center bg-transparent">
						{load_register && <Load />}
						{error_register && (
							<ErrorMessage msg={error_register} />
						)}
						{is_register && !load_register && success_register && (
							<a
								style={{
									width: "250px",
									height: "250px",
									fontSize: "2rem",
									borderRadius: "50%",
									border: "3px solid white",
								}}
								href="http://localhost:8000/register"
								className="flex-row flex-center boton-transparent text-center text-white box-shadow"
							>
								<strong>Registrarme</strong>
							</a>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default LoginView;
