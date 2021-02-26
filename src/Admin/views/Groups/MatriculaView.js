import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, useRouteMatch } from "react-router-dom";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";
import ListView from "../../../components/ListView";
import Load from "../../../components/Load";
import Text from "../../../components/Text";
import {
	clearMatriculaGroupsAction,
	getMatriculaGroupsAction,
	loadDeleteMatriculaStudentAction,
	deleteMatriculaStudentAction,
	loadMatriculaStudentsAction,
	matriculaStudentsAction,
} from "../../redux/actions/matriculasActions";
import {
	faTrash,
	faCheckDouble,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";

const PreMatriculaBox = ({ student, course_group_id }) => {
	const { id, name } = student;
	const [trash, setTrash] = useState(false);
	const errors = useSelector((state) => state.admin.matricula.delete_errors);
	const load = useSelector((state) => state.admin.matricula.delete_load);
	const dispatch = useDispatch();
	const submit = () => {
		dispatch(loadDeleteMatriculaStudentAction());
		dispatch(deleteMatriculaStudentAction(course_group_id, id));
	};
	return (
		<div className="flex-row bd-grey-400 bg-white box-shadow padding-10">
			{trash && errors && (
				<div className="grow flex-column">
					<ErrorMessage msg={errors} />
				</div>
			)}
			{trash && load && (
				<div className="grow flex-column">
					<Load />
				</div>
			)}
			{trash && (
				<>
					<Button
						icon={faTrash}
						icon_size="1x"
						text="Click para proceder a eliminar"
						hidden={load}
						center
						text_color="white"
						bg_color="danger"
						add_class="grow"
						onClick={submit}
					/>
					<Button
						icon={faTimes}
						icon_size="1x"
						text="Cancelar"
						hidden={load}
						center
						text_color="white"
						bg_color="primary"
						add_class="grow"
						onClick={() => setTrash(false)}
					/>
				</>
			)}
			{!trash && (
				<>
					<Text h4 className=" grow text-grey-700">
						{name}
					</Text>
					<Button
						icon={faTrash}
						icon_size="1x"
						text_color="danger"
						bg_color="none"
						onClick={() => setTrash(true)}
					/>
				</>
			)}
		</div>
	);
};

const MatriculaView = () => {
	const { course_group_id } = useParams();
	const dispatch = useDispatch();
	const { url } = useRouteMatch();
	const [valid, setValid] = useState(false);
	const get_errors = useSelector((state) => state.admin.matricula.get_errors);
	const get_load = useSelector((state) => state.admin.matricula.get_load);
	const students = useSelector((state) => state.admin.matricula.data);
	const post_load = useSelector((state) => state.admin.matricula.post_load);
	const post_errors = useSelector(
		(state) => state.admin.matricula.post_errors
	);
	const post_success = useSelector(
		(state) => state.admin.matricula.post_success
	);
	const realizar_matricula = () => {
		dispatch(loadMatriculaStudentsAction());
		dispatch(matriculaStudentsAction(course_group_id));
	};
	useEffect(() => {
		dispatch(getMatriculaGroupsAction(course_group_id));
		return () => dispatch(clearMatriculaGroupsAction());
	}, [dispatch, course_group_id]);
	if (post_success) {
		return <Redirect to={url.slice(0, -10)} />;
	}
	return (
		<>
			{get_errors && <ErrorMessage msg={get_errors} />}
			{post_errors && <ErrorMessage msg={post_errors} />}
			{get_load ? (
				<Load />
			) : (
				<>
					<div className="flex-row">
						{post_load && (
							<div className="grow">
								<Load />
							</div>
						)}
						{students.length > 0 && (
							<Button
								text="Registrar Matriculas"
								icon={faCheckDouble}
								hidden={post_load || valid}
								icon_size="1x"
								text_color="white"
								bg_color="success"
								onClick={() => setValid(true)}
							/>
						)}
						<Button
							text="Confirmar para registrar matriculas"
							icon={faCheckDouble}
							hidden={!valid || post_load}
							icon_size="1x"
							text_color="white"
							bg_color="primary"
							center
							add_class="grow"
							onClick={realizar_matricula}
						/>
						<Button
							text="Cancelar"
							center
							add_class="grow"
							icon={faTimes}
							hidden={!valid || post_load}
							icon_size="1x"
							text_color="white"
							bg_color="danger"
							onClick={() => setValid(false)}
						/>
					</div>
					<Text
						h2
						className="text-grey-700 padding-10 text-center bg-white"
					>
						Pre Matriculados
					</Text>
					{students.length === 0 && (
						<Text
							h4
							className="grow text-danger padding-10 text-center bg-white"
						>
							No existen estudiantes Pre Matriculados
						</Text>
					)}
					<ListView>
						{students.length > 0 &&
							students.map((st) => (
								<PreMatriculaBox
									key={`matr-user-${st.id}`}
									student={st}
									course_group_id={course_group_id}
								/>
							))}
					</ListView>
				</>
			)}
		</>
	);
};

export default MatriculaView;
