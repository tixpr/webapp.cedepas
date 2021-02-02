import React, { useEffect } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import Form, { Submit } from "../../../components/Form";
import Load from "../../../components/Load";
import Text from "../../../components/Text";
import InputForm from "../../../components/InputForm";
import SwitchForm from "../../../components/SwitchForm";
import { useDispatch, useSelector } from "react-redux";
import {
	putUserAction,
	loadPutUserAction,
	clearPutUserAction,
} from "../../redux/actions/usersActions";
import Button from "../../../components/Button";
import { faUserEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMediaQuery } from "react-responsive";

const new_user_schema = yup.object().shape({
	firstname: yup.string().required("Requerido"),
	lastname: yup.string().required("Requerido"),
	email: yup.string().email("Invalido").required("Requerido"),
	phone: yup.string().nullable(),
	teacher: yup.boolean(),
	student: yup.boolean(),
});
const EditUserForm = ({ onSuccess, onCancel, user }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const is_teacher = user.roles.includes("Docente");
	const is_student = user.roles.includes("Estudiante");
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		defaultValues: {
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
			phone: user.phone,
			teacher: is_teacher,
			student: is_student,
		},
		resolver: yupResolver(new_user_schema),
	});
	const load = useSelector((state) => state.admin.users.put_user_load);
	const action_error = useSelector(
		(state) => state.admin.users.put_user_errors
	);
	const action_success = useSelector(
		(state) => state.admin.users.put_user_success
	);
	const dispatch = useDispatch();
	const submit = (d) => {
		dispatch(loadPutUserAction());
		dispatch(putUserAction(d, user.id));
	};
	if (action_success) {
		onSuccess && onSuccess();
	}
	useEffect(() => {
		return () => dispatch(clearPutUserAction());
	}, [dispatch]);
	return (
		<Form
			className="grow"
			legend="Editar usuario"
			fielset="bg-white box-shadow"
			onSubmit={handleSubmit(submit)}
			errors={action_error}
			success={action_success}
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
					lg && "flex-row justify-evenly",
					!lg && "flex-column"
				)}
			>
				<Submit hidden={load} icon={faUserEdit} text="Editar" center />
				<Button
					hidden={load}
					text="Cancelar"
					icon={faTimes}
					center
					text_color="white"
					bg_color="danger"
					onClick={onCancel}
				/>
			</div>
		</Form>
	);
};
export default EditUserForm;
