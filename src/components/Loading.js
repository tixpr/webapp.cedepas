import React from "react";
import "./Loading.scss";
import logo_load from '../images/logo_load_2.jpg';

const Loading = () => {
	return (
		<div className="grow flex-column flex-center bg-grey-900">
			<div className="grow flex-row flex-center">
				<h1 className="text-danger">
					CEDEPAS-CENTRO
				</h1>
			</div>
			<div className="loading">
				<div className="logo-load">
					<img src={logo_load} alt=""/>
				</div>
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
