import React, { useState } from "react";
import clsx from "clsx";
import "./FileInputForm.scss";

const FileInputForm = ({
	onChange = null,
	name,
	hidden = false,
	...others
}) => {
	const [file, setFile] = useState(null);
	const on_change = (e) => {
		e.preventDefault();
		let temp = e.target.files[0];
		temp && setFile(temp);
		onChange && onChange(temp);
	};
	return (
		<label
			className={clsx(
				"flex-column justify-end file-input",
				hidden && "hidden"
			)}
			htmlFor={name}
		>
			<input
				onChange={on_change}
				hidden
				id={name}
				name={name}
				type="file"
				{...others}
			/>
			{file ? `Archivo: ${file.name}` : "Archivo: "}
		</label>
	);
};

export default FileInputForm;
