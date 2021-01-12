import React from "react";
import {
	clearPostAreaAction,
	postAreaAction,
	loadPostAreaAction,
} from "../../redux/actions/areasActions";
import Form, { Submit } from "../../../components/Form";
import InputForm from "../../../components/InputForm";
import Button from "../../../components/Button";
import Load from '../../../components/Load';
import { useDispatch, useSelector } from "react-redux";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const add_area_schema = yup.object().shape({
	name: yup.string().required("Requerido"),
});

const AddAreaForm = ({ onSuccess, onCancel }) => {
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(add_area_schema),
	});
	const dispatch = useDispatch();
	const action_success = useSelector(
		(state) => state.admin.areas.post_area_success
	);
	const is_load = useSelector((state) => state.admin.areas.post_area_load);
	const action_errors = useSelector(
		(state) => state.admin.areas.post_area_errors
	);
	const submit = (d) => {
		dispatch(loadPostAreaAction());
		dispatch(postAreaAction(d));
	};
	if (action_success) {
		dispatch(clearPostAreaAction());
		onSuccess && onSuccess();
	}
	return (
		<Form
			onSubmit={handleSubmit(submit)}
			legend="Agregar area"
			fielset="bg-white"
			errors={action_errors}
		>
			{is_load ? (
				<Load />
			) : (
				<>
					<InputForm
						register={register}
						label="Nombre del area"
						name="name"
						upper
						error={errors.name}
					/>
					<div className="flex-row flex-center">
						<Submit text="Aceptar" icon={faSave} />
						<Button
							text="Cancelar"
							bg_color="danger"
							text_color="white"
							icon={faTimes}
							onClick={onCancel}
						/>
					</div>
				</>
			)}
		</Form>
	);
};

export default AddAreaForm;
