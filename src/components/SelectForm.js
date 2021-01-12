import React from "react";

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
const SelectForm = React.forwardRef(({ label, name, options, error }, ref) => (
	<div className="grow margin-10 flex-column">
		{label && <label htmlFor={name}>{`${label}:`}</label>}
		<select name={name} ref={ref}>
			{options.map((op) => (
				<option key={`${name}-${op.id}`} value={op.id}>
					{op.name}
				</option>
			))}
		</select>
		{error && <span className="text-danger">{error.message}</span>}
	</div>
));

export default SelectForm;
