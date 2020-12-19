import React from "react";
import { useHistory } from "react-router-dom";

const NotView = () => {
	const h = useHistory();
	const goBack = () => {
		h.goBack();
	};
	return (
		<div>
			<h1>Ruta no encontrada</h1>
			<button onClick={goBack}>Atras</button>
		</div>
	);
};
export default NotView;
