import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Load from "../../components/Load";
import {
	loadGetAllUsersAction,
	getAllUsersAction,
	setFilterUserAction,
} from "../redux/actions/usersActions";
import ListView from "../../components/ListView";
import SwitchForm from "../../components/SwitchForm";
import Button from "../../components/Button";
import InputForm from "../../components/InputForm";
import Form, { Submit } from "../../components/Form";
import Paginate from "../../components/Paginate";
import NewUserForm from "./Users/NewUserForm";
import { faUserPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import UserBox from "./Users/UserBox";
import ErrorMessage from "../../components/ErrorMessage";
import {
	loadPutActiveRegisterAction,
	putActiveRegisterAction,
} from "../../redux/actions/registerActions";

const UsersView = () => {
	const { register, handleSubmit } = useForm();
	const users = useSelector((state) => state.admin.users.users);
	const links = useSelector((state) => state.admin.users.links);
	const total = useSelector((state) => state.admin.users.total);
	const load = useSelector((state) => state.admin.users.is_load);
	const errors = useSelector((state) => state.admin.users.errors);
	const is_reg = useSelector((state) => state.register.register);
	const errors_reg = useSelector((state) => state.register.put_errors);
	const load_reg = useSelector((state) => state.register.put_load);
	const [view_new, setViewNew] = useState(false);
	const dispatch = useDispatch();
	const on_paginate = (url) => {
		dispatch(loadGetAllUsersAction());
		dispatch(getAllUsersAction(url));
	};
	const paginate =
		!load && links && links.length > 3 ? (
			<Paginate links={links} onClick={on_paginate} />
		) : null;
	const on_submit = (d) => {
		dispatch(setFilterUserAction({ name: "search", value: d.search }));
		dispatch(loadGetAllUsersAction());
		dispatch(getAllUsersAction());
	};
	const changeRegister = () => {
		dispatch(loadPutActiveRegisterAction());
		dispatch(putActiveRegisterAction());
	};
	useEffect(() => {
		dispatch(loadGetAllUsersAction());
		dispatch(getAllUsersAction());
	}, [dispatch]);
	return (
		<>
			{errors && <ErrorMessage msg={errors} />}
			{view_new && (
				<NewUserForm
					onSuccess={() => setViewNew(false)}
					onCancel={() => setViewNew(false)}
				/>
			)}
			<div className="flex-row align-center wrap justify-stretch">
				<div className="flex-row wrap align-center justify-start">
					<Button
						text_color="white"
						not_border
						bg_color="success"
						icon={faUserPlus}
						hidden={view_new}
						text="Nuevo"
						onClick={() => setViewNew(true)}
					/>
					{load_reg && <Load />}
					{errors_reg ? <ErrorMessage msg={errors_reg} /> : null}
					<SwitchForm
						text="Registro de usuarios"
						name="remember"
						hidden={load_reg}
						checked={is_reg}
						onChange={() => changeRegister()}
					/>
				</div>
				<div className="flex-row justify-end grow">
					<Form fielset="bg-white" onSubmit={handleSubmit(on_submit)}>
						<div className="flex-row justify-end grow">
							<InputForm name="search" register={register} />
							<Submit icon={faSearch} not_border bg_color="not" />
						</div>
					</Form>
				</div>
			</div>
			<div className="flex-row wrap align-center justify-start">
				<span className="text-grey-700">
					{load ? "Cargando..." : `${total} resuldatos.`}
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
			{load ? (
				<Load />
			) : (
				<ListView>
					{users.length > 0 &&
						users.map((user) => (
							<UserBox key={`user-${user.id}`} user={user} />
						))}
				</ListView>
			)}
			{paginate}
		</>
	);
};

export default UsersView;
