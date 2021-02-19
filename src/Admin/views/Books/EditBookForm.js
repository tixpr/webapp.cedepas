import React, { useEffect } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import Form, { Submit } from "../../../components/Form";
import Load from "../../../components/Load";
import InputForm from "../../../components/InputForm";
import { useDispatch, useSelector } from "react-redux";
import {
	putBookAction,
	loadPutBookAction,
	clearPutBookAction,
} from "../../redux/actions/libraryActions";
import Button from "../../../components/Button";
import { faUserEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMediaQuery } from "react-responsive";

const new_book_schema = yup.object().shape({
	code: yup.string().required("Requerido"),
	author: yup.string().required("Requerido"),
	title_editor: yup.string().required("Requerido"),
});
const EditBookForm = ({ onSuccess, onCancel, book }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		defaultValues: {
			code: book.code,
			author: book.author,
			title_editor: book.title_editor,
		},
		resolver: yupResolver(new_book_schema),
	});
	const load = useSelector((state) => state.admin.library.put_book_load);
	const action_error = useSelector(
		(state) => state.admin.library.put_book_errors
	);
	const action_success = useSelector(
		(state) => state.admin.library.put_book_success
	);
	const dispatch = useDispatch();
	const submit = (d) => {
		dispatch(loadPutBookAction());
		dispatch(putBookAction(d, book.id));
	};
	if (action_success) {
		onSuccess && onSuccess();
	}
	useEffect(() => {
		return () => dispatch(clearPutBookAction());
	}, [dispatch]);
	return (
		<Form
			className="grow"
			legend="Editar usuario"
			fielset="bg-white box-shadow"
			onSubmit={handleSubmit(submit)}
			errors={action_error}
			success={action_success}
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
					lg && "flex-row justify-evenly",
					!lg && "flex-column"
				)}
			>
				<Submit hidden={load} icon={faUserEdit} text="Editar" center />
				<Button
					hidden={load}
					text="Cancelar"
					icon={faTimes}
					center
					text_color="white"
					bg_color="danger"
					onClick={onCancel}
				/>
			</div>
		</Form>
	);
};
export default EditBookForm;
