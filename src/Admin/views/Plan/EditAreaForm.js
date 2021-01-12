import React from "react";
import Form, { Submit } from "../../../components/Form";
import InputForm from "../../../components/InputForm";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import Load from '../../../components/Load';
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
	loadPutAreaAction,
	clearPutAreaAction,
	putAreaAction,
} from "../../redux/actions/areasActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const edit_area_schema = yup.object().shape({
	name: yup.string().required("Requerido"),
});

const EditAreaform = ({ area, onSuccess, onCancel }) => {
	const { id, name } = area;
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		defaultValues: {
			name,
		},
		resolver: yupResolver(edit_area_schema),
	});
	const is_load = useSelector((state) => state.admin.areas.put_area_load);
	const action_error = useSelector(
		(state) => state.admin.areas.put_area_errors
	);
	const action_success = useSelector(
		(state) => state.admin.areas.put_area_success
	);
	const dispatch = useDispatch();
	const submit = (d) => {
		dispatch(loadPutAreaAction());
		dispatch(putAreaAction(d, id));
	};
	if (action_success) {
		dispatch(clearPutAreaAction());
		onSuccess && onSuccess();
	}
	return (
		<Form
			fielset="bg-white"
			legend="Editar area"
			onSubmit={handleSubmit(submit)}
			errors={action_error}
			success={action_success}
		>
			{is_load ? (
				<Load />
			) : (
				<>
					<InputForm
						name="name"
						upper
						hidden={is_load}
						register={register}
						label="Nombre"
						error={errors.name}
					/>
					<div className="flex-row flex-center">
						<Submit
							hidden={is_load}
							icon={faEdit}
							text="Editar"
							center
						/>
						<Button
							hidden={is_load}
							text="Cancelar"
							icon={faTimes}
							text_color="white"
							bg_color="danger"
							onClick={onCancel}
						/>
					</div>
				</>
			)}
		</Form>
	);
};

export default EditAreaform;
