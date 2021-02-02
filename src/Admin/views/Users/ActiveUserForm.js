import React, { useEffect } from "react";
import clsx from "clsx";
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
import {
	faExclamationCircle,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

const ActiveUserForm = ({ onCancel, onSuccess, user }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { handleSubmit } = useForm();
	const load = useSelector((state) => state.admin.users.active_user_load);
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
		onSuccess && onSuccess();
	}
	useEffect(() => {
		return () => dispatch(clearActiveUserAction());
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
					<center>
					Confirme la operación
					</center>
				</Text>
				<Submit
					center
					hidden={load}
					icon={faExclamationCircle}
					text={user.active ? "Inhabilitar" : "Habilitar"}
					bg_color={user.active ? "danger" : "primary"}
				/>
				<Button
					icon={faTimes}
					text="Cancelar"
					hidden={load}
					center
					text_color="white"
					bg_color={user.active ? "primary" : "danger"}
					onClick={onCancel}
				/>
			</div>
		</Form>
	);
};

export default ActiveUserForm;
