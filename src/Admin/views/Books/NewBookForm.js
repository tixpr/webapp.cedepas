import React, { useEffect } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import Form, { Submit } from "../../../components/Form";
import InputForm from "../../../components/InputForm";
import Load from "../../../components/Load";
import { useDispatch, useSelector } from "react-redux";
import {
	postBookAction,
	loadPostBookAction,
	clearPostBookAction,
} from "../../redux/actions/libraryActions";
import Button from "../../../components/Button";
import { faTimes, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMediaQuery } from "react-responsive";

const new_book_schema = yup.object().shape({
	code: yup.string().required("Requerido"),
	author: yup.string().required("Requerido"),
	title_editor: yup.string().required("Requerido"),
});
const NewBookForm = ({ onSuccess, onCancel }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(new_book_schema),
	});
	const load = useSelector((state) => state.admin.library.post_book_load);
	const action_error = useSelector(
		(state) => state.admin.library.post_book_errors
	);
	const action_success = useSelector(
		(state) => state.admin.library.post_book_success
	);
	const dispatch = useDispatch();
	const submit = (d) => {
		dispatch(loadPostBookAction());
		dispatch(postBookAction(d));
	};
	if (action_success) {
		onSuccess && onSuccess();
	}
	useEffect(() => {
		return () => dispatch(clearPostBookAction());
	}, [dispatch]);
	return (
		<Form
			className="container-lg"
			legend="Nuevo material"
			fielset="bg-white"
			onSubmit={handleSubmit(submit)}
			errors={action_error}
		>
			{load && <Load />}
			<InputForm
				name="code"
				hidden={load}
				register={register}
				label="Código"
				error={errors.code}
			/>
			<InputForm
				name="author"
				hidden={load}
				register={register}
				label="Autor"
				error={errors.author}
			/>
			<InputForm
				name="title_editor"
				register={register}
				label="Título y Editor"
				hidden={load}
				error={errors.title_editor}
			/>
			<div
				className={clsx(
					lg && "flex-row align-center justify-evenly",
					!lg && "flex-column"
				)}
			>
				<Submit hidden={load} icon={faBookOpen} text="Crear" center />
				<Button
					hidden={load}
					icon={faTimes}
					center
					text="Cancelar"
					text_color="white"
					bg_color="danger"
					onClick={onCancel}
				/>
			</div>
		</Form>
	);
};
export default NewBookForm;
