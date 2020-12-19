import React from "react";
import "./LoginView.scss";
import Input from "../components/Input";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import Form, {Submit} from "../components/Form";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { loginAction } from "../redux/actions/authActions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMediaQuery } from "react-responsive";
import clsx from "clsx";

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
			email: "tixpr7@gmail.com",
			password: "password",
		},
		resolver: yupResolver(schema),
	});
	const h = useHistory();
	const user = useSelector((state) => state.auth.user);
	const action_error = useSelector((state) => state.auth.action_error);
	const dispatch = useDispatch();
	const on_submit = (data) => {
		console.info("Login acction");
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
		<div className={clsx(!lg && "flex-column", lg && "flex-row", "grow")}>
			<Form
				className="flex-column justify-center align-stretch login-form"
				onSubmit={handleSubmit(on_submit)}
				errors={action_error}
			>
				<div className="flex-column bg-white">
					<Input
						name="email"
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
					<Submit icon={faSignInAlt} text="Ingresar" center />
				</div>
			</Form>
			<div className="grow slider-login"></div>
		</div>
	);
};

export default LoginView;
