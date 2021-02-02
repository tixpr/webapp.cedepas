import React from "react";
import "./Loading.scss";

const Loading = () => {
	return (
		<div className="grow flex-column flex-center bg-grey-900">
			<div className="grow flex-row flex-center">
				<h1 className="text-primary">
					CEDEPAS-CENTRO
				</h1>
			</div>
			<div className="loading">
				<div className="loader">
					<div className="l-box"></div>
					<div className="l-box"></div>
					<div className="l-box"></div>
					<div className="l-box"></div>
				</div>
			</div>
		</div>
	);
};

export default Loading;
