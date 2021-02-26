import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/Button";
import Load from "../../../../components/Load";
import InputForm from "../../../../components/InputForm";
import {
	loadPutStudentPagoAction,
	clearPutStudentPagoAction,
	putStudentPagoAction,
} from "../../../redux/actions/pagosActions";
//componentes
import Form, { Submit } from "../../../../components/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";

const schema = yup.object().shape({
	cost: yup.number().min(0, "El valor minimo es 0").required("Requerido"),
});
const EditStudentPagoForm = ({ onSuccess, user, onCancel }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			cost: user.cost,
		},
		mode: "onBlur",
		resolver: yupResolver(schema),
	});
	const load = useSelector((state) => state.admin.pagos.put_load);
	const action_error = useSelector((state) => state.admin.pagos.put_errors);
	const action_success = useSelector(
		(state) => state.admin.pagos.put_success
	);
	const dispatch = useDispatch();
	const submit = (d) => {
		dispatch(loadPutStudentPagoAction());
		dispatch(putStudentPagoAction(user.student_pago_id, d));
	};
	if (action_success) {
		onSuccess && onSuccess();
	}
	useEffect(() => {
		return () => {
			dispatch(clearPutStudentPagoAction());
		};
	}, [dispatch]);
	return (
		<div className="grow">
			<Form
				className="box-shadow"
				fielset="bg-white"
				onSubmit={handleSubmit(submit)}
				errors={action_error}
			>
				<div className="flex-column">
					{load ? (
						<Load />
					) : (
						<>
							<div className="flex-column">
								<InputForm
									name="cost"
									hidden={load}
									register={register}
									label="Costo"
									error={errors.cost}
								/>
								<div
									className={clsx(
										lg &&
											"flex-row align-center justify-evenly",
										!lg && "flex-column"
									)}
								>
									<Submit
										text="Editar"
										icon={faEdit}
										bg_color="primary"
										text_color="white"
										center
									/>
									<Button
										text="Cancelar"
										icon={faTimes}
										bg_color="danger"
										text_color="white"
										center
										onClick={onCancel}
									/>
								</div>
							</div>
						</>
					)}
				</div>
			</Form>
		</div>
	);
};
export default EditStudentPagoForm;
