import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import ButtonLink from "../../components/ButtonLink";
import ErrorMessage from "../../components/ErrorMessage";
import ListView from "../../components/ListView";
import Load from "../../components/Load";
import Text from "../../components/Text";
import {
	clearGetGroupsRegisterAction,
	getGroupsRegisterAction,
} from "../redux/actions/registerActions";

const GroupsRegister = ()=>{
	const {url} = useRouteMatch();
	const groups = useSelector((state) => state.student.register.groups);
	const load = useSelector((state) => state.student.register.load);
	const errors = useSelector((state) => state.student.register.errors);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getGroupsRegisterAction());
		return () => {
			dispatch(clearGetGroupsRegisterAction());
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
					<Text h2 className="text-grey-700 bg-white padding-10">
						<center>GRUPOS PARA PRE-MATRICULA</center>
					</Text>
					<div className="container-lg">
						<ListView>
							{groups.map((group) => (
								<ButtonLink
									className="box-shadow"
									key={`g-r-${group.id}`}
									to={`${url}/${group.id}`}
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

export default GroupsRegister;