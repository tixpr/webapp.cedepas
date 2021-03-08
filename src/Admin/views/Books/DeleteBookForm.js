import React, { useEffect } from "react";
import clsx from "clsx";
import {
	deleteBookAction,
	loadDeleteBookAction,
	clearDeleteBookAction,
} from "../../redux/actions/libraryActions";
import { useForm } from "react-hook-form";
import Form, { Submit } from "../../../components/Form";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import Load from "../../../components/Load";
import { useSelector, useDispatch } from "react-redux";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

const DeleteBookForm = ({ onCancel, onSuccess, book_id }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { handleSubmit } = useForm();
	const load = useSelector((state) => state.admin.library.delete_book_load);
	const action_error = useSelector(
		(state) => state.admin.library.delete_book_errors
	);
	const action_success = useSelector(
		(state) => state.admin.library.delete_book_success
	);
	const dispatch = useDispatch();
	const submit = () => {
		dispatch(loadDeleteBookAction());
		dispatch(deleteBookAction(book_id));
	};
	if (action_success) {
		onSuccess && onSuccess();
	}
	useEffect(() => {
		return () => dispatch(clearDeleteBookAction());
	}, [dispatch]);
	return (
		<Form
			className="grow"
			onSubmit={handleSubmit(submit)}
			fielset="bg-white box-shadow"
			errors={action_error}
		>
			{load && <Load />}
			<div
				className={clsx(
					lg && "flex-row align-center",
					!lg && "flex-column"
				)}
			>
				<Text h3 className={clsx("grow text-danger", load && "hidden")}>
					<center>Confirme la eliminación del material</center>
				</Text>
				<Submit
					center
					text="Eliminar"
					icon={faTrash}
					bg_color="danger"
					hidden={load}
				/>
				<Button
					text="Cancelar"
					hidden={load}
					center
					icon={faTimes}
					text_color="white"
					bg_color="primary"
					onClick={onCancel}
				/>
			</div>
		</Form>
	);
};

export default DeleteBookForm;
