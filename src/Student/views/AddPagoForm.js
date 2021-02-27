import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Form, { Submit } from "../../components/Form";
import FileInputForm from "../../components/FileInputForm";
import Progress from "../../components/Progress";
import {
	loadPostPagoFileAction,
	clearPostPagoFileAction,
	postPagoFileAction,
	loadPostPagoAction,
	clearPostPagoAction,
	postPagoAction,
} from "../redux/actions/pagosActions";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../components/ErrorMessage";
import { useParams } from "react-router-dom";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import InputForm from "../../components/InputForm";
import Load from "../../components/Load";
import Button from "../../components/Button";

const schema = yup.object().shape({
	mont: yup.number().min(1, "Valor no permitido").required("Requerido"),
	vaucher: yup.string().required("Requerido"),
});

const AddPagoForm = ({ onSucess, onCancel }) => {
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(schema),
	});
	const { course_group_id } = useParams();
	const [progress, setProgress] = useState(0);
	const [vaucher, setVaucher] = useState(null);
	const dispatch = useDispatch();
	const up_errors = useSelector((state) => state.student.pagos.upload_errors);
	const filename = useSelector((state) => state.student.pagos.filename);
	const up_success = useSelector(
		(state) => state.student.pagos.upload_success
	);
	const load = useSelector((state) => state.student.pagos.post_load);
	const action_errors = useSelector(
		(state) => state.student.pagos.post_errors
	);
	const action_success = useSelector(
		(state) => state.student.pagos.post_success
	);
	const progressFunc = (p) => {
		setProgress(p);
	};
	const submit = (d) => {
		dispatch(loadPostPagoAction());
		dispatch(postPagoAction(course_group_id, d));
	};
	const selectFile = (f) => {
		setVaucher(f);
		setProgress(0);
	};
	useEffect(() => {
		if (vaucher) {
			dispatch(loadPostPagoFileAction());
			dispatch(
				postPagoFileAction(course_group_id, vaucher, progressFunc)
			);
		}
	}, [dispatch, vaucher, course_group_id]);
	useEffect(() => {
		return () => {
			dispatch(clearPostPagoFileAction());
			dispatch(clearPostPagoAction());
		};
	}, [dispatch]);
	if (action_success) {
		onSucess && onSucess();
	}
	return (
		<Form
			className="bg-white container-lg box-shadow"
			onSubmit={handleSubmit(submit)}
			errors={action_errors}
		>
			<div className="flex-column">
				{load && <Load />}
				{up_errors && !load && <ErrorMessage msg={up_errors} />}
				<FileInputForm
					accept="image/*"
					name="vaucher_file"
					hidden={load}
					onChange={selectFile}
				/>
				{<Progress progress={progress} hidden={load} />}
				<InputForm
					name="vaucher"
					type="hidden"
					defaultValue={filename}
					hidden={load}
					error={errors.vaucher}
					register={register}
				/>
				<InputForm
					label="Monto"
					name="mont"
					hidden={load}
					error={errors.mont}
					register={register}
				/>
				<div className="flex-row flex-center">
					<Submit
						disabled={!up_success}
						hidden={load}
						text="Aceptar"
						icon={faCheck}
					/>
					<Button
						hidden={load}
						text="Cancelar"
						icon={faTimes}
						bg_color="danger"
						text_color="white"
						onClick={onCancel}
					/>
				</div>
			</div>
		</Form>
	);
};

export default AddPagoForm;
