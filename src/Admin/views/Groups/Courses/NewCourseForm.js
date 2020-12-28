import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/Button";
//componentes
import Form, { Submit } from "../../../../components/Form";
import InputForm from "../../../../components/InputForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {useParams} from 'react-router-dom';
import {
	postCourseAction,
	loadPostCourseAction,
	clearPostCourseAction
} from "../../../redux/actions/coursesActions";
import { faCheck, faWindowClose } from "@fortawesome/free-solid-svg-icons";

const new_course_schema = yup.object().shape({
	name: yup.string().required("Requerido"),
});
const NewCourseForm = ({ onSuccess, onCancel }) => {
	const {group_id} = useParams();
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(new_course_schema),
	});
	const is_load = useSelector(
		(state) => state.admin.courses.post_course_load
	);
	const action_error = useSelector(
		(state) => state.admin.courses.post_course_errors
	);
	const action_success = useSelector(
		(state) => state.admin.courses.post_course_success
	);
	const dispatch = useDispatch();
	const submit = (d) => {
		console.info(d);
		dispatch(loadPostCourseAction());
		dispatch(postCourseAction(d,group_id));
	};
	if (action_success) {
		dispatch(clearPostCourseAction());
		onSuccess && onSuccess();
	}
	return (
		<div className="grow">
			<Form
				legend="Nuevo curso"
				fielset="bg-white"
				onSubmit={handleSubmit(submit)}
				errors={action_error}
				success={action_success}
			>
				<div className="flex-row">
					{is_load ? <p>Cargando</p> : null}
					<div className="grow">
						<InputForm
							name="name"
							upper
							inline
							hidden={is_load}
							register={register}
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

export default NewCourseForm;
