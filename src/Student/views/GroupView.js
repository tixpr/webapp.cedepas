import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Load from "../../components/Load";
import ErrorMessage from "../../components/ErrorMessage";
import {
	resetGetCoursesGroupAction,
	getCoursesGroupAction,
} from "../redux/actions/coursesActions";
import ListView from "../../components/ListView";
import ButtonLink from "../../components/ButtonLink";
import Text from "../../components/Text";

const GroupView = () => {
	const { group_id } = useParams();
	const courses = useSelector((state) => state.student.courses.courses);
	const load = useSelector((state) => state.student.courses.load);
	const errors = useSelector((state) => state.student.courses.errors);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCoursesGroupAction(group_id));
		return () => dispatch(resetGetCoursesGroupAction());
	}, [dispatch, group_id]);
	if (load) {
		return <Load />;
	}
	return (
		<div className="grow flex-column">
			{errors ? (
				<ErrorMessage msg={errors} />
			) : (
				<>
					<Text h2 className="text-dark">
						<center>CURSOS</center>
					</Text>
					<div className="container-lg">
						<ListView>
							{courses.map((course) => (
								<ButtonLink
									className="box-shadow"
									key={`course-${course.id}`}
									to={`/course/${course.id}`}
									not_border
									text={course.name}
								/>
							))}
						</ListView>
					</div>
				</>
			)}
		</div>
	);
};

export default GroupView;
