import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form, { Submit } from "../../components/Form";
import InputForm from "../../components/InputForm";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Load from "../../components/Load";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
	loadPostNoteAction,
	resetPostNoteAction,
	postNoteAction,
} from "../redux/actions/courseActions";

const AddNoteForm = ({ course_group_id, onSuccess, onCancel }) => {
	const students = useSelector((state) => state.teacher.course.students);
	let schemas = {};
	let def_values = {};
	schemas["name"] = yup.string().required("Requerido");
	students.forEach((s) => {
		schemas[`st_${s.id}`] = yup
			.number()
			.typeError("Debe de ser un número")
			.min(0, "El valor mínimo es 0")
			.required("Requerido");
		def_values[`st_${s.id}`] = 0;
	});
	const { register, handleSubmit, errors } = useForm({
		defaultValues: def_values,
		mode: "onBlur",
		resolver: yupResolver(yup.object().shape(schemas)),
	});
	const dispatch = useDispatch();
	const action_errors = useSelector(
		(state) => state.teacher.course.post_note_errors
	);
	const load = useSelector((state) => state.teacher.course.post_note_load);
	const success = useSelector(
		(state) => state.teacher.course.post_note_success
	);
	const submit = (d) => {
		console.info("add note data =>", d);
		dispatch(loadPostNoteAction());
		dispatch(postNoteAction(course_group_id, d));
	};
	useEffect(() => {
		return () => dispatch(resetPostNoteAction());
	}, [dispatch]);
	if (success) {
		onSuccess && onSuccess();
	}
	return (
		<div className="flex-column bg-white padding-10 container-lg">
			<Form
				legend="Agregar Notas"
				fielset="grow bg-white"
				onSubmit={handleSubmit(submit)}
				errors={action_errors}
			>
				<div className="flex-column">
					{load && <Load />}
					<InputForm
						label="NOMBRE DE LA NOTA"
						name="name"
						hidden={load}
						upper
						inline
						error={errors.name}
						register={register}
					/>
					{students &&
						students.map((student) => (
							<InputForm
								key={`st-in-${student.id}`}
								inline
								type="number"
								min="0"
								hidden={load}
								label={student.name}
								name={`st_${student.id}`}
								error={errors[`st_${student.id}`]}
								register={register}
							/>
						))}
					<div className="flex-row flex-center">
						<Submit hidden={load} text="Aceptar" icon={faPlus} />
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
	);
};

export default AddNoteForm;
