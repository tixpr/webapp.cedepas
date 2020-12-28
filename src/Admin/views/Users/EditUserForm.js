import React from "react";
import { useForm } from "react-hook-form";
import Form, { Submit } from "../../../components/Form";
import InputForm from "../../../components/InputForm";
import { useDispatch, useSelector } from "react-redux";
import {
	putUserAction,
	loadPutUserAction,
	clearPutUserAction,
} from "../../redux/actions/usersActions";
import Button from "../../../components/Button";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const new_user_schema = yup.object().shape({
	firstname: yup.string().required("Requerido"),
	lastname: yup.string().required("Requerido"),
	email: yup.string().email("Invalido").required("Requerido"),
	phone: yup.string().nullable(),
});
const EditUserForm = ({ onSuccess, onCancel, user }) => {
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		defaultValues: {
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
			phone: user.phone,
		},
		resolver: yupResolver(new_user_schema),
	});
	const is_load = useSelector((state) => state.admin.users.put_user_load);
	const action_error = useSelector(
		(state) => state.admin.users.put_user_errors
	);
	const action_success = useSelector(
		(state) => state.admin.users.put_user_success
	);
	const dispatch = useDispatch();
	const submit = (d) => {
		console.info(d);
		dispatch(loadPutUserAction());
		dispatch(putUserAction(d, user.id));
	};
	if (action_success) {
		dispatch(clearPutUserAction());
		onSuccess && onSuccess();
	}
	return (
		<Form
			fielset="bg-white"
			onSubmit={handleSubmit(submit)}
			errors={action_error}
			success={action_success}
		>
			{is_load ? <p>Procesando...</p> : null}
			<InputForm
				name="firstname"
				upper
				hidden={is_load}
				register={register}
				label="Nombre(s)"
				error={errors.firstname}
			/>
			<InputForm
				name="lastname"
				upper
				hidden={is_load}
				register={register}
				label="Appellidos"
				error={errors.lastname}
			/>
			<InputForm
				name="email"
				register={register}
				label="Correo"
				hidden={is_load}
				error={errors.email}
			/>
			<InputForm
				name="phone"
				register={register}
				label="Celular"
				error={errors.phone}
				hidden={is_load}
			/>
			<div className="flex-row flex-center">
				<Submit
					hidden={is_load}
					icon={faUserEdit}
					text="Editar"
					center
				/>
				<Button
					hidden={is_load}
					text="Cancelar"
					text_color="white"
					bg_color="danger"
					onClick={onCancel}
				/>
			</div>
		</Form>
	);
};
export default EditUserForm;
