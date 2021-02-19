import React, { useEffect } from "react";
import Form, { Submit } from "../../../../components/Form";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Load from "../../../../components/Load";
import { faUserPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import SelectForm from "../../../../components/SelectForm";
import {
	loadPostStudentCourseGroupAction,
	cleaPostStudentCourseGroupAction,
	postStudentCourseGroupAction,
} from "../../../redux/actions/courseGroupActions";
import clsx from 'clsx';
import {useMediaQuery} from 'react-responsive';

const add_student_schema = yup.object().shape({
	user_id: yup.number().typeError("Valor incorrecto").required("Requerido"),
});

const AddStudentForm = ({ onCancel, onSuccess, course_group_id }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(add_student_schema),
	});
	const submit = (d) => {
		dispatch(loadPostStudentCourseGroupAction());
		dispatch(postStudentCourseGroupAction(course_group_id, d));
	};
	const action_errors = useSelector(
		(state) => state.admin.course_group.post_student_errors
	);
	const searchs = useSelector((state) => state.admin.course_group.search);
	const dispatch = useDispatch();
	const load = useSelector(
		(state) => state.admin.course_group.post_student_load
	);
	useEffect(() => {
		return () => dispatch(cleaPostStudentCourseGroupAction());
	}, [dispatch]);
	return (
		<Form
			fielset="bg-white flex-column"
			onSubmit={handleSubmit(submit)}
			errors={action_errors}
		>
			{load && <Load />}
			<SelectForm
				label="Estudiante"
				name="user_id"
				options={searchs}
				hidden={load}
				ref={register}
				error={errors.user_id}
			/>
			<div className={clsx(lg&&"flex-row flex-center",!lg&&"flex-column")}>
				<Submit
					text="Agregar"
					icon={faUserPlus}
					hidden={load}
					bg_color="primary"
					text_color="white"
					center
				/>
				<Button
					text="Cancelar"
					icon={faTimes}
					hidden={load}
					bg_color="danger"
					text_color="white"
					onClick={onCancel}
					center
				/>
			</div>
		</Form>
	);
};

export default AddStudentForm;
