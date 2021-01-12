import React from "react";
import {
	activeUserAction,
	loadActiveUserAction,
	clearActiveUserAction,
} from "../../redux/actions/usersActions";
import { useForm } from "react-hook-form";
import Form, { Submit } from "../../../components/Form";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import Load from "../../../components/Load";
import { useSelector, useDispatch } from "react-redux";

const ActiveUserForm = ({ onCancel, onSuccess, user }) => {
	const { handleSubmit } = useForm();
	const is_load = useSelector((state) => state.admin.users.active_user_load);
	const action_error = useSelector(
		(state) => state.admin.users.active_user_errors
	);
	const action_success = useSelector(
		(state) => state.admin.users.active_user_success
	);
	const dispatch = useDispatch();
	const submit = () => {
		dispatch(loadActiveUserAction());
		dispatch(activeUserAction(user.id));
	};
	if (action_success) {
		dispatch(clearActiveUserAction());
		onSuccess && onSuccess();
	}
	return (
		<Form
			className="flex-row align-center"
			onSubmit={handleSubmit(submit)}
			fielset="bg-white"
			errors={action_error}
			success={action_success}
		>
			{is_load ? (
				<Load />
			) : (
				<>
					<Text h3 className="grow text-danger">
						Confirme la operación
					</Text>
					<Submit
						center
						text={user.active ? "Inhabilitar" : "Habilitar"}
						bg_color={user.active ? "danger" : "primary"}
						hidden={is_load}
					/>
					<Button
						text="Cancelar"
						hidden={is_load}
						text_color="white"
						bg_color={user.active ? "primary" : "danger"}
						onClick={onCancel}
					/>
				</>
			)}
		</Form>
	);
};

export default ActiveUserForm;
