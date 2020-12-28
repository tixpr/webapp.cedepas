import React from "react";
import clsx from "clsx";
import "./InputForm.scss";

export default function InputForm({
	name = Math.random(),
	label = null,
	autocomplete='off',
	type = "text",
	register = null,
	hidden=false,
	error = null,
	inline = false,
	upper=false,
	...others
}) {
	return (
		<div
			className={clsx(
				!inline && "flex-column",
				inline && "flex-row",
				"justify-stretch input-group",
				error && "error",
				upper&&'upper',
				hidden&&'hidden'
			)}
		>
			{label&&<label htmlFor={name}>{`${label}:`}</label>}
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
