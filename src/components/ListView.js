import React from "react";
import "./ListView.scss";

const ListView = ({ children }) => {
	return (
		<div className="flex-column align-stretch justify-start list-view">
			{children}
		</div>
	);
};

export default ListView;
