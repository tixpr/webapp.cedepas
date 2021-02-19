import React, { useEffect } from "react";
import {useRouteMatch} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
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
	const {url} = useRouteMatch();
	const groups = useSelector((state) => state.teacher.groups.groups);
	const load = useSelector((state) => state.teacher.groups.load);
	const errors = useSelector((state) => state.teacher.groups.errors);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getGroupsAction());
		return () => {
			dispatch(resetGetGroupsAction());
		};
	}, [dispatch]);
	return (
		<div className="grow flex-column">
			<Text h2 className="text-dark">
				<center>GRUPOS</center>
			</Text>
			{load && <Load />}
			{errors ? (
				<ErrorMessage msg={errors} />
			) : (
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
			)}
		</div>
	);
};
export default HomeView;
