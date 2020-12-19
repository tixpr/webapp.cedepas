import React from "react";
import "./Form.scss";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const Errors = ({ msg, errors }) => {
	return (
		<div className="flex-row align-stretch justify-start">
			<span>
				<strong>{`${msg}:`}</strong>
			</span>
			<div className="flex-column align-start justify-stretch">
				{errors.map((s) => (
					<span className="el-err" key={s}>
						{s}
					</span>
				))}
			</div>
		</div>
	);
};

const ErrorMessage = ({ msg, icon = null }) => {
	return (
		<div className="flex-row align-center justify-start text-white bg-danger error-message">
			<FontAwesomeIcon
				icon={icon ? icon : faExclamationTriangle}
				size="lg"
			/>
			{typeof msg === "string" ? (
				<span>{msg}</span>
			) : (
				<p className="flex-column grow">
					<span className="msg-title">
						{msg.data.message && msg.data.message}
					</span>
					{msg.data.errors &&
						Object.keys(msg.data.errors).map((v) => (
							<Errors
								msg={v}
								key={v}
								errors={msg.data.errors[v]}
							/>
						))}
				</p>
			)}
		</div>
	);
};

const SuccessMessage = ({msg})=>{
	return (
		<div className="flex-column bg-success text-white success">
			<p>
				{msg}
			</p>
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
