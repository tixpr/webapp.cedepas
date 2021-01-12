import React,{useState} from 'react';
import DeleteCourseGroupForm from './DeleteCourseGroupForm';
import EditCourseGroupForm from './EditCourseGroupForm';
import Button from '../../../../components/Button';
import ButtonLink from '../../../../components/ButtonLink';
import {
	faEdit,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";

const CourseGroupBox = ({ course, url, ...others }) => {
	const { id, name } = course;
	const [mode, setMode] = useState("default");
	switch (mode) {
		case "delete":
			return (
				<DeleteCourseGroupForm
					course={course}
					onSuccess={() => setMode("default")}
					onCancel={() => setMode("default")}
				/>
			);
		case "edit":
			return (
				<EditCourseGroupForm
					course={course}
					onSuccess={() => setMode("default")}
					onCancel={() => setMode("default")}
				/>
			);
		case "default":
		default:
			return (
				<div
					className="flex-row align-center wrap justify-start bg-white bd-grey-400"
					{...others}
				>
					<ButtonLink
						className="grow"
						not_border
						text={name}
						to={`${url}/${id}`}
					/>
					<div className="flex-row">
						<Button
							icon={faEdit}
							not_border
							icon_size="1x"
							title="Editar courseo"
							onClick={() => setMode("edit")}
						/>
						<Button
							icon={faTrash}
							not_border
							icon_size="1x"
							text_color="danger"
							title="Eliminar courseo"
							onClick={() => setMode("delete")}
						/>
					</div>
				</div>
			);
	}
};

export default CourseGroupBox;