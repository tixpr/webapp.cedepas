import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import FileInputForm from "../../../../components/FileInputForm";
import Progress from "../../../../components/Progress";
import Button from "../../../../components/Button";
import Form, { Submit } from "../../../../components/Form";
import {
	postImportCoursesAction,
	clearImportCoursesAction,
} from "../../../redux/actions/coursesActions";
import { useForm } from "react-hook-form";

const ImportCourses = ({ onSuccess, onCancel }) => {
	const { handleSubmit } = useForm();
	const dispatch = useDispatch();
	const action_error = useSelector(
		(state) => state.admin.users.import_users_error
	);
	const action_success = useSelector(
		(state) => state.admin.users.imports_users_success
	);
	const [file, setFile] = useState(null);
	const [err, setErr] = useState(null);
	const [upload, setUpload] = useState(false);
	const [pg, setPg] = useState(0);
	const progress = (p) => {
		setPg(p);
	};
	const submit = () => {
		if (!file) {
			setErr("Archivo no seleccionado");
			return;
		}
		setErr(null);
		setPg(0);
		setUpload(true);
		dispatch(postImportCoursesAction(file, progress));
	};
	const selectFile = (f) => {
		setFile(f);
	};
	if (action_error) {
		setUpload(false);
	}
	if (action_success) {
		dispatch(clearImportCoursesAction());
		onSuccess && onSuccess();
	}
	return (
		<Form
			legend="Inportar cursos"
			fielset="bg-white"
			onSubmit={handleSubmit(submit)}
			errors={err || action_error}
			success={action_success}
		>
			<FileInputForm
				accept=".xls,.xlsx,.cvs"
				name="users_import"
				onChange={selectFile}
			/>
			<div className="flex-row">
				<Submit center icon={faFileUpload} text="Importar" />
				<Button
					text="Cancelar"
					text_color="white"
					bg_color="danger"
					onClick={onCancel}
				/>
			</div>
			{upload ? <Progress progress={pg} /> : null}
		</Form>
	);
};
export default ImportCourses;
