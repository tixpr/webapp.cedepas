import React from 'react';
import { useHistory} from 'react-router-dom';

export default function VNotAllowed (){
	const h = useHistory();
	const goBack = ()=>{
		h.goBack()
	};
	return (
		<div>
			<h1>
				Ruta no encontrada
			</h1>
			<button onClick={goBack}>
				Atras
			</button>
		</div>
	);
};