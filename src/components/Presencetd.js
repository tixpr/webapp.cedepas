import React from "react";
import clsx from "clsx";

const Presencetd = ({ presence }) => {
	return (
		<td
			className={clsx(
				presence && "text-primary",
				!presence && "text-danger"
			)}
		>
			{presence ? "A" : "F"}
		</td>
	);
};

export default Presencetd;
