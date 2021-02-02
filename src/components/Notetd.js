import React from "react";
import clsx from "clsx";

const Notetd = ({ note }) => {
	return (
		<td
			className={clsx(
				note > 13 && "text-primary",
				note < 14 && "text-danger"
			)}
		>
			{note.toString()}
		</td>
	);
};

export default Notetd;
