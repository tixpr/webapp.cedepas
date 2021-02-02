import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Form, { Submit } from "../../components/Form";
import Button from "../../components/Button";
import SwitchForm from "../../components/SwitchForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Load from "../../components/Load";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
	loadPutUserPresenceAction,
	resetPutUserPresenceAction,
	putUserPresenceAction,
} from "../redux/actions/courseActions";

const edit_presence_schema = yup.object().shape({
	presence: yup.boolean().required("Requerido"),
});

const EditPresenceForm = ({
	presence,
	presence_id,
	user_id,
	onCancel,
	onSuccess,
}) => {
	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			presence: presence,
		},
		mode: "onBlur",
		resolver: yupResolver(edit_presence_schema),
	});
	const dispatch = useDispatch();
	const load = useSelector(
		(state) => state.teacher.course.put_user_presence_load
	);
	const action_errors = useSelector(
		(state) => state.teacher.course.put_user_presence_errors
	);
	const success = useSelector(
		(state) => state.teacher.course.put_user_presence_success
	);
	const submit = (d) => {
		dispatch(loadPutUserPresenceAction());
		dispatch(putUserPresenceAction(user_id, presence_id, d));
		console.info("edit note submit", d);
	};
	useEffect(() => {
		return () => dispatch(resetPutUserPresenceAction());
	}, [dispatch]);
	if (success) {
		onSuccess && onSuccess();
	}
	return (
		<div className="container-absolute flex-row flex-center">
			<div className="flex-row flex-center bg-white padding-10">
				<Form
					fielset="bg-white padding-10 margin-10"
					legend="Editar Asistencia"
					onSubmit={handleSubmit(submit)}
					errors={action_errors}
				>
					<div className="flex-column">
						{load && <Load />}
						<SwitchForm
							text="Presente"
							name="presence"
							hidden={load}
							error={errors.presence}
							register={register}
						/>
						<div className="flex-row flex-center">
							<Submit hidden={load} text="Editar" icon={faEdit} />
							<Button
								text="Cancelar"
								hidden={load}
								icon={faTimes}
								bg_color="danger"
								text_color="white"
								onClick={onCancel}
							/>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default EditPresenceForm;
