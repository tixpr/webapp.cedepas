import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import "./RadioForm.scss";

const RadioForm = ({ text, name, value, onChange, checked=false}) => {
	const change = (e) => {
		e.preventDefault();
		onChange && onChange(value);
	};
	return (
		<div className="flex-row align-center jusitfy-start radio-form">
			<input
				id={value}
				type="radio"
				name={name}
				defaultChecked={checked}
				value={value}
				onChange={change}
			/>
			<label htmlFor={value} className="flex-row text-grey-400">
				<FontAwesomeIcon className="not" icon={faCircle} />
				<FontAwesomeIcon className="yes" icon={faCheckCircle} />
				{text}
			</label>
		</div>
	);
};

export default RadioForm;
