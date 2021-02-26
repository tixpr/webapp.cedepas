import React from "react";
import clsx from "clsx";
import "./Progress.scss";

const Progress = ({ progress, hidden }) => {
	return (
		<div
			className={clsx(
				"progress flex-column nowrap grow justify-stretch bg-grey-300",
				hidden && "hidden"
			)}
		>
			<div className="grow flex-row justify-start">
				<div
					className="bg-success"
					style={{ width: `${progress}%` }}
				></div>
			</div>
			<div className="p-text flex-row flex-center">
				<span>{`${progress}%`}</span>
			</div>
		</div>
	);
};

export default Progress;
