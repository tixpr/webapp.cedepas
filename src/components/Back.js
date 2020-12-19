import React from "react";
import Button from "./Button";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const Back = ({ onClick, ...others }) => {
	const h = useHistory();
	return (
		<Button
			text_color="warning"
			not_border
			bg_color
			text="Volver"
			icon={faChevronLeft}
			{...others}
			onClick={(e) => {
				e.preventDefault();
				onClick && onClick();
				h.goBack();
			}}
		/>
	);
};

export default Back;
