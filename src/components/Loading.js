import React from 'react';
import './Loading.scss';

const Loading = ()=>{
	return (
		<div className="loading">
			<div className="loader">
				<div className="l-box"></div>
				<div className="l-box"></div>
				<div className="l-box"></div>
				<div className="l-box"></div>
			</div>
		</div>
	);
};

export default Loading;