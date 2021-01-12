import React from "react";

const RadioGroupMenu = ({ children }) => {
	const submit = (e) => {
		e.preventDefault();
	};
	return <form onSubmit={submit}>{children}</form>;
};

export default RadioGroupMenu;
