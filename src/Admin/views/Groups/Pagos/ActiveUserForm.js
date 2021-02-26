import React, { useEffect } from "react";
import clsx from "clsx";
import {
	pagoActiveUserAction,
	loadPagoActiveUserAction,
	clearPagoActiveUserAction,
} from "../../../redux/actions/pagosActions";
import { useForm } from "react-hook-form";
import Form, { Submit } from "../../../../components/Form";
import Button from "../../../../components/Button";
import Load from "../../../../components/Load";
import {
	faTimes,
	faUserCheck,
	faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

const ActiveUserForm = ({ onCancel, onSuccess, user }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { handleSubmit } = useForm();
	const load = useSelector((state) => state.admin.pagos.active_user_load);
	const action_error = useSelector(
		(state) => state.admin.pagos.active_user_errors
	);
	const action_success = useSelector(
		(state) => state.admin.pagos.active_user_success
	);
	const dispatch = useDispatch();
	const submit = () => {
		dispatch(loadPagoActiveUserAction());
		dispatch(pagoActiveUserAction(user.id));
	};
	if (action_success) {
		onSuccess && onSuccess();
	}
	useEffect(() => {
		return () => dispatch(clearPagoActiveUserAction());
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
				<Submit
					center
					hidden={load}
					icon={user.active ? faUserLock : faUserCheck}
					text={
						user.active
							? "Click para inhabilitar usuario"
							: "Click para habilitar usuario"
					}
					bg_color={user.active ? "danger" : "primary"}
					add_class="grow"
				/>
				<Button
					icon={faTimes}
					text="Cancelar"
					hidden={load}
					center
					text_color="white"
					bg_color={user.active ? "primary" : "danger"}
					onClick={onCancel}
					add_class="grow"
				/>
			</div>
		</Form>
	);
};

export default ActiveUserForm;
