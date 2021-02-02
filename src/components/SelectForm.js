import clsx from "clsx";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import "./SelectForm.scss";

/*
const SelectForm = ({ name, label, options, ref }) => {
	return (
		<>
			<select name={name} id={name} ref={ref}>
				<option>{label}</option>
				{options.map(op=><option key={`${name}-${op.id}`} value={op.id}>{op.name}</option>)}
			</select>
		</>
	);
};
*/
const SelectForm = React.forwardRef(
	({ label, name, options, error, hidden = false }, ref) => (
		<div
			className={clsx(
				"grow flex-column select-container",
				hidden && "hidden"
			)}
		>
			{label && <label htmlFor={name}>{`${label}:`}</label>}
			<div className="flex-column">
				<FontAwesomeIcon
					icon={faAngleDoubleDown}
					className="icon-select"
					size="lg"
				/>
				<select name={name} ref={ref}>
					{options.map((op) => (
						<option key={`option-${name}-${op.id}`} value={op.id}>
							{op.name}
						</option>
					))}
				</select>
			</div>
			{error && <span className="text-danger">{error.message}</span>}
		</div>
	)
);

export default SelectForm;
