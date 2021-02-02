import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form, { Submit } from "../../components/Form";
import InputForm from "../../components/InputForm";
import SwitchForm from "../../components/SwitchForm";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Load from "../../components/Load";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
	loadPostPresenceAction,
	resetPostPresenceAction,
	postPresenceAction,
} from "../redux/actions/courseActions";

const AddPresenceForm = ({ course_group_id, onSuccess, onCancel }) => {
	const students = useSelector((state) => state.teacher.course.students);
	let schemas = {};
	let def_values = {};
	schemas["date"] = yup
		.date()
		.typeError("Error de fecha")
		.required("Requerido");
	def_values["date"] = Date.now().toString().substr(0, 10);
	students.forEach((s) => {
		schemas[`st_${s.id}`] = yup.boolean().required("Requerido");
		def_values[`st_${s.id}`] = true;
	});
	const { register, handleSubmit, errors } = useForm({
		defaultValues: def_values,
		mode: "onBlur",
		resolver: yupResolver(yup.object().shape(schemas)),
	});
	const dispatch = useDispatch();
	const action_errors = useSelector(
		(state) => state.teacher.course.post_presence_errors
	);
	const load = useSelector(
		(state) => state.teacher.course.post_presence_load
	);
	const success = useSelector(
		(state) => state.teacher.course.post_presence_success
	);
	const submit = (d) => {
		d.date = d.date.toISOString().substr(0, 10);
		dispatch(loadPostPresenceAction());
		dispatch(postPresenceAction(course_group_id, d));
	};
	useEffect(() => {
		return () => dispatch(resetPostPresenceAction());
	}, [dispatch]);
	if (success) {
		onSuccess && onSuccess();
	}
	return (
		<div className="flex-column bg-white padding-10 container-lg">
			<Form
				legend="Agregar Asistencia"
				fielset="grow bg-white"
				onSubmit={handleSubmit(submit)}
				errors={action_errors}
			>
				<div className="flex-column">
					{load && <Load />}
					<InputForm
						label="FECHA"
						name="date"
						type="date"
						hidden={load}
						inline
						control_grow
						error={errors.date}
						register={register}
					/>
					{students &&
						students.map((student) => (
							<SwitchForm
								key={`st-in-${student.id}`}
								hidden={load}
								text={student.name}
								name={`st_${student.id}`}
								error={errors[`st_${student.id}`]}
								register={register}
							/>
						))}
					<div className="flex-row flex-center">
						<Submit hidden={load} text="Aceptar" icon={faPlus} />
						<Button
							text="Cancelar"
							hidden={load}
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

export default AddPresenceForm;
