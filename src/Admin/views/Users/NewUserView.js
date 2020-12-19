import React from "react";
import Input from "../../../components/Input";
import Back from "../../../components/Back";
import Form, { Submit } from "../../../components/Form";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
	postUserAction,
	loadUserAction,
	clearUserMessagesAction
} from "../../redux/actions/userActions";
import * as yup from "yup";

//const phone_reg_exp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
	name: yup.string().min(10, "Corto").required("Requerido"),
	email: yup.string().email("Invalido").required("Requerido"),
	password: yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
	password_confirmation: yup
		.string()
		.oneOf(
			[yup.ref("password"), null],
			"Las contraseñas deben de coincidir"
		),
});

const NewUserView = () => {
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(schema),
	});
	const is_load = useSelector((state) => state.admin.user.is_load);
	const action_error = useSelector((state) => state.admin.user.action_error);
	const action_success = useSelector(
		(state) => state.admin.user.action_success
	);
	const dispatch = useDispatch();
	const submit = (d) => {
		console.info(d);
		dispatch(loadUserAction());
		dispatch(postUserAction(d));
	};
	if(action_error||action_success){
		setTimeout(()=>{
			dispatch(clearUserMessagesAction());
		}, 7000);
	}
	return (
		<div className="container-lg">
			<Back />
			<Form
				legend="Nuevo usuario"
				fielset="bg-white"
				onSubmit={handleSubmit(submit)}
				errors={action_error}
				success={action_success}
			>
				{is_load ? <p>Cargando</p> : null}
				<Input
					name="name"
					upper
					register={register}
					label="Nombre(s) y Appellidos"
					error={errors.name}
				/>
				<Input
					name="email"
					register={register}
					label="Correo"
					error={errors.email}
				/>
				<Input
					name="password"
					type="password"
					register={register}
					label="Contraseña"
					error={errors.password}
				/>
				<Input
					name="password_confirmation"
					type="password"
					register={register}
					label="Confirmar contraseña"
					error={errors.password_confirmation}
				/>
				<Input
					name="phone"
					register={register}
					label="Celular"
					error={errors.phone}
				/>
				<Submit icon={faUserPlus} text="Crear" center />
			</Form>
		</div>
	);
};

export default NewUserView;
