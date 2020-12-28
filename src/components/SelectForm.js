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
	<div className="flex-column">
		<select name={name} ref={ref}>
			<option>{label}</option>
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
