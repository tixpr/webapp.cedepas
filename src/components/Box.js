import React from "react";
import "./Box.scss";

function Box({ children }) {
	return <div className="box bg0">{children}</div>;
}
export default Box;
