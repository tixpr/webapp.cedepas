import React from "react";
import {
	deleteUserAction,
	loadDeleteUserAction,
	clearDeleteUserAction,
} from "../../redux/actions/usersActions";
import { useForm } from "react-hook-form";
import Form, { Submit } from "../../../components/Form";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import { useSelector, useDispatch } from "react-redux";

const DeleteUserForm = ({ onCancel, onSuccess, user_id }) => {
	const { handleSubmit } = useForm();
	const is_load = useSelector((state) => state.admin.users.delete_user_load);
	const action_error = useSelector(
		(state) => state.admin.users.delete_user_errors
	);
	const action_success = useSelector(
		(state) => state.admin.users.delete_user_success
	);
	const dispatch = useDispatch();
	const submit = () => {
		dispatch(loadDeleteUserAction());
		dispatch(deleteUserAction(user_id));
	};
	if (action_success) {
		dispatch(clearDeleteUserAction());
		onSuccess && onSuccess();
	}
	return (
		<Form
			className="flex-row align-center"
			onSubmit={handleSubmit(submit)}
			errors={action_error}
			success={action_success}
		>
			{is_load ? (
				<p>Procesando...</p>
			) : (
				<Text h3 className="grow text-danger">
					Confirme la elimnación del usuario
				</Text>
			)}
			<Submit center text="Eliminar" bg_color="danger" hidden={is_load} />
			<Button
				text="Cancelar"
				hidden={is_load}
				text_color="white"
				bg_color="primary"
				onClick={onCancel}
			/>
		</Form>
	);
};

export default DeleteUserForm;
