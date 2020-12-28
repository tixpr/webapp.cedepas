import React from "react";
import Button from "./Button";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const Back = ({ onClick, text_color=null, ...others }) => {
	const h = useHistory();
	return (
		<Button
			text_color={text_color||"warning"}
			not_border
			bg_color
			icon_size='2x'
			icon={faAngleDoubleLeft}
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
