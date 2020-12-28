import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/Button";
import Text from "../../../../components/Text";
//new period actions
import {
	loadDeleteCourseAction,
	clearDeleteCourseAction,
	deleteCourseAction
} from '../../../redux/actions/coursesActions';
//componentes
import Form, { Submit } from "../../../../components/Form";
import { useForm } from "react-hook-form";

import {
	faCheck,
	faWindowClose,
} from "@fortawesome/free-solid-svg-icons";

const DeleteCourseForm = ({ onSuccess, course, onCancel }) => {
	const { handleSubmit } = useForm();
	const is_load = useSelector(
		(state) => state.admin.courses.delete_course_load
	);
	const action_error = useSelector(
		(state) => state.admin.courses.delete_course_errors
	);
	const action_success = useSelector(
		(state) => state.admin.courses.delete_course_success
	);
	const dispatch = useDispatch();
	const submit = (d) => {
		dispatch(loadDeleteCourseAction());
		dispatch(deleteCourseAction(course.id));
	};
	if (action_success) {
		dispatch(clearDeleteCourseAction());
		onSuccess && onSuccess();
	}
	return (
		<div className="grow">
			<Form
				fielset="bg-white"
				onSubmit={handleSubmit(submit)}
				errors={action_error}
				success={action_success}
			>
				<div className="flex-row">
					<div className="grow">
						{is_load ? (
							<p>Cargando</p>
						) : (
							<Text h3 className="text-danger">
								Confirmar la eliminación
							</Text>
						)}
					</div>
					<Submit
						icon={faCheck}
						bg_color="danger"
						text_color="white"
						center
					/>
					<Button
						icon={faWindowClose}
						bg_color="success"
						text_color="white"
						onClick={onCancel}
					/>
				</div>
			</Form>
		</div>
	);
};

export default DeleteCourseForm;