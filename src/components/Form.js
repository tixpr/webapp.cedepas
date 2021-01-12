import React from "react";
import "./Form.scss";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";

const SuccessMessage = ({ msg }) => {
	return (
		<div className="flex-column bg-success text-white success">
			<p>{msg}</p>
		</div>
	);
};

export const Submit = ({ text = null, icon = null, ...others }) => (
	<Button text={text} icon={icon} type="submit" primary={text} {...others} />
);

const Form = ({
	onSubmit = null,
	legend = null,
	className = null,
	errors = null,
	success = null,
	children = null,
	fielset = null,
}) => {
	const err = errors ? <ErrorMessage msg={errors} /> : null;
	const mg = success ? <SuccessMessage msg={success} /> : null;
	return (
		<form
			className={legend ? className : `${className} ${fielset}`}
			onSubmit={onSubmit}
		>
			{legend ? (
				<fieldset className={`flex-column ${fielset}`}>
					<legend>{legend}</legend>
					{err}
					{mg}
					{children}
				</fieldset>
			) : (
				<>
					{err}
					{mg}
					{children}
				</>
			)}
		</form>
	);
};

export default Form;
