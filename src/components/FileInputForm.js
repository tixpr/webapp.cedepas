import React, { useState } from "react";
import "./FileInputForm.scss";

const FileInputForm = ({ onChange = null, name, ...others }) => {
	const [file, setFile] = useState(null);
	const on_change= (e)=>{
		e.preventDefault();
		let temp = e.target.files[0];
		temp && setFile(temp);
		onChange&&onChange(temp);
	};
	return (
		<label className={"flex-column justify-end file-input"} htmlFor={name}>
			<input onChange={on_change} hidden id={name} name={name} type="file" {...others} />
			{file?`Archivo: ${file.name}`:'Archivo: '}
		</label>
	);
};

export default FileInputForm;
