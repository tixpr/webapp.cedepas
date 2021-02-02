import React, { useEffect } from "react";
import clsx from "clsx";
import Form, { Submit } from "../../../components/Form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import Load from "../../../components/Load";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
	loadDeleteAreaAction,
	clearDeleteAreaAction,
	deleteAreaAction,
} from "../../redux/actions/areasActions";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";

const DeleteAreaform = ({ area_id, onSuccess, onCancel }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { handleSubmit } = useForm();
	const load = useSelector((state) => state.admin.areas.delete_area_load);
	const action_error = useSelector(
		(state) => state.admin.areas.delete_area_errors
	);
	const action_success = useSelector(
		(state) => state.admin.areas.delete_area_success
	);
	const dispatch = useDispatch();
	const submit = () => {
		dispatch(loadDeleteAreaAction());
		dispatch(deleteAreaAction(area_id));
	};
	if (action_success) {
		onSuccess && onSuccess();
	}
	useEffect(() => {
		return () => dispatch(clearDeleteAreaAction());
	}, [dispatch]);
	return (
		<Form
			className="grow"
			fielset="bg-white box-shadow"
			onSubmit={handleSubmit(submit)}
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
					<center>Confirme la elimnación</center>
				</Text>
				<Submit
					hidden={load}
					icon={faTrash}
					bg_color="danger"
					text_color="white"
					text="Eliminar"
					center
				/>
				<Button
					hidden={load}
					text="Cancelar"
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

export default DeleteAreaform;
