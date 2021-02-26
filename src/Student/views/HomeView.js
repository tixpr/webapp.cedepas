import { faIdBadge } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import Button from "../../components/Button";
import ButtonLink from "../../components/ButtonLink";
import ErrorMessage from "../../components/ErrorMessage";
import ListView from "../../components/ListView";
import Load from "../../components/Load";
import Text from "../../components/Text";
import {
	resetGetGroupsAction,
	getGroupsAction,
} from "../redux/actions/groupsActions";

const HomeView = () => {
	const { url } = useRouteMatch();
	const groups = useSelector((state) => state.student.groups.groups);
	const load = useSelector((state) => state.student.groups.load);
	const errors = useSelector((state) => state.student.groups.errors);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getGroupsAction());
		return () => {
			dispatch(resetGetGroupsAction());
		};
	}, [dispatch]);
	if (load) {
		return <Load />;
	}
	return (
		<div className="grow flex-column">
			{errors ? (
				<ErrorMessage msg={errors} />
			) : (
				<>
					<div className="flex-row justify-end">
						<Button
							icon={faIdBadge}
							not_border
							icon_size="2x"
							bg_color="success"
							text_color="white"
							text="Ejemplo de certificado"
							title="Reporte de usuario"
							add_class="box-shadow"
							onClick={() =>
								window.open(
									"http://localhost:8000/api/student/certificado",
									"_blank"
								)
							}
						/>
					</div>
					<Text h2 className="text-dark">
						<center>GRUPOS</center>
					</Text>
					<div className="container-lg">
						<ListView>
							{groups.map((group) => (
								<ButtonLink
									className="box-shadow"
									key={`group-${group.id}`}
									to={`${url}/group/${group.id}`}
									bg_color="white"
									text={group.name}
								/>
							))}
						</ListView>
					</div>
				</>
			)}
		</div>
	);
};

export default HomeView;
