import React from "react";
import {
	clearPutCourseAction,
	putCourseAction,
	loadPutCourseAction,
} from "../../redux/actions/areasActions";
import Form, { Submit } from "../../../components/Form";
import InputForm from "../../../components/InputForm";
import Button from "../../../components/Button";
import Load from '../../../components/Load';
import { useDispatch, useSelector } from "react-redux";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const edit_course_schema = yup.object().shape({
	name: yup.string().required("Requerido"),
	credits: yup
		.number()
		.min(1, "El credito debe de ser minimo 1")
		.required("Requerido"),
	hours: yup
		.number()
		.min(1, "Las horas deben de ser minimo 1")
		.required("Requerido"),
});

const EditCourseForm = ({ onSuccess, onCancel, course, area_id }) => {
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		defaultValues: {
			name: course.name,
			credits: course.credits,
			hours: course.hours,
		},
		resolver: yupResolver(edit_course_schema),
	});
	const action_success = useSelector(
		(state) => state.admin.areas.put_course_success
	);
	const action_errors = useSelector(
		(state) => state.admin.areas.put_course_errors
	);
	const is_load = useSelector((state) => state.admin.areas.put_course_load);
	const submit = (d) => {
		dispatch(loadPutCourseAction());
		dispatch(putCourseAction(d, area_id, course.id));
	};
	const dispatch = useDispatch();
	if (action_success) {
		dispatch(clearPutCourseAction());
		onSuccess && onSuccess();
	}
	return (
		<Form
			legend="Editar Curso"
			onSubmit={handleSubmit(submit)}
			errors={action_errors}
		>
			{is_load ? (
				<Load />
			) : (
				<>
					<div className="flex-row wrap align-start">
						<InputForm
							label="Nombre del Curso"
							name="name"
							upper
							add_class="grow"
							register={register}
							error={errors.name}
						/>
						<div className="flex-row grow nowrap justify-evenly">
							<InputForm
								label="Creditos"
								name="credits"
								type="number"
								register={register}
								error={errors.credits}
							/>
							<InputForm
								label="Horas"
								name="hours"
								type="number"
								register={register}
								error={errors.hours}
							/>
						</div>
					</div>
					<div className="flex-row flex-center">
						<Submit text="Aceptar" icon={faSave} />
						<Button
							text="Cancelar"
							icon={faTimes}
							bg_color="danger"
							text_color="white"
							onClick={onCancel}
						/>
					</div>
				</>
			)}
		</Form>
	);
};

export default EditCourseForm;
