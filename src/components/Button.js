import React from "react";
import "./Button.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

const Button = ({
	icon = null,
	text = null,
	primary = false,
	not_border = false,
	center = false,
	disabled = false,
	text_color = null,
	hidden = false,
	bg_color = null,
	icon_size = null,
	add_class = null,
	...others
}) => {
	return (
		<button
			className={clsx(
				"flex-row align-center btn",
				icon && !text && "justify-center icon",
				text && !center && "justify-start",
				center && "justify-center",
				primary && "text-white bg-primary not-border",
				!primary && !bg_color && "bg-white",
				bg_color && `bg-${bg_color} not-border`,
				not_border && "not-border",
				disabled && "disabled",
				text_color && `text-${text_color}`,
				!text_color && !primary && "text-primary",
				hidden && "hidden",
				add_class
			)}
			{...others}
		>
			{icon ? (
				<FontAwesomeIcon icon={icon} size={icon_size || "lg"} />
			) : null}
			{text ? (
				<span
					className={clsx(
						"flex-row align-start justify-start",
						!center && "grow"
					)}
					dangerouslySetInnerHTML={{ __html: text }}
				></span>
			) : null}
		</button>
	);
};

export default Button;
