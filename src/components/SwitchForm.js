import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import './SwitchForm.scss';

const SwitchForm = ({
	text,
	name,
	checked=false,
	onChange
})=>{
	return (
		<div className="flex-row justify-start switch">
			<input id={name} name={name} defaultChecked={checked}  type="checkbox" onChange={(onChange)?onChange:null}/>
			<label htmlFor={name} className="flex-row text-grey-400">
				<FontAwesomeIcon className="not" icon={faCircle} />
				<FontAwesomeIcon className="yes" icon={faCheckCircle} />
				{text}
			</label>
		</div>
	);
};

export default SwitchForm;