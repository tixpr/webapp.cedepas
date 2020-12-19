import React from "react";
import "bootstrap-4-grid";

const GroupBox = ({ name, id, sub_groups, view_courses }) => {
	return (
		<div className="row groupbox">
			<div className="col">
				<p>{name}</p>
				<p>{id}</p>
				<p>{sub_groups}</p>
				<p>{view_courses}</p>
			</div>
		</div>
	);
};

export default GroupBox;
