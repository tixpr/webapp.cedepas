import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Load from "../../components/Load";
import Notetd from "../../components/Notetd";
import Presencetd from "../../components/Presencetd";
import Text from "../../components/Text";
import {
	resetCourseGroupAction,
	getCourseGroupAction,
} from "../redux/actions/courseActions";

const CourseView = () => {
	const { course_group_id } = useParams();
	const course = useSelector((state) => state.student.course.course);
	const teacher = useSelector((state) => state.student.course.teacher);
	const presences = useSelector((state) => state.student.course.presences);
	const notes = useSelector((state) => state.student.course.notes);
	const user_presences = useSelector(
		(state) => state.student.course.user_presences
	);
	const user_notes = useSelector((state) => state.student.course.user_notes);
	const errors = useSelector((state) => state.student.course.errors);
	const load = useSelector((state) => state.student.course.load);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCourseGroupAction(course_group_id));
		return () => dispatch(resetCourseGroupAction());
	}, [dispatch, course_group_id]);
	if (load) {
		return <Load />;
	}
	return (
		<>
			{errors && <ErrorMessage msg={errors} />}
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
			<div className="grow bg-white padding-10 overflow-x">
				<table>
					<thead>
						<tr>
							<th colSpan={notes.length}>Notas</th>
						</tr>
						<tr>
							{notes.map((n) => (
								<th key={`note-${n.id}-${course_group_id}`}>
									{n.name}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						<tr>
							{notes.map((note) => (
								<Notetd
									key={`note${note.id}-st-${course_group_id}`}
									note={
										user_notes.find(
											(n) => n.note_id === note.id
										).note
									}
								/>
							))}
						</tr>
					</tbody>
				</table>
			</div>
			<hr/>
			<div className="grow bg-white padding-10 overflow-x">
				<table>
					<thead>
						<tr>
							<th colSpan={presences.length}>Asistencias</th>
						</tr>
						<tr>
							{presences.map((p) => (
								<th key={`presence-${p.id}-${course_group_id}`}>
									{p.date.slice(5)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						<tr>
							{presences.map((p) => (
								<Presencetd
									key={`presence${p.id}-st-${course_group_id}`}
									presence={
										user_presences.find(
											(up) => up.presence_id === p.id
										).presence
									}
								/>
							))}
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};

export default CourseView;
