import React, { useState } from "react";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import {
	faCheckDouble,
	faExclamationTriangle,
	faEye,
	faTimes,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/Button";
import Text from "../../../../components/Text";
import ApprovedForm from "./ApprovedForm";
import DeletePagoForm from "./DeletePagoForm";

const MyBox = ({ pago }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const [validation, setValidation] = useState(false);
	const [trash, setTrash] = useState(false);
	const [view, setView] = useState(false);
	if (validation) {
		return (
			<ApprovedForm
				pago={pago}
				onCancel={() => setValidation(false)}
				onSuccess={() => setValidation(false)}
			/>
		);
	}
	if (trash) {
		return (
			<DeletePagoForm
				pago_id={pago.id}
				onCancel={() => setTrash(false)}
				onSuccess={() => setTrash(false)}
			/>
		);
	}
	return (
		<div className="flex-row bd-grey-500 margin-10">
			{view && (
				<div
					className="container-absolute flex-row flex-center"
					onClick={() => setView(false)}
				>
					<div
						style={{ position: "relative" }}
						className="padding-10"
					>
						<img
							style={{ width: "100%", maxWidth: "600px" }}
							src={`http://localhost:8000/storage/vauchers/${pago.vaucher}`}
							alt="vaucher del pago"
						/>
						<Button
							style={{
								position: "absolute",
								top: "0",
								right: "0",
							}}
							icon={faTimes}
							text_color="white"
							bg_color="dark"
							onClick={() => setView(false)}
						/>
					</div>
				</div>
			)}
			<div className="flex-row align-center">
				<div
					className={clsx(
						"padding-10 margin-10",
						pago.approved && "bg-primary",
						!pago.approved && "bg-warning"
					)}
					style={{ borderRadius: "50%" }}
				/>
				<Text h4 className="text-grey-600">
					{`Monto: ${pago.mont}`}
				</Text>
				<Button
					text="Váucher"
					icon={faEye}
					text_color="purple"
					bg_color="none"
					onClick={() => setView(true)}
				/>
			</div>
			<div className="grow flex-row justify-end">
				<Button
					icon={pago.approved ? faExclamationTriangle : faCheckDouble}
					text_color={pago.approved ? "warning" : "primary"}
					bg_color="none"
					title={pago.approved ? "Desaprobar pago" : "Aprobar pago"}
					onClick={() => setValidation(true)}
				/>
				{lg && <div className="padding-10" />}
				<Button
					icon={faTrash}
					text_color="danger"
					bg_color="none"
					onClick={() => setTrash(true)}
				/>
			</div>
		</div>
	);
};

export default MyBox;
