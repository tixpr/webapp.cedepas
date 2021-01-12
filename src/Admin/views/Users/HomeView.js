import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Load from "../../../components/Load";
import {
	loadGetAllUsersAction,
	getAllUsersAction,
	setFilterUserAction,
} from "../../redux/actions/usersActions";
import ListView from "../../../components/ListView";
import SwitchForm from "../../../components/SwitchForm";
import Button from "../../../components/Button";
import InputForm from "../../../components/InputForm";
import Form, { Submit } from "../../../components/Form";
import Paginate from "../../../components/Paginate";
import ImportUsers from "./ImportUsers";
import NewUserForm from "./NewUserForm";
import {
	faUserPlus,
	faFileImport,
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
import UserBox from "./UserBox";

const HomeView = () => {
	const { url } = useRouteMatch();
	const { register, handleSubmit } = useForm();
	const users = useSelector((state) => state.admin.users.data);
	const links = useSelector((state) => state.admin.users.links);
	const total = useSelector((state) => state.admin.users.total);
	const is_load = useSelector((state) => state.admin.users.is_load);
	const [view_new, setViewNew] = useState(false);
	const [view_import, setViewImport] = useState(false);
	const dispatch = useDispatch();
	const on_paginate = (url) => {
		dispatch(getAllUsersAction(url));
	};
	const paginate =
		!is_load && links && links.length > 3 ? (
			<Paginate links={links} onClick={on_paginate} />
		) : null;
	const on_submit = (d) => {
		console.info("search acction");
		dispatch(setFilterUserAction({ name: "search", value: d.search }));
		dispatch(loadGetAllUsersAction());
		dispatch(getAllUsersAction());
	};
	useEffect(() => {
		dispatch(loadGetAllUsersAction());
		dispatch(getAllUsersAction());
	}, [dispatch]);
	return (
		<>
			{view_new ? (
				<div className="container-lg flex-column">
					<NewUserForm
						onSuccess={() => setViewNew(false)}
						onCancel={() => setViewNew(false)}
					/>
				</div>
			) : null}
			{view_import ? (
				<div className="flex-column">
					<ImportUsers
						onSuccess={() => setViewImport(false)}
						onCancel={() => setViewImport(false)}
					/>
				</div>
			) : null}
			<div className="flex-row align-center wrap justify-stretch">
				<div className="flex-row wrap align-center justify-start">
					{view_new || view_import ? null : (
						<>
							<Button
								text_color="white"
								not_border
								bg_color="success"
								icon={faUserPlus}
								text="Nuevo"
								onClick={() => setViewNew(true)}
							/>
							<Button
								text_color="white"
								icon={faFileImport}
								not_border
								bg_color="primary"
								text="Importar"
								onClick={() => setViewImport(true)}
							/>
						</>
					)}
				</div>
				<div className="flex-row justify-end grow">
					<Form
						className="flex-row align-center"
						onSubmit={handleSubmit(on_submit)}
					>
						<InputForm name="search" upper register={register} />
						<Submit icon={faSearch} not_border bg_color="not" />
					</Form>
				</div>
			</div>
			<div className="flex-row wrap align-center justify-start">
				<span className="text-grey-700">
					{is_load ? "Cargando..." : `${total} resuldatos.`}
				</span>
				<div className="flex-row grow align-center justify-end">
					<SwitchForm
						name="students"
						text="Estudiantes"
						onChange={(e) => {
							dispatch(
								setFilterUserAction({
									name: "students",
									value: e.target.checked,
								})
							);
							dispatch(loadGetAllUsersAction());
							dispatch(getAllUsersAction());
						}}
					/>
					<SwitchForm
						name="teachers"
						text="Docentes"
						onChange={(e) => {
							dispatch(
								setFilterUserAction({
									name: "teachers",
									value: e.target.checked,
								})
							);
							dispatch(loadGetAllUsersAction());
							dispatch(getAllUsersAction());
						}}
					/>
				</div>
			</div>
			{paginate}
			<ListView>
				{is_load ? (
					<Load />
				) : (
					users.map((user) => (
						<UserBox key={user.id} user={user} url={url} />
					))
				)}
			</ListView>
			{paginate}
		</>
	);
};

export default HomeView;
