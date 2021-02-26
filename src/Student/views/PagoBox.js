import React, { useState } from "react";
import clsx from "clsx";
import Button from "../../components/Button";
import { faEye, faTimes } from "@fortawesome/free-solid-svg-icons";

const PagoBox = ({ pago }) => {
	const { approved, mont, vaucher } = pago;
	const [view, setView] = useState(false);
	return (
		<div
			style={{ padding: "0px 10px" }}
			className="flex-row align-center bg-white box-shadow margin-10"
		>
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
							src={`https://api.seminarioandinosanpablo.org.pe/storage/vauchers/${vaucher}`}
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
			<div
				style={{ borderRadius: "50%" }}
				className={clsx(
					approved && "bg-primary",
					!approved && "bg-warning",
					"padding-10"
				)}
			></div>
			<h3 className="text-dark padding-10">{`Monto pagado: ${mont}`}</h3>
			<Button
				bg_color="none"
				icon={faEye}
				text="Váucher"
				not_border
				text_color="purple"
				onClick={() => setView(true)}
			/>
		</div>
	);
};
export default PagoBox;
