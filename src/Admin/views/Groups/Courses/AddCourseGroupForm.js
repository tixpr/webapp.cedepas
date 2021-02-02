import React, { useEffect } from "react";
import clsx from 'clsx';
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/Button";
import Load from "../../../../components/Load";
//componentes
import Form, { Submit } from "../../../../components/Form";
import SelectForm from "../../../../components/SelectForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import {
	getCoursesTeacherAction,
	loadPostCourseGroupAction,
	postCourseGroupAction,
	clearPostCourseGroupAction,
} from "../../../redux/actions/coursesGroupActions";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from "../../../../components/ErrorMessage";

const new_course_schema = yup.object().shape({
	course_id: yup.number().required("Requerido"),
	user_id: yup.number().required("Requerido"),
});
const AddCourseGroupForm = ({ onSuccess, onCancel }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { group_id } = useParams();
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(new_course_schema),
	});
	const post_load = useSelector(
		(state) => state.admin.courses_group.post_course_group_load
	);
	const post_error = useSelector(
		(state) => state.admin.courses_group.post_course_group_errors
	);
	const post_success = useSelector(
		(state) => state.admin.courses_group.post_course_group_success
	);
	const get_load = useSelector(
		(state) => state.admin.courses_group.get_courses_teachers_load
	);
	const get_errors = useSelector(
		(state) => state.admin.courses_group.get_courses_teachers_errors
	);
	const courses = useSelector((state) => state.admin.courses_group.courses);
	const teachers = useSelector((state) => state.admin.courses_group.teachers);
	const dispatch = useDispatch();
	const submit = (d) => {
		dispatch(loadPostCourseGroupAction());
		dispatch(postCourseGroupAction(d, group_id));
	};
	useEffect(() => {
		dispatch(getCoursesTeacherAction(group_id));
		return () => {
			//dispatch(clearGetCoursesTeachersAction());
			dispatch(clearPostCourseGroupAction());
		};
	}, [dispatch, group_id]);
	if (post_success) {
		onSuccess && onSuccess();
	}
	if (get_errors) {
		return <ErrorMessage msg={get_errors} />;
	}
	return (
			<Form
				className="container-lg flex-column justify-stretch"
				legend="Agregar Curso"
				fielset="bg-white"
				onSubmit={handleSubmit(submit)}
				errors={post_error}
			>
				{post_load || get_load ? (
					<Load />
				) : (
					<>
						<div className={clsx(lg&&'flex-row',!lg&&'flex-column')}>
							<SelectForm
								ref={register}
								label="Curso"
								name="course_id"
								options={courses}
								error={errors.course_id}
							/>
							<SelectForm
								ref={register}
								label="Docente"
								name="user_id"
								options={teachers}
								error={errors.user_id}
							/>
						</div>
						<div className={clsx(lg&&"flex-row justify-evenly",!lg&&'flex-column')}>
							<Submit
								text="Agregar"
								icon={faPlus}
								bg_color="primary"
								text_color="white"
								center
							/>
							<Button
								text="Cancelar"
								icon={faTimes}
								bg_color="danger"
								text_color="white"
								onClick={onCancel}
								center
							/>
						</div>
					</>
				)}
			</Form>
	);
};

export default AddCourseGroupForm;
