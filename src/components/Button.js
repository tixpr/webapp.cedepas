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
	bg_color = null,
	...others
}) => {
	return (
		<button
			className={clsx(
				"flex-row align-end btn",
				icon && !text && "justify-center icon",
				text && !center && "justify-start",
				center && "justify-center",
				primary && "text-white bg-primary not-border",
				!primary && !bg_color && "bg-white",
				bg_color && `bg-${bg_color} not-border`,
				not_border && "not-border",
				disabled && "disabled",
				text_color && `text-${text_color}`,
				!text_color && !primary && "text-primary"
			)}
			{...others}
		>
			{icon ? <FontAwesomeIcon icon={icon} size="lg" /> : null}
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
