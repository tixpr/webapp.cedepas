import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/Button";
import Text from "../../../../components/Text";
import Load from "../../../../components/Load";
//new period actions
import {
	loadDeleteCourseGroupAction,
	clearDeleteCourseGroupAction,
	deleteCourseGroupAction,
} from "../../../redux/actions/coursesGroupActions";
//componentes
import Form, { Submit } from "../../../../components/Form";
import { useForm } from "react-hook-form";

import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";

const DeleteCourseGroupForm = ({ onSuccess, course, onCancel }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { handleSubmit } = useForm();
	const load = useSelector(
		(state) => state.admin.courses_group.delete_course_group_load
	);
	const action_error = useSelector(
		(state) => state.admin.courses_group.delete_course_group_errors
	);
	const action_success = useSelector(
		(state) => state.admin.courses_group.delete_course_group_success
	);
	const dispatch = useDispatch();
	const submit = (d) => {
		dispatch(loadDeleteCourseGroupAction());
		dispatch(deleteCourseGroupAction(course.id));
	};
	useEffect(() => {
		return () => {
			dispatch(clearDeleteCourseGroupAction());
		};
	}, [dispatch]);
	if (action_success) {
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
				<div className={clsx(lg && "flex-row align-center", !lg && "flex-column")}>
					<div className="grow">
						{load ? (
							<Load />
						) : (
							<Text h3 className="text-danger">
								<center>Confirmar la eliminación</center>
							</Text>
						)}
					</div>
					<Submit
						text="Eliminar"
						icon={faTrash}
						bg_color="primary"
						text_color="white"
						center
						hidden={load}
					/>
					<Button
						text="Cancelar"
						icon={faTimes}
						bg_color="danger"
						text_color="white"
						center
						hidden={load}
						onClick={onCancel}
					/>
				</div>
			</Form>
		</div>
	);
};

export default DeleteCourseGroupForm;
