import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/Button";
//new period actions
import {
	loadPutCourseAction,
	clearPutCourseAction,
	putCourseAction,
} from "../../../redux/actions/coursesActions";
//componentes
import Form, { Submit } from "../../../../components/Form";
import InputForm from "../../../../components/InputForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { faCheck, faWindowClose } from "@fortawesome/free-solid-svg-icons";

const edit_group_schema = yup.object().shape({
	name: yup.string().required("Requerido"),
});
const EditCourseForm = ({ onSuccess, course, onCancel }) => {
	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			name: course.name,
		},
		mode: "onBlur",
		resolver: yupResolver(edit_group_schema),
	});
	const is_load = useSelector((state) => state.admin.courses.put_course_load);
	const action_error = useSelector(
		(state) => state.admin.courses.put_course_errors
	);
	const action_success = useSelector(
		(state) => state.admin.courses.put_course_success
	);
	const dispatch = useDispatch();
	const submit = (d) => {
		console.info(d);
		dispatch(loadPutCourseAction());
		dispatch(putCourseAction(d, course.id));
	};
	if (action_success) {
		dispatch(clearPutCourseAction());
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
						{is_load ? <p>Cargando</p> : null}
						<InputForm
							name="name"
							upper
							hidden={is_load}
							register={register}
							inline
							error={errors.name}
						/>
					</div>
					<Submit
						icon={faCheck}
						bg_color="primary"
						text_color="white"
						center
					/>
					<Button
						icon={faWindowClose}
						bg_color="danger"
						text_color="white"
						onClick={onCancel}
					/>
				</div>
			</Form>
		</div>
	);
};
export default EditCourseForm;
