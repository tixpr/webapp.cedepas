import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Form, { Submit } from "../../components/Form";
import Button from "../../components/Button";
import InputForm from "../../components/InputForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Load from "../../components/Load";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
	loadPutUserNoteAction,
	resetPutUserNoteAction,
	putUserNoteAction,
} from "../redux/actions/courseActions";

const edit_note_schema = yup.object().shape({
	note: yup.number().required("Requerido"),
});

const EditNoteForm = ({ note, note_id, user_id, onCancel, onSuccess }) => {
	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			note: note,
		},
		mode: "onBlur",
		resolver: yupResolver(edit_note_schema),
	});
	const dispatch = useDispatch();
	const load = useSelector(
		(state) => state.teacher.course.put_user_note_load
	);
	const action_errors = useSelector(
		(state) => state.teacher.course.put_user_note_errors
	);
	const success = useSelector(
		(state) => state.teacher.course.put_user_note_success
	);
	const submit = (d) => {
		dispatch(loadPutUserNoteAction());
		dispatch(putUserNoteAction(user_id, note_id, d));
		console.info("edit note submit", d);
	};
	useEffect(() => {
		return () => dispatch(resetPutUserNoteAction());
	}, [dispatch]);
	if (success) {
		onSuccess && onSuccess();
	}
	return (
		<div className="container-absolute flex-row flex-center">
			<div className="flex-row flex-center bg-white padding-10">
				<Form
					legend="Editar Nota"
					fielset="bg-white"
					onSubmit={handleSubmit(submit)}
					errors={action_errors}
				>
					<div className="flex-column">
						{load && <Load />}
						<InputForm
							label="Nota"
							name="note"
							type="number"
							hidden={load}
							error={errors.note}
							register={register}
						/>
						<div className="flex-row flex-center">
							<Submit hidden={load} text="Editar" icon={faEdit} />
							<Button
								hidden={load}
								text="Cancelar"
								icon={faTimes}
								bg_color="danger"
								text_color="white"
								onClick={onCancel}
							/>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default EditNoteForm;
