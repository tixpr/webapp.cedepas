import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouteMatch } from "react-router-dom";
import Text from "../../../components/Text";
import Button from "../../../components/Button";
import ListView from "../../../components/ListView";
import {
	getCoursesAction,
	loadGetCoursesAction,
	clearGetCoursesAction,
} from "../../redux/actions/coursesActions";
import CourseBox from "./Courses/CourseBox";
import ImportCoursesForm from "./Courses/ImportCoursesForm";
import NewCourseForm from "./Courses/NewCourseForm";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const GroupView = () => {
	const { url } = useRouteMatch();
	const { group_id } = useParams();
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.admin.courses.data);
	const [view_new_course, setViewNewCourse] = useState(false);
	const [view_import_courses, setViewImportCourses] = useState(false);
	const action_errors = useSelector(
		(state) => state.admin.courses.get_courses_errors
	);
	const action_success = useSelector(
		(state) => state.admin.courses.get_courses_success
	);
	const is_load = useSelector(
		(state) => state.admin.courses.get_courses_load
	);
	useEffect(() => {
		dispatch(loadGetCoursesAction());
		dispatch(getCoursesAction(group_id));
	}, [dispatch]);
	if (action_success) {
		dispatch(clearGetCoursesAction());
	}
	return (
		<div className="flex-column">
			<div className="flex-row align-center">
				<Text h2>Cursos</Text>
				<Button
					text="Nuevo curso"
					icon={faPlus}
					text_color="white"
					not_border
					hidden={view_new_course || view_import_courses}
					bg_color="success"
					onClick={() => setViewNewCourse(true)}
				/>
				<Button
					text="Importar cursos"
					icon={faPlus}
					text_color="white"
					not_border
					hidden={view_new_course || view_import_courses}
					bg_color="primary"
					onClick={() => setViewImportCourses(true)}
				/>
			</div>
			{view_new_course ? (
				<div className="container-lg">
					<NewCourseForm
						onSuccess={() => setViewNewCourse(false)}
						onCancel={() => setViewNewCourse(false)}
					/>
				</div>
			) : null}
			{view_import_courses ? (
				<div className="container-lg">
					<ImportCoursesForm
						onSuccess={() => setViewImportCourses(false)}
						onCancel={() => setViewImportCourses(false)}
					/>
				</div>
			) : null}
			<div className="container-lg">
				{is_load ? <p>Cargando...</p> : null}
				<ListView>
					{is_load
						? null
						: courses.map((c) => (
								<CourseBox
									key={`coursebox-${c.id}`}
									course={c}
									url={url}
								/>
						  ))}
				</ListView>
			</div>
		</div>
	);
};

export default GroupView;
