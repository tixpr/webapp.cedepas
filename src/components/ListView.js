import React from "react";
import "./ListView.scss";

const ListView = ({ direction='column', children }) => {
	return (
		<div className={`flex-${direction} justify-start list-view`}>
			{children}
		</div>
	);
};

export default ListView;
