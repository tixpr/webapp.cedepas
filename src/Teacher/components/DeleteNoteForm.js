import React, { useEffect } from "react";
import clsx from "clsx";
import {
	loadDeleteNoteAction,
	resetDeleteNoteAction,
	deleteNoteAction,
} from "../redux/actions/courseActions";
import { useForm } from "react-hook-form";
import Form, { Submit } from "../../components/Form";
import Button from "../../components/Button";
import Text from "../../components/Text";
import Load from "../../components/Load";
import { useSelector, useDispatch } from "react-redux";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";

const DeleteNoteForm = ({ onCancel, onSuccess, note_id }) => {
	const { handleSubmit } = useForm();
	const load = useSelector((state) => state.teacher.course.delete_note_load);
	const errors = useSelector(
		(state) => state.teacher.course.delete_note_errors
	);
	const success = useSelector(
		(state) => state.teacher.course.delete_note_success
	);
	const dispatch = useDispatch();
	const submit = () => {
		dispatch(loadDeleteNoteAction());
		dispatch(deleteNoteAction(note_id));
	};
	if (success) {
		onSuccess && onSuccess();
	}
	useEffect(() => {
		return () => {
			dispatch(resetDeleteNoteAction());
			onSuccess && onSuccess();
		};
	}, [dispatch, onSuccess]);
	return (
		<div className="container-absolute flex-row flex-center">
			<div className="flex-row flex-center bg-white padding-10">
				<Form
					className="margin-10"
					legend="Eliminar Nota"
					onSubmit={handleSubmit(submit)}
					fielset="bg-white align-center"
					errors={errors}
				>
					{load && <Load />}
					<Text
						h3
						className={clsx("grow text-danger", load && "hidden")}
					>
						Confirme la eliminación
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
							hidden={load}
							icon={faTimes}
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

export default DeleteNoteForm;
