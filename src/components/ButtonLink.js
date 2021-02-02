import React from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./Button.scss";

const ButtonLink = ({
	icon = null,
	icon_size = null,
	text = null,
	primary = false,
	not_border = false,
	center = false,
	hidden = false,
	disabled = false,
	text_color = null,
	bg_color = null,
	className = null,
	...others
}) => {
	return (
		<Link
			className={clsx(
				"flex-row align-end btn",
				icon && !text && "justify-center icon",
				text && !center && "justify-start",
				center && "justify-center",
				primary && "text-white bg-primary",
				!primary && !bg_color && "bg-white",
				bg_color && `bg-${bg_color} not-border`,
				not_border && "not-border",
				disabled && "disabled",
				text_color && `text-${text_color}`,
				!text_color && !primary && "text-primary",
				hidden && "hidden",
				className && ` ${className}`
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
		</Link>
	);
};

export default ButtonLink;
