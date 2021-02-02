import React, { useEffect } from "react";
import clsx from "clsx";
import {
	loadDeletePresenceAction,
	resetDeletePresenceAction,
	deletePresenceAction,
} from "../redux/actions/courseActions";
import { useForm } from "react-hook-form";
import Form, { Submit } from "../../components/Form";
import Button from "../../components/Button";
import Text from "../../components/Text";
import Load from "../../components/Load";
import { useSelector, useDispatch } from "react-redux";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";

const DeletePresenceForm = ({ onCancel, onSuccess, presence_id }) => {
	const { handleSubmit } = useForm();
	const load = useSelector(
		(state) => state.teacher.course.delete_presence_load
	);
	const errors = useSelector(
		(state) => state.teacher.course.delete_presence_errors
	);
	const success = useSelector(
		(state) => state.teacher.course.delete_presence_success
	);
	const dispatch = useDispatch();
	const submit = () => {
		dispatch(loadDeletePresenceAction());
		dispatch(deletePresenceAction(presence_id));
	};
	if (success) {
		onSuccess && onSuccess();
	}
	useEffect(() => {
		return () => dispatch(resetDeletePresenceAction());
	}, [dispatch]);
	return (
		<div className="container-absolute flex-row flex-center">
			<div className="flex-row flex-center bg-white padding-10">
				<Form
					className="margin-10"
					legend="Eliminar Asistencia"
					onSubmit={handleSubmit(submit)}
					fielset="bg-white align-center"
					errors={errors}
				>
					{load && <Load />}
					<Text
						h3
						className={clsx("grow text-danger", load && "hidden")}
					>
						Confirme la elimnación
					</Text>
					<div className="flex-row">
						<Submit
							center
							text="Eliminar"
							icon={faTrash}
							bg_color="danger"
							hidden={load}
						/>
						<Button
							text="Cancelar"
							icon={faTimes}
							hidden={load}
							text_color="white"
							bg_color="primary"
							onClick={onCancel}
						/>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default DeletePresenceForm;
