import React from "react";
import Form, { Submit } from "../../../components/Form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import Load from '../../../components/Load';
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
	loadDeleteCourseAction,
	clearDeleteCourseAction,
	deleteCourseAction,
} from "../../redux/actions/areasActions";
import { useForm } from "react-hook-form";

const DeleteCourseform = ({ course_id, area_id, onSuccess, onCancel }) => {
	const { handleSubmit } = useForm();
	const is_load = useSelector(
		(state) => state.admin.areas.delete_course_load
	);
	const action_error = useSelector(
		(state) => state.admin.areas.delete_course_errors
	);
	const action_success = useSelector(
		(state) => state.admin.areas.delete_course_success
	);
	const dispatch = useDispatch();
	const submit = () => {
		dispatch(loadDeleteCourseAction());
		dispatch(deleteCourseAction(area_id, course_id));
	};
	if (action_success) {
		dispatch(clearDeleteCourseAction());
		onSuccess && onSuccess();
	}
	return (
		<Form
			className="flex-row align-center"
			fielset="bg-white"
			onSubmit={handleSubmit(submit)}
			errors={action_error}
			success={action_success}
		>
			{is_load ? (
				<Load />
			) : (
				<>
					<Text h3 className="grow text-danger">
						Confirme la elimnación
					</Text>
					<Submit
						hidden={is_load}
						icon={faTrash}
						bg_color="danger"
						text_color="white"
						text="Eliminar"
						center
					/>
					<Button
						hidden={is_load}
						text="Cancelar"
						icon={faTimes}
						text_color="white"
						bg_color="primary"
						onClick={onCancel}
					/>
				</>
			)}
		</Form>
	);
};

export default DeleteCourseform;
