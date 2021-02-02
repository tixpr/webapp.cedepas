import React, { useEffect } from "react";
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

const HomeView = ()=>{
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
					<Text h2 className="text-dark">
						<center>GRUPOS</center>
					</Text>
					<div className="container-lg">
						<ListView>
							{groups.map((group) => (
								<ButtonLink
									className="box-shadow"
									key={`group-${group.id}`}
									to={`/group/${group.id}`}
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