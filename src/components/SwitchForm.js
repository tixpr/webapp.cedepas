import React from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import "./SwitchForm.scss";

const SwitchForm = ({
	text,
	name,
	register = null,
	checked = false,
	error = null,
	hidden = false,
	onChange,
}) => {
	return (
		<div
			className={clsx(
				"flex-row justify-start switch",
				hidden && "hidden"
			)}
		>
			<input
				id={name}
				name={name}
				defaultChecked={checked}
				ref={register}
				type="checkbox"
				onChange={onChange ? onChange : null}
			/>
			<label htmlFor={name} className="flex-row text-grey-400">
				<FontAwesomeIcon className="not" icon={faCircle} />
				<FontAwesomeIcon className="yes" icon={faCheckCircle} />
				{text}
			</label>
			{error && <span className="text-danger">{error.message}</span>}
		</div>
	);
};

export default SwitchForm;
