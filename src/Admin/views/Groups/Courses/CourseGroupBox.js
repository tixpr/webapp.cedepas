import React, { useState } from "react";
import DeleteCourseGroupForm from "./DeleteCourseGroupForm";
import EditCourseGroupForm from "./EditCourseGroupForm";
import Button from "../../../../components/Button";
import ButtonLink from "../../../../components/ButtonLink";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";

const CourseGroupBox = ({ course, url, ...others }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { id, name } = course;
	const [trash, setTrash] = useState(false);
	const [edit, setEdit] = useState(false);
	if (trash) {
		return (
			<DeleteCourseGroupForm
				course={course}
				onSuccess={() => setTrash(false)}
				onCancel={() => setTrash(false)}
			/>
		);
	}
	if (edit) {
		return (
			<EditCourseGroupForm
				course={course}
				onSuccess={() => setEdit(false)}
				onCancel={() => setEdit(false)}
			/>
		);
	}
	return (
		<div
			className={clsx(
				lg && "flex-row align-center wrap justify-start",
				!lg && "flex-column-reverse",
				"bg-white box-shadow bd-grey-400"
			)}
			{...others}
		>
			<ButtonLink
				className={clsx(lg && "grow", "")}
				not_border
				text={name}
				to={`${url}/${id}`}
			/>
			<div
				className={clsx(
					"flex-row",
					lg && "justify-center",
					!lg && "grow justify-end"
				)}
			>
				<Button
					icon={faEdit}
					not_border
					icon_size="1x"
					title="Editar courseo"
					center
					onClick={() => setEdit(true)}
				/>
				<Button
					icon={faTrash}
					not_border
					icon_size="1x"
					text_color="danger"
					title="Eliminar courseo"
					onClick={() => setTrash(true)}
					center
				/>
			</div>
		</div>
	);
};

export default CourseGroupBox;
