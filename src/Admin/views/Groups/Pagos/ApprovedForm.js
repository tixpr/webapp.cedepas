import React, { useEffect } from "react";
import Form, { Submit } from "../../../../components/Form";
import Load from "../../../../components/Load";
import Button from "../../../../components/Button";
import { useForm } from "react-hook-form";
import {
	faCheckDouble,
	faExclamationTriangle,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import {
	loadPutPagoAction,
	clearPutPagoAction,
	putPagoAction,
} from '../../../redux/actions/pagosActions';

const ApprovedForm = ({ pago, onSuccess, onCancel }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { handleSubmit } = useForm({});
	const load = useSelector((state) => state.admin.pagos.put_pago_load);
	const action_error = useSelector(
		(state) => state.admin.pagos.put_pago_errors
	);
	const action_success = useSelector(
		(state) => state.admin.pagos.put_pago_success
	);
	const dispatch = useDispatch();
	const submit = () => {
		dispatch(loadPutPagoAction());
		dispatch(putPagoAction(pago.id));
	};
	if (action_success) {
		onSuccess && onSuccess();
	}
	useEffect(() => {
		return () => {
			dispatch(clearPutPagoAction());
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
						<div
							className={clsx(
								lg && "flex-row align-center",
								!lg && "flex-column"
							)}
						>
							<Submit
								add_class="grow"
								text={
									pago.approved
										? "Click para desaprobar pago"
										: "Click para aprobar pago"
								}
								icon={
									pago.approved
										? faExclamationTriangle
										: faCheckDouble
								}
								bg_color={pago.approved ? "warning" : "primary"}
								text_color="white"
								center
							/>
							<Button
								add_class="grow"
								text="Cancelar"
								icon={faTimes}
								bg_color="danger"
								text_color="white"
								center
								onClick={onCancel}
							/>
						</div>
					)}
				</div>
			</Form>
		</div>
	);
};
export default ApprovedForm;
