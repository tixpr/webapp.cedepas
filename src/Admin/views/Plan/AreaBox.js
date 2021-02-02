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
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";

const AreaBox = ({ area }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
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
		<div className="flex-column bg-white box-shadow bd-grey-400">
			<div
				className={clsx(
					lg && "flex-row align-center",
					!lg && "flex-column-reverse"
				)}
			>
				<span className="grow text-dark">
					<strong>{area.name}</strong>
				</span>
				<div className="flex-row justify-end">
					<Button
						not_border
						text_color="danger"
						hidden={add}
						icon={faTrash}
						onClick={() => setErase(true)}
					/>
					<Button
						not_border
						text_color="success"
						hidden={add}
						icon={faEdit}
						onClick={() => setEdit(true)}
					/>
					<Button
						icon={faPlus}
						text="Curso"
						hidden={add}
						not_border
						onClick={() => setAdd(true)}
					/>
					<Button
						icon={expand ? faChevronUp : faChevronDown}
						not_border
						onClick={() => {
							setExpand(!expand);
						}}
					/>
				</div>
			</div>
			{add && (
				<AddCourseForm
					area_id={area.id}
					onSuccess={() => setAdd(false)}
					onCancel={() => setAdd(false)}
				/>
			)}
			<div className="flex-column">
				{expand &&
					courses.map((c) => (
						<CourseBox
							area_id={area.id}
							key={`course-${c.id}`}
							course={c}
						/>
					))}
			</div>
		</div>
	);
};

export default AreaBox;
