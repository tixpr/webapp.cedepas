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
	control_grow = false,
	upper = false,
	...others
}) {
	return (
		<div
			className={clsx(
				!inline && "flex-column",
				inline && "flex-row",
				"justify-stretch input-group",
				error && "error",
				upper && "upper",
				hidden && "hidden",
				add_class
			)}
		>
			{label && (
				<label
					className={clsx(inline && "grow")}
					htmlFor={name}
				>{`${label}:`}</label>
			)}
			<div className={clsx("flex-column justify-stretch",!inline&&'grow', control_grow&&'grow')}>
				<input
					ref={register}
					id={name}
					name={name}
					type={type}
					autoComplete={autocomplete}
					{...others}
				/>
				{error && <span>{error.message}</span>}
			</div>
		</div>
	);
}
