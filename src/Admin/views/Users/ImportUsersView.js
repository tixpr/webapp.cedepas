import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { postImportUsersAction } from "../../redux/actions/importUsersActions";
import { useDispatch } from "react-redux";
import Form, { Submit } from "../../../components/Form";
import FileInput from "../../../components/FileInput";
import Back from "../../../components/Back";
import Progress from "../../../components/Progress";
import {useSelector} from 'react-redux';
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";

const ImportUsersView = () => {
	const { handleSubmit } = useForm();
	const dispatch = useDispatch();
	const action_error = useSelector(state=>state.admin.import.action_error);
	const action_success = useSelector(state=>state.admin.import.action_success);
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
			setTimeout(() => {
				setErr(null);
			}, 3000);
			return;
		}
		setPg(0);
		setUpload(true);
		dispatch(postImportUsersAction(file, progress));
	};
	const selectFile = (f) => {
		setFile(f);
	};
	if(action_success||action_error){
		setUpload(false);
	}
	return (
		<div className="container-lg">
			<Back />
			<Form
				legend="Inportar Usuarios"
				fielset="bg-white"
				onSubmit={handleSubmit(submit)}
				errors={err||action_error}
				success={action_success}
			>
				<FileInput
					accept=".xls,.xlsx,.cvs"
					name="users_import"
					onChange={selectFile}
				/>
				<Submit center icon={faFileUpload} text="Importar" />
				{upload ? <Progress progress={pg} /> : null}
			</Form>
		</div>
	);
};

export default ImportUsersView;
