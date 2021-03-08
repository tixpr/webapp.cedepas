import React, { useEffect } from "react";
import {
	clearPostCourseAreaAction,
	postCourseAreaAction,
	loadPostCourseAreaAction,
} from "../../redux/actions/areasActions";
import Form, { Submit } from "../../../components/Form";
import InputForm from "../../../components/InputForm";
import Button from "../../../components/Button";
import Load from "../../../components/Load";
import { useDispatch, useSelector } from "react-redux";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";

const add_course_schema = yup.object().shape({
	name: yup.string().required("Requerido"),
	program: yup.string().required("Requerido"),
	code: yup.string().required("Requerido"),
	credits: yup
		.number()
		.min(1.0, "El credito debe de ser minimo 1.0")
		.max(9.9, "El valor maximo debe de ser menor a 10")
		.required("Requerido"),
	hours: yup
		.number()
		.min(1, "Las horas deben de ser minimo 1")
		.required("Requerido"),
});

const AddCourseForm = ({ onSuccess, onCancel, area_id }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		defaultValues: {
			credits: 1,
			hours: 1,
		},
		resolver: yupResolver(add_course_schema),
	});
	const action_success = useSelector(
		(state) => state.admin.areas.post_course_success
	);
	const action_errors = useSelector(
		(state) => state.admin.areas.post_course_errors
	);
	const load = useSelector((state) => state.admin.areas.post_course_load);
	const submit = (d) => {
		dispatch(loadPostCourseAreaAction());
		dispatch(postCourseAreaAction(d, area_id));
	};
	const dispatch = useDispatch();
	if (action_success) {
		onSuccess && onSuccess();
	}
	useEffect(() => {
		return dispatch(clearPostCourseAreaAction());
	}, [dispatch]);
	return (
		<Form
			legend="Nuevo Curso"
			className="grow"
			onSubmit={handleSubmit(submit)}
			errors={action_errors}
		>
			{load && <Load />}
			<div
				className={clsx(
					lg && "flex-row wrap align-start",
					!lg && "flex-column"
				)}
			>
				<InputForm
					label="Nombre del Curso"
					name="name"
					hidden={load}
					add_class="grow"
					register={register}
					error={errors.name}
				/>
				<div
					className={clsx(
						lg && "flex-row grow nowrap justify-evenly",
						!lg && "flex-column"
					)}
				>
					<InputForm
						label="Código"
						name="code"
						type="text"
						hidden={load}
						register={register}
						error={errors.code}
					/>
					<InputForm
						label="Programa"
						name="program"
						type="text"
						hidden={load}
						register={register}
						error={errors.program}
					/>
					<InputForm
						label="Creditos"
						name="credits"
						type="number"
						hidden={load}
						register={register}
						error={errors.credits}
					/>
					<InputForm
						label="Horas"
						name="hours"
						type="number"
						hidden={load}
						register={register}
						error={errors.hours}
					/>
				</div>
			</div>
			<div
				className={clsx(
					lg && "flex-row justify-evenly",
					!lg && "flex-column"
				)}
			>
				<Submit hidden={load} text="Aceptar" center icon={faSave} />
				<Button
					text="Cancelar"
					icon={faTimes}
					hidden={load}
					center
					bg_color="danger"
					text_color="white"
					onClick={onCancel}
				/>
			</div>
		</Form>
	);
};

export default AddCourseForm;
