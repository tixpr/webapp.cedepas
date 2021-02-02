import React, { useEffect } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import Form, { Submit } from "../../../components/Form";
import InputForm from "../../../components/InputForm";
import Load from "../../../components/Load";
import { useDispatch, useSelector } from "react-redux";
import {
	postUserAction,
	loadPostUserAction,
	clearPostUserAction,
} from "../../redux/actions/usersActions";
import Button from "../../../components/Button";
import { faUserPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Text from "../../../components/Text";
import SwitchForm from "../../../components/SwitchForm";
import { useMediaQuery } from "react-responsive";

const new_user_schema = yup.object().shape({
	firstname: yup.string().required("Requerido"),
	lastname: yup.string().required("Requerido"),
	email: yup.string().email("Invalido").required("Requerido"),
	phone: yup.string().nullable(),
	teacher: yup.boolean(),
	student: yup.boolean(),
});
const NewUserForm = ({ onSuccess, onCancel }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(new_user_schema),
	});
	const load = useSelector((state) => state.admin.users.post_user_load);
	const action_error = useSelector(
		(state) => state.admin.users.post_user_errors
	);
	const action_success = useSelector(
		(state) => state.admin.users.post_user_success
	);
	const dispatch = useDispatch();
	const submit = (d) => {
		dispatch(loadPostUserAction());
		dispatch(postUserAction(d));
	};
	if (action_success) {
		onSuccess && onSuccess();
	}
	useEffect(() => {
		return () => dispatch(clearPostUserAction());
	}, [dispatch]);
	return (
		<Form
			className="container-lg"
			legend="Nuevo usuario"
			fielset="bg-white"
			onSubmit={handleSubmit(submit)}
			errors={action_error}
		>
			{load && <Load />}
			<InputForm
				name="firstname"
				upper
				hidden={load}
				register={register}
				label="Nombre(s)"
				error={errors.firstname}
			/>
			<InputForm
				name="lastname"
				upper
				hidden={load}
				register={register}
				label="Apellidos"
				error={errors.lastname}
			/>
			<InputForm
				name="email"
				register={register}
				label="Correo"
				hidden={load}
				error={errors.email}
			/>
			<InputForm
				name="phone"
				register={register}
				label="Celular"
				error={errors.phone}
				hidden={load}
			/>
			<div className="flex-row align-center justify-start">
				<Text h4 className={clsx("text-dark", load && "hidden")}>
					Roles:
				</Text>
				<SwitchForm
					text="Estudiante"
					name="student"
					hidden={load}
					error={errors.student}
					register={register}
				/>
				<SwitchForm
					text="Docente"
					name="teacher"
					hidden={load}
					error={errors.teacher}
					register={register}
				/>
			</div>
			<div
				className={clsx(
					lg && "flex-row align-center justify-evenly",
					!lg && "flex-column"
				)}
			>
				<Submit hidden={load} icon={faUserPlus} text="Crear" center />
				<Button
					hidden={load}
					icon={faTimes}
					center
					text="Cancelar"
					text_color="white"
					bg_color="danger"
					onClick={onCancel}
				/>
			</div>
		</Form>
	);
};
export default NewUserForm;
