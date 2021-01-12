import React, { useState } from "react";
import Button from "../../../components/Button";
import {
	faChevronDown,
	faChevronUp,
	faPlus,
	faTrash,
	faEdit,
} from "@fortawesome/free-solid-svg-icons";
import AddCourseForm from "./AddCourseForm";
import EditAreaForm from "./EditAreaForm";
import DeleteAreaForm from "./DeleteAreaForm";
import CourseBox from "./CourseBox";

const AreaBox = ({ area }) => {
	const [expand, setExpand] = useState(false);
	const [add, setAdd] = useState(false);
	const [edit, setEdit] = useState(false);
	const [erase, setErase] = useState(false);
	const courses = area.courses || [];
	if (erase)
		return (
			<DeleteAreaForm
				area_id={area.id}
				onSuccess={() => setErase(false)}
				onCancel={() => setErase(false)}
			/>
		);
	if (edit)
		return (
			<EditAreaForm
				area={area}
				onSuccess={() => setEdit(false)}
				onCancel={() => setEdit(false)}
			/>
		);
	return (
		<div className="flex-column bg-white">
			<div className="flex-row wrap align-center">
				<span className="grow">
					<strong>{area.name}</strong>
				</span>
				{!add ? (
					<>
						<Button
							not_border
							text_color="danger"
							icon={faTrash}
							onClick={() => setErase(true)}
						/>
						<Button
							not_border
							text_color="success"
							icon={faEdit}
							onClick={() => setEdit(true)}
						/>
						<Button
							icon={faPlus}
							text="Curso"
							not_border
							onClick={() => setAdd(true)}
						/>
					</>
				) : null}
				<Button
					icon={expand ? faChevronUp : faChevronDown}
					not_border
					onClick={() => {
						setExpand(!expand);
					}}
				/>
			</div>
			{add ? (
				<AddCourseForm
					area_id={area.id}
					onSuccess={() => setAdd(false)}
					onCancel={() => setAdd(false)}
				/>
			) : null}
			<div className="flex-column">
				{expand
					? courses.map((c) => (
							<CourseBox
								area_id={area.id}
								key={`course-${c.id}`}
								course={c}
							/>
					  ))
					: null}
			</div>
		</div>
	);
};

export default AreaBox;
