import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Load from "../../components/Load";
import ErrorMessage from "../../components/ErrorMessage";
import {
	clearGetCourseGroupsRegAction,
	getCourseGroupsRegAction,
	loadPostRegisterAction,
	clearPostRegisterAction,
	postRegisterAction,
} from "../redux/actions/registerActions";
import ListView from "../../components/ListView";
import Text from "../../components/Text";
import Button from "../../components/Button";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";

const PreBox = ({ course }) => {
	const [reg, setReg] = useState(false);
	const dispatch = useDispatch();
	const { id, teacher, name } = course;
	const load = useSelector((state) => state.student.register.post_load);
	const errors = useSelector((state) => state.student.register.post_errors);
	const preMatricula = (e) => {
		e.preventDefault();
		dispatch(loadPostRegisterAction());
		dispatch(postRegisterAction(id));
		setReg(true);
	};
	useEffect(() => {
		return () => dispatch(clearPostRegisterAction());
	}, [dispatch]);
	return (
		<div className="box-shadow bg-white flex-column">
			{load && reg ? (
				<Load />
			) : (
				<>
					<div className="flex-column">
						{errors && <ErrorMessage msg={errors} />}
					</div>
					<div className="flex-row align-center">
						<div className="grow flex-column">
							<Text h4 className="text-grey-700">
								{`Curso: ${name}`}
							</Text>
							{teacher ? (
								<Text h5 className="text-grey-600">
									{`Docente: ${teacher}`}
								</Text>
							) : null}
						</div>
						<Button
							icon={faIdCard}
							text="Pre-Matricularse"
							text_color="white"
							disabled={load}
							hidden={reg}
							bg_color="primary"
							not_border
							onClick={preMatricula}
						/>
					</div>
				</>
			)}
		</div>
	);
};

const CoursesGroupRegisterView = () => {
	const { group_id } = useParams();
	const courses = useSelector((state) => state.student.register.courses);
	const load = useSelector((state) => state.student.register.get_load);
	const errors = useSelector((state) => state.student.register.get_errors);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCourseGroupsRegAction(group_id));
		return () => dispatch(clearGetCourseGroupsRegAction());
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
						<center>CURSOS PARA PRE-MATRICULA</center>
					</Text>
					<div className="container-lg">
						<ListView>
							{courses.map((c) => (
								<PreBox key={`c-r-${c.id}`} course={c} />
							))}
						</ListView>
					</div>
				</>
			)}
		</div>
	);
};

export default CoursesGroupRegisterView;
