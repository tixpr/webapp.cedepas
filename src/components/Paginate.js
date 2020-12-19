import React from "react";
import Button from "./Button";

const Paginate = ({ links=[], onClick }) => {
	return (
		<div className="flex-row wrap align-center justify-center">
			{links.map((l,i) => (
				<Button
					key={`${l.label}-${i}`}
					disabled={l.url === null || l.label === "..."}
					primary={l.active}
					not_border
					bg_color='not'
					text={l.label}
					onClick={
						l.url !== null && l.label !== "..."
							? () => {
									onClick(l.url);
							  }
							: null
					}
				/>
			))}
		</div>
	);
};

export default Paginate;
