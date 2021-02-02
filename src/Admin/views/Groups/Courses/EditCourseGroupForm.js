import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/Button";
import Load from '../../../../components/Load';
import {
	loadGetCoursesTeachersAction,
	getCoursesTeacherAction,
	loadPutCourseGroupAction,
	clearPutCourseGroupAction,
	putCourseGroupAction,
} from "../../../redux/actions/coursesGroupActions";
//componentes
import Form, { Submit } from "../../../../components/Form";
import SelectForm from "../../../../components/SelectForm";
import Text from "../../../../components/Text";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMediaQuery } from 'react-responsive';
import * as yup from "yup";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import clsx from "clsx";

const edit_course_group_schema = yup.object().shape({
	user_id: yup.number().required("Requerido"),
});
const EditCourseGroupForm = ({ onSuccess, course, onCancel }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			user_id: course.teacher.id,
		},
		mode: "onBlur",
		resolver: yupResolver(edit_course_group_schema),
	});
	const { group_id } = useParams();
	const is_load = useSelector(
		(state) => state.admin.courses_group.put_course_group_load
	);
	const load_teachers = useSelector(
		(state) => state.admin.courses_group.get_courses_teachers_load
	);
	const action_error = useSelector(
		(state) => state.admin.courses_group.put_course_group_errors
	);
	const action_success = useSelector(
		(state) => state.admin.courses_group.put_course_group_success
	);
	const teachers = useSelector((state) => state.admin.courses_group.teachers);
	const dispatch = useDispatch();
	const submit = (d) => {
		console.info(d);
		dispatch(loadPutCourseGroupAction());
		dispatch(putCourseGroupAction(d, course.id));
	};
	if (teachers.length < 1) {
		dispatch(loadGetCoursesTeachersAction());
		dispatch(getCoursesTeacherAction(group_id));
	}
	if (action_success) {
		onSuccess && onSuccess();
	}
	useEffect(() => {
		return () => {
			dispatch(clearPutCourseGroupAction());
		};
	}, [dispatch]);
	return (
		<div className="grow">
			<Form
				className="box-shadow"
				fielset="bg-white"
				onSubmit={handleSubmit(submit)}
				errors={action_error}
				success={action_success}
			>
				<div className="flex-column">
					{is_load || load_teachers ? (
						<Load />
					) : (
						<>
							<Text h3 className="text-dark">
								{course.name}
							</Text>
							<div className={clsx(lg&&"flex-row align-end justify-start",
							!lg&&"flex-column")}>
								<SelectForm
									label="Docente"
									name="user_id"
									options={teachers}
									ref={register}
									error={errors.user_id}
								/>
								<Submit
									text="Editar"
									icon={faEdit}
									bg_color="primary"
									text_color="white"
									center
								/>
								<Button
									text="Cancelar"
									icon={faTimes}
									bg_color="danger"
									text_color="white"
									center
									onClick={onCancel}
								/>
							</div>
						</>
					)}
				</div>
			</Form>
		</div>
	);
};
export default EditCourseGroupForm;
