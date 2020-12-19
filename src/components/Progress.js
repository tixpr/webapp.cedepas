import React from "react";
import './Progress.scss';

const Progress = ({ progress }) => {
	return (
		<div className="progress flex-column nwrap grow align-stretch justify-stretch bg-white">
			<span className="flex-row align-center justify-center">
				{(progress===100)?`Procesando...`:`Enviado (${progress}%)`}
			</span>
			<div className="flex-column justify-start percent-content">
				<div className="percent bg-success" style={{ width: `${progress}%` }}></div>
			</div>
		</div>
	);
};

export default Progress;
