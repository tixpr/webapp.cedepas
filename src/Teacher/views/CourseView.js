import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Button from "../../components/Button";
import Load from "../../components/Load";
import Text from "../../components/Text";
import NoteTD from "../components/NoteTD";
import PresenceTD from "../components/PresenceTD";
import AddNoteForm from "../components/AddNoteForm";
import AddPresenceForm from "../components/AddPresenceForm";
import DeleteNoteForm from "../components/DeleteNoteForm";
import DeletePresenceForm from "../components/DeletePresenceForm";
import {
	getCourseGroupAction,
	resetCourseGroupAction,
} from "../redux/actions/courseActions";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
const CourseView = () => {
	const [add_note, setAddNote] = useState(false);
	const [add_presence, setAddPresence] = useState(false);
	const [trash_note, setTrashNote] = useState(false);
	const [trash_presence, setTrashPresence] = useState(false);
	const { course_group_id } = useParams();
	const dispatch = useDispatch();
	const course = useSelector((state) => state.teacher.course.course);
	const teacher = useSelector((state) => state.teacher.course.teacher);
	const students = useSelector((state) => state.teacher.course.students);
	const notes = useSelector((state) => state.teacher.course.notes);
	const presences = useSelector((state) => state.teacher.course.presences);
	const load = useSelector((state) => state.teacher.course.load);
	const errors = useSelector((state) => state.teacher.course.errors);
	useEffect(() => {
		dispatch(getCourseGroupAction(course_group_id));
		return () => dispatch(resetCourseGroupAction());
	}, [dispatch, course_group_id]);
	if (add_note) {
		return (
			<AddNoteForm
				course_group_id={course_group_id}
				onSuccess={() => setAddNote(false)}
				onCancel={() => setAddNote(false)}
			/>
		);
	}
	if (add_presence) {
		return (
			<AddPresenceForm
				course_group_id={course_group_id}
				onSuccess={() => setAddPresence(false)}
				onCancel={() => setAddPresence(false)}
			/>
		);
	}
	return (
		<div className="flex-column">
			{errors && <ErrorMessage msg={errors} />}
			{load ? (
				<Load />
			) : (
				<>
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
											Apellidos y Nombre(s)
										</th>
										{presences ? (
											<th colSpan={presences.length}>
												<div className="flex-row flex-center">
													Asistencia
													<Button
														not_border
														bg_color="none"
														icon={faPlus}
														text_color="primary"
														onClick={() =>
															setAddPresence(true)
														}
													/>
												</div>
											</th>
										) : null}
										{notes ? (
											<th colSpan={notes.length}>
												<div className="flex-row flex-center">
													Notas
													<Button
														not_border
														bg_color="none"
														icon={faPlus}
														text_color="primary"
														onClick={() =>
															setAddNote(true)
														}
													/>
												</div>
											</th>
										) : null}
									</tr>
									<tr>
										{presences &&
											presences.map((p) => (
												<th key={`p-${p.id}`}>
													<div className="flex-column flex-center">
														<Button
															not_border
															bg_color="none"
															icon={faTrash}
															icon_size="sm"
															text_color="danger"
															onClick={() =>
																setTrashPresence(
																	true
																)
															}
														/>
														{p.date.slice(5)}
													</div>
													{trash_presence && (
														<DeletePresenceForm
															presence_id={p.id}
															onSuccess={() =>
																setTrashPresence(
																	false
																)
															}
															onCancel={() =>
																setTrashPresence(
																	false
																)
															}
														/>
													)}
												</th>
											))}
										{notes &&
											notes.map((n) => (
												<th key={`n-${n.id}`}>
													<div className="flex-column flex-center">
														<Button
															not_border
															bg_color="none"
															icon={faTrash}
															icon_size="sm"
															text_color="danger"
															onClick={() =>
																setTrashNote(
																	true
																)
															}
														/>
														{n.name}
													</div>
													{trash_note && (
														<DeleteNoteForm
															note_id={n.id}
															onSuccess={() =>
																setTrashNote(
																	false
																)
															}
															onCancel={() =>
																setTrashNote(
																	false
																)
															}
														/>
													)}
												</th>
											))}
									</tr>
								</thead>
								<tbody>
									{students &&
										students.map((student) => {
											return (
												<tr
													key={`student-tr-${student.id}`}
												>
													<td className="text-dark text-justify">
														<strong>
															{student.name}
														</strong>
													</td>
													{presences &&
														presences.map(
															(presence) => (
																<PresenceTD
																	key={`p${presence.id}-s${student.id}`}
																	user_presence={presence.presences.find(
																		(p) =>
																			p.user_id ===
																			student.id
																	)}
																	presence_id={
																		presence.id
																	}
																/>
															)
														)}
													{notes &&
														notes.map((note) => (
															<NoteTD
																key={`n${note.id}-s${student.id}`}
																user_note={note.notes.find(
																	(n) =>
																		n.user_id ===
																		student.id
																)}
																note_id={
																	note.id
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

export default CourseView;
