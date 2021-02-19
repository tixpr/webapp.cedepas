import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../../components/ErrorMessage";
import Text from "../../../components/Text";
import Load from "../../../components/Load";
import Button from "../../../components/Button";
import Notetd from "../../../components/Notetd";
import Presencetd from "../../../components/Presencetd";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import {
	loadGetCourseGroupAction,
	clearGetCourseGroupAction,
	getCourseGroupAction,
} from "../../redux/actions/courseGroupActions";
import StudentCourseGroupForm from "./Courses/StudentCourseGroupForm";
import ButtonLink from "../../../components/ButtonLink";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";

const CourseGroupView = () => {
	const { course_group_id } = useParams();
	const { url } = useRouteMatch();
	const [add_student, setAddStudent] = useState(false);
	const dispatch = useDispatch();
	const course = useSelector((state) => state.admin.course_group.course);
	const action_success = useSelector(
		(state) => state.admin.course.get_course_group_success
	);
	const load = useSelector(
		(state) => state.admin.course_group.get_course_group_load
	);
	const action_errors = useSelector(
		(state) => state.admin.course_group.get_course_group_errors
	);
	const teacher = useSelector((state) => state.admin.course_group.teacher);
	const students = useSelector((state) => state.admin.course_group.students);
	const notes = useSelector((state) => state.admin.course_group.notes);
	const presences = useSelector(
		(state) => state.admin.course_group.presences
	);
	useEffect(() => {
		dispatch(loadGetCourseGroupAction());
		dispatch(getCourseGroupAction(course_group_id));
		return () => {
			dispatch(clearGetCourseGroupAction());
		};
	}, [dispatch, course_group_id]);
	if (action_success) {
		dispatch(clearGetCourseGroupAction());
	}
	if (load) {
		return <Load />;
	}
	return (
		<div className="flex-column align-stretch">
			{action_errors ? (
				<ErrorMessage msg={action_errors} />
			) : (
				<>
					<div className="flex-row justify-start">
						<ButtonLink
							className="box-shadow"
							bg_color="success"
							text_color="white"
							icon={faIdCard}
							text={"Pre-Matriculas"}
							to={`${url}/matricula`}
						/>
					</div>
					<div className="flex-row align-end justify-center wrap padding-10 bg-white">
						<Text h2 className="grow text-dark margin-10">
							Curso: {course && course.name}
						</Text>
						<Text h4 className="text-dark margin-10">
							Creditos: {course && course.credits}
						</Text>
						<Text h4 className="text-dark margin-10">
							Horas: {course && course.hours}
						</Text>
						<Text h4 className="text-dark margin-10">
							Docente: {teacher && teacher.name}
						</Text>
					</div>
					{add_student && (
						<StudentCourseGroupForm
							onSuccess={() => setAddStudent(false)}
							onCancel={() => setAddStudent(false)}
							course_group_id={course_group_id}
						/>
					)}
					{students && students.length > 0 ? (
						<div className="grow bg-white padding-10 overflow-x">
							<table>
								<thead>
									<tr>
										<th
											rowSpan="2"
											style={{
												minWidth: 400,
											}}
										>
											<div className="flex-row flex-center">
												Apellidos y Nombre(s)
												<Button
													text_color="danger"
													not_border
													hidden={load}
													bg_color="none"
													icon={faUserPlus}
													title="Agregar Estudiante"
													onClick={() =>
														setAddStudent(true)
													}
												/>
											</div>
										</th>
										<th colSpan={presences.length}>
											Asistencias
										</th>
										<th colSpan={notes.length}>Notas</th>
									</tr>
									<tr>
										{presences.map((p) => (
											<th
												key={`presence-${p.id}-${course_group_id}`}
											>
												{p.date.slice(5)}
											</th>
										))}
										{notes.map((n) => (
											<th
												key={`note-${n.id}-${course_group_id}`}
											>
												{n.name}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{students.map((student) => {
										return (
											<tr
												key={`student-tr-${student.id}`}
											>
												<td className="text-dark text-justify">
													<strong>
														{student.name}
													</strong>
												</td>
												{presences.map((presence) => (
													<Presencetd
														key={`presence${presence.id}-student${student.id}-${course_group_id}`}
														presence={
															presence.presences.find(
																(p) =>
																	p.user_id ===
																	student.id
															)
																? presence.presences.find(
																		(p) =>
																			p.user_id ===
																			student.id
																  ).presence
																: false
														}
													/>
												))}
												{notes.map((note) => (
													<Notetd
														key={`note${note.id}-student${student.id}-${course_group_id}`}
														note={
															note.notes.find(
																(n) =>
																	n.user_id ===
																	student.id
															)
																? note.notes.find(
																		(n) =>
																			n.user_id ===
																			student.id
																  ).note
																: 0
														}
													/>
												))}
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					) : null}
				</>
			)}
		</div>
	);
};

export default CourseGroupView;
