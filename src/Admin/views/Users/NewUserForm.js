import React from "react";
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

const new_user_schema = yup.object().shape({
	firstname: yup.string().required("Requerido"),
	lastname: yup.string().required("Requerido"),
	email: yup.string().email("Invalido").required("Requerido"),
	phone: yup.string().nullable(),
});
const NewUserForm = ({ onSuccess, onCancel }) => {
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(new_user_schema),
	});
	const is_load = useSelector((state) => state.admin.users.post_user_load);
	const action_error = useSelector(
		(state) => state.admin.users.post_user_errors
	);
	const action_success = useSelector(
		(state) => state.admin.users.post_user_success
	);
	const dispatch = useDispatch();
	const submit = (d) => {
		//console.info(d);
		dispatch(loadPostUserAction());
		dispatch(postUserAction(d));
	};
	const cancel = (e) => {
		e && e.preventDefault();
		dispatch(clearPostUserAction());
		onCancel && onCancel();
	};
	if (action_success) {
		dispatch(clearPostUserAction());
		onSuccess && onSuccess();
	}
	return (
		<Form
			legend="Nuevo usuario"
			fielset="bg-white"
			onSubmit={handleSubmit(submit)}
			errors={action_error}
			success={action_success}
		>
			{is_load ? (
				<Load />
			) : (
				<>
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
					<div className="flex-row align-center justify-evenly">
						<Submit
							hidden={is_load}
							icon={faUserPlus}
							text="Crear"
							center
						/>
						<Button
							hidden={is_load}
							icon={faTimes}
							text="Cancelar"
							text_color="white"
							bg_color="danger"
							onClick={cancel}
						/>
					</div>
				</>
			)}
		</Form>
	);
};
export default NewUserForm;
