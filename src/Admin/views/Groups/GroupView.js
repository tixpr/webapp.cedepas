import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouteMatch } from "react-router-dom";
import Text from "../../../components/Text";
import Button from "../../../components/Button";
import ListView from "../../../components/ListView";
import Load from '../../../components/Load';
import {
	getCoursesGroupAction,
	loadGetCoursesGroupAction,
	clearGetCoursesGroupAction,
} from "../../redux/actions/coursesGroupActions";
import CourseGroupBox from "./Courses/CourseGroupBox";
import ImportCoursesForm from "./Courses/ImportCoursesForm";
import AddCourseGroupForm from "./Courses/AddCourseGroupForm";
import ErrorMessage from "../../../components/ErrorMessage";
import { faPlus, faFileUpload } from "@fortawesome/free-solid-svg-icons";

const GroupView = () => {
	const { url } = useRouteMatch();
	const { group_id } = useParams();
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.admin.courses_group.data);
	const [add, setAdd] = useState(false);
	const [_import, setImport] = useState(false);
	const action_errors = useSelector(
		(state) => state.admin.courses_group.get_courses_group_errors
	);
	const is_load = useSelector(
		(state) => state.admin.courses_group.get_courses_group_load
	);
	useEffect(() => {
		dispatch(loadGetCoursesGroupAction());
		dispatch(getCoursesGroupAction(group_id));
		return ()=>{
			dispatch(clearGetCoursesGroupAction());
		};
	}, [dispatch, group_id]);
	return (
		<div className="flex-column">
			{!add && !_import ? (
				<div className="flex-row align-center">
					<Button
						text="Nuevo curso"
						icon={faPlus}
						text_color="white"
						not_border
						hidden={add || _import}
						bg_color="success"
						onClick={() => setAdd(true)}
					/>
					<Button
						text="Importar cursos"
						icon={faFileUpload}
						text_color="white"
						not_border
						hidden={add || _import}
						bg_color="primary"
						onClick={() => setImport(true)}
					/>
				</div>
			) : null}
			<div className="container-lg">
				{add ? (
					<AddCourseGroupForm
						onCancel={() => setAdd(false)}
					/>
				) : null}
				{_import ? (
					<ImportCoursesForm
						onSuccess={() => setImport(false)}
						onCancel={() => setImport(false)}
					/>
				) : null}
			</div>
			{action_errors ? <ErrorMessage msg={action_errors} /> : null}
			{is_load ? (
				<Load />
			) : (
				<>
					<center>
						<Text h2 className="text-grey-700">
							Cursos del Grupo
						</Text>
					</center>
					<ListView>
						{courses.map((c) => (
							<CourseGroupBox
								key={`CourseGroupBox-${c.id}`}
								course={c}
								url={url}
							/>
						))}
					</ListView>
				</>
			)}
		</div>
	);
};

export default GroupView;
