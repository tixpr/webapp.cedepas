import React, { useState } from "react";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Button";
import EditCourseForm from "./EditCourseForm";
import DeleteCourseForm from "./DeleteCourseForm";

const CourseBox = ({ course,area_id }) => {
	const { id, name, credits, hours } = course;
	const [edit, setEdit] = useState(false);
	const [erase, setErase] = useState(false);
	if (edit) {
		return (
			<EditCourseForm
				course={course}
				area_id={area_id}
				onSuccess={() => setEdit(false)}
				onCancel={() => setEdit(false)}
			/>
		);
	}
	if (erase) {
		return (
			<DeleteCourseForm
				course_id={id}
				area_id={area_id}
				onSuccess={() => setErase(false)}
				onCancel={() => setErase(false)}
			/>
		);
	}
	return (
		<div className="flex-row nowrap margin-10 padding-10 bd-grey-400">
			<div className="grow flex-column">
				<span>
					<strong>{name}</strong>
				</span>
				<div className="flex-row justify-evenly">
					<i>
						Creditos: <strong>{credits}</strong>
					</i>
					<i>
						Horas: <strong>{hours}</strong>
					</i>
				</div>
			</div>
			<div className="flex-row flex-center wrap">
				<Button
					icon={faEdit}
					bg_color="none"
					text_color="primary"
					not_border
					icon_size="1x"
					onClick={()=>setEdit(true)}
				/>
				<Button
					icon={faTrash}
					bg_color="none"
					text_color="danger"
					not_border
					icon_size="1x"
					onClick={()=>setErase(true)}
				/>
			</div>
		</div>
	);
};

export default CourseBox;
