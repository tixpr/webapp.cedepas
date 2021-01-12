import React from "react";
import clsx from "clsx";
import "./InputForm.scss";

export default function InputForm({
	add_class = "",
	name = Math.random(),
	label = null,
	autocomplete = "off",
	type = "text",
	register = null,
	hidden = false,
	error = null,
	inline = false,
	upper = false,
	...others
}) {
	return (
		<div
			className={clsx(
				"flex-column",
				"justify-stretch input-group",
				error && "error",
				upper && "upper",
				hidden && "hidden",
				add_class
			)}
		>
			{label && <label htmlFor={name}>{`${label}:`}</label>}
			<input
				className="grow"
				ref={register}
				id={name}
				name={name}
				type={type}
				autoComplete={autocomplete}
				{...others}
			/>
			{error && <span>{error.message}</span>}
		</div>
	);
}
