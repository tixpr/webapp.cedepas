import React, { useEffect } from "react";
import {
	clearPostAreaAction,
	postAreaAction,
	loadPostAreaAction,
} from "../../redux/actions/areasActions";
import Form, { Submit } from "../../../components/Form";
import InputForm from "../../../components/InputForm";
import Button from "../../../components/Button";
import Load from "../../../components/Load";
import { useDispatch, useSelector } from "react-redux";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";

const add_area_schema = yup.object().shape({
	name: yup.string().required("Requerido"),
});

const AddAreaForm = ({ onSuccess, onCancel }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(add_area_schema),
	});
	const dispatch = useDispatch();
	const action_success = useSelector(
		(state) => state.admin.areas.post_area_success
	);
	const load = useSelector((state) => state.admin.areas.post_area_load);
	const action_errors = useSelector(
		(state) => state.admin.areas.post_area_errors
	);
	const submit = (d) => {
		dispatch(loadPostAreaAction());
		dispatch(postAreaAction(d));
	};
	if (action_success) {
		onSuccess && onSuccess();
	}
	useEffect(() => {
		return () => dispatch(clearPostAreaAction());
	}, [dispatch]);
	return (
		<Form
			onSubmit={handleSubmit(submit)}
			legend="Agregar area"
			fielset="bg-white box-shadow"
			errors={action_errors}
		>
			{load && <Load />}
			<InputForm
				register={register}
				label="Nombre del area"
				name="name"
				upper
				hidden={load}
				error={errors.name}
			/>
			<div
				className={clsx(
					lg && "flex-row flex-center",
					!lg && "flex-column"
				)}
			>
				<Submit hidden={load} text="Aceptar" center icon={faSave} />
				<Button
					text="Cancelar"
					bg_color="danger"
					text_color="white"
					hidden={load}
					icon={faTimes}
					center
					onClick={onCancel}
				/>
			</div>
		</Form>
	);
};

export default AddAreaForm;
