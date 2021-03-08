import React, { useEffect } from "react";
import clsx from "clsx";
import {
	deleteUserAction,
	loadDeleteUserAction,
	clearDeleteUserAction,
} from "../../redux/actions/usersActions";
import { useForm } from "react-hook-form";
import Form, { Submit } from "../../../components/Form";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import Load from "../../../components/Load";
import { useSelector, useDispatch } from "react-redux";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

const DeleteUserForm = ({ onCancel, onSuccess, user_id }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { handleSubmit } = useForm();
	const load = useSelector((state) => state.admin.users.delete_user_load);
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
		onSuccess && onSuccess();
	}
	useEffect(() => {
		return () => dispatch(clearDeleteUserAction());
	}, [dispatch]);
	return (
		<Form
			className="grow"
			onSubmit={handleSubmit(submit)}
			fielset="bg-white box-shadow"
			errors={action_error}
		>
			{load && <Load />}
			<div
				className={clsx(
					lg && "flex-row align-center",
					!lg && "flex-column"
				)}
			>
				<Text h3 className={clsx("grow text-danger", load && "hidden")}>
					<center>Confirme la elimniación del usuario</center>
				</Text>
				<Submit
					center
					text="Eliminar"
					icon={faTrash}
					bg_color="danger"
					hidden={load}
				/>
				<Button
					text="Cancelar"
					hidden={load}
					center
					icon={faTimes}
					text_color="white"
					bg_color="primary"
					onClick={onCancel}
				/>
			</div>
		</Form>
	);
};

export default DeleteUserForm;
