import React from "react";
import clsx from "clsx";
import "./Input.scss";

export default function Input({
	name = Math.random(),
	label = null,
	type = "text",
	register = null,
	error = null,
	inline = false,
	upper=false,
	...others
}) {
	return (
		<div
			className={clsx(
				!inline && "flex-column",
				inline && "flex-row-reverse",
				"justify-stretch input-group",
				error && "error",
				upper&&'upper'
			)}
		>
			{label&&<label htmlFor={name}>{`${label}:`}</label>}
			<input
				ref={register}
				id={name}
				name={name}
				type={type}
				{...others}
			/>
			{error && <span>{error.message}</span>}
		</div>
	);
}
