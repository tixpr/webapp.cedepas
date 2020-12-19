import React, { useEffect } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllUsersAction,
	setFilterUserAction,
} from "../../redux/actions/usersActions";
import ListView from "../../../components/ListView";
import UserBox from "../../../components/UserBox";
import SwitchForm from "../../../components/SwitchForm";
import ButtonLink from "../../../components/ButtonLink";
import Input from "../../../components/Input";
import Form, {Submit} from '../../../components/Form';
import Paginate from "../../../components/Paginate";
import {
	faUserPlus,
	faFileImport,
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMediaQuery } from "react-responsive";

const schema = yup.object().shape({
	search: yup.string().required("Obligatorio"),
});

const HomeView = () => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { url } = useRouteMatch();
	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});
	const users = useSelector((state) => state.admin.users.data);
	const links = useSelector((state) => state.admin.users.links);
	const total = useSelector((state) => state.admin.users.total);
	const dispatch = useDispatch();
	const on_paginate = (url) => {
		dispatch(getAllUsersAction(url));
	};
	const paginate = <Paginate links={links} onClick={on_paginate} />;
	const on_submit = (d) => {
		console.info("search acction");
		dispatch(setFilterUserAction({ name: "search", value: d.search }));
		dispatch(getAllUsersAction());
	};
	useEffect(() => {
		dispatch(getAllUsersAction());
	}, [dispatch]);
	return (
		<>
			<div
				className={clsx(
					!lg && "flex-column align-stretch justify-center",
					lg && "flex-row align-center wrap justify-stretch"
				)}
			>
				<div
					className="flex-row wrap align-center justify-start"
				>
					<ButtonLink
						to={`${url}/new`}
						text_color="success"
						not_border
						bg_color='not'
						icon={faUserPlus}
						text="Nuevo"
					/>
					<ButtonLink
						to={`${url}/import`}
						icon={faFileImport}
						not_border
						bg_color='not'
						text="Importar"
					/>
				</div>
				<div
					className={clsx(
						"flex-row wrap align-center",
						lg && "justify-start",
						!lg && "justify-evenly"
					)}
				>
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
							dispatch(getAllUsersAction());
						}}
					/>
					<SwitchForm
						name="enabled"
						text="Habilidato"
						onChange={(e) => {
							dispatch(
								setFilterUserAction({
									name: "enableds",
									value: e.target.checked,
								})
							);
							dispatch(getAllUsersAction());
						}}
					/>
					<SwitchForm
						name="disabled"
						text="Inhabilitado"
						onChange={(e) => {
							dispatch(
								setFilterUserAction({
									name: "disableds",
									value: e.target.checked,
								})
							);
							dispatch(getAllUsersAction());
						}}
					/>
				</div>
				<Form
					className="flex-row grow align-center justify-end"
					onSubmit={handleSubmit(on_submit)}
				>
					<Input
						name="search"
						register={register}
						error={errors.search}
					/>
					<Submit icon={faSearch} not_border bg_color='not' />
				</Form>
			</div>
			{total ? (
				<>
					<hr />
					<span>{`Cantidad de resultados: ${total}`}</span>
				</>
			) : null}
			<hr />
			{paginate}
			<ListView>
				{users.map((user) => (
					<UserBox key={user.id} user={user} />
				))}
			</ListView>
			{paginate}
		</>
	);
};

export default HomeView;
