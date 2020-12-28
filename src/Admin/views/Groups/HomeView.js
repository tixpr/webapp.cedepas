import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ButtonLink from "../../../components/ButtonLink";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import ListView from "../../../components/ListView";
import Paginate from "../../../components/Paginate";
//new period actions
import {
	loadGroupsAction,
	getGroupsAction,
	postGroupAction,
	loadPostGroupAction,
	clearPostGroupAction,
	putGroupAction,
	loadPutGroupAction,
	clearPutGroupAction,
	deleteGroupAction,
	loadDeleteGroupAction,
	clearDeleteGroupAction,
} from "../../redux/actions/groupsActions";
//componentes
import Form, { Submit } from "../../../components/Form";
import InputForm from "../../../components/InputForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import {
	faFolderPlus,
	faEdit,
	faTrash,
	faCheck,
	faWindowClose,
} from "@fortawesome/free-solid-svg-icons";

const edit_group_schema = yup.object().shape({
	name: yup.string().required("Requerido"),
});
const EditGroupForm = ({ onSuccess, period, onCancel }) => {
	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			name: period.name,
		},
		mode: "onBlur",
		resolver: yupResolver(edit_group_schema),
	});
	const is_load = useSelector((state) => state.admin.groups.put_group_load);
	const action_error = useSelector(
		(state) => state.admin.groups.put_group_errors
	);
	const action_success = useSelector(
		(state) => state.admin.groups.put_group_success
	);
	const dispatch = useDispatch();
	const submit = (d) => {
		console.info(d);
		dispatch(loadPutGroupAction());
		dispatch(putGroupAction(d, period.id));
	};
	if (action_error) {
		setTimeout(() => {
			dispatch(clearPutGroupAction());
		}, 7000);
	}
	if (action_success) {
		dispatch(clearPutGroupAction());
		onSuccess && onSuccess();
	}
	return (
		<div className="grow">
			<Form
				fielset="bg-white"
				onSubmit={handleSubmit(submit)}
				errors={action_error}
				success={action_success}
			>
				<div className="flex-row">
					<div className="grow">
						{is_load ? <p>Cargando</p> : null}
						<InputForm
							name="name"
							upper
							hidden={is_load}
							register={register}
							inline
							error={errors.name}
						/>
					</div>
					<Submit
						icon={faCheck}
						bg_color="primary"
						text_color="white"
						center
					/>
					<Button
						icon={faWindowClose}
						bg_color="danger"
						text_color="white"
						onClick={onCancel}
					/>
				</div>
			</Form>
		</div>
	);
};
const DeleteGroupForm = ({ onSuccess, period, onCancel }) => {
	const { handleSubmit } = useForm();
	const is_load = useSelector(
		(state) => state.admin.groups.delete_group_load
	);
	const action_error = useSelector(
		(state) => state.admin.groups.delete_group_errors
	);
	const action_success = useSelector(
		(state) => state.admin.groups.delete_group_success
	);
	const dispatch = useDispatch();
	const submit = (d) => {
		dispatch(loadDeleteGroupAction());
		dispatch(deleteGroupAction(period.id));
	};
	if (action_error) {
		setTimeout(() => {
			dispatch(clearDeleteGroupAction());
		}, 7000);
	}
	if (action_success) {
		dispatch(clearDeleteGroupAction());
		onSuccess && onSuccess();
	}
	return (
		<div className="grow">
			<Form
				fielset="bg-white"
				onSubmit={handleSubmit(submit)}
				errors={action_error}
				success={action_success}
			>
				<div className="flex-row">
					<div className="grow">
						{is_load ? (
							<p>Cargando</p>
						) : (
							<Text h3 className="text-danger">
								Confirmar la eliminación
							</Text>
						)}
					</div>
					<Submit
						icon={faCheck}
						bg_color="danger"
						text_color="white"
						center
					/>
					<Button
						icon={faWindowClose}
						bg_color="success"
						text_color="white"
						onClick={onCancel}
					/>
				</div>
			</Form>
		</div>
	);
};

const GroupBox = ({ period, url, ...others }) => {
	const { id, name } = period;
	const [mode, setMode] = useState("default");
	switch (mode) {
		case "delete":
			return (
				<DeleteGroupForm
					period={period}
					onSuccess={() => setMode("default")}
					onCancel={() => setMode("default")}
				/>
			);
		case "edit":
			return (
				<EditGroupForm
					period={period}
					onSuccess={() => setMode("default")}
					onCancel={() => setMode("default")}
				/>
			);
		case "default":
		default:
			return (
				<div
					className="flex-row align-center wrap justify-start bg-white"
					{...others}
				>
					<ButtonLink
						className="grow"
						not_border
						text={name}
						to={`${url}/${id}`}
					/>
					<div className="flex-row">
						<Button
							icon={faEdit}
							not_border
							icon_size="1x"
							title="Editar periodo"
							onClick={() => setMode("edit")}
						/>
						<Button
							icon={faTrash}
							not_border
							icon_size="1x"
							text_color="danger"
							title="Eliminar periodo"
							onClick={() => setMode("delete")}
						/>
					</div>
				</div>
			);
	}
};
const new_group_schema = yup.object().shape({
	name: yup.string().required("Requerido"),
});
const NewGroupForm = ({ onSuccess, onCancel }) => {
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(new_group_schema),
	});
	const is_load = useSelector((state) => state.admin.groups.post_group_load);
	const action_error = useSelector(
		(state) => state.admin.groups.post_group_errors
	);
	const action_success = useSelector(
		(state) => state.admin.groups.post_group_success
	);
	const dispatch = useDispatch();
	const submit = (d) => {
		console.info(d);
		dispatch(loadPostGroupAction());
		dispatch(postGroupAction(d));
	};
	if (action_error) {
		setTimeout(() => {
			dispatch(clearPostGroupAction());
		}, 7000);
	}
	if (action_success) {
		dispatch(clearPostGroupAction());
		onSuccess && onSuccess();
	}
	return (
		<div className="grow">
			<Form
				legend="Nuevo Groupo"
				fielset="bg-white"
				onSubmit={handleSubmit(submit)}
				errors={action_error}
				success={action_success}
			>
				<div className="flex-row">
					<div className="grow">
						{is_load ? <p>Cargando</p> : null}
						<InputForm
							name="name"
							upper
							hidden={is_load}
							register={register}
							inline
							error={errors.name}
						/>
					</div>
					<Submit
						icon={faCheck}
						bg_color="primary"
						text_color="white"
						center
					/>
					<Button
						icon={faWindowClose}
						bg_color="danger"
						text_color="white"
						onClick={onCancel}
					/>
				</div>
			</Form>
		</div>
	);
};

const HomeView = () => {
	const { url } = useRouteMatch();
	const [view_new_group_form, setViewNewGroupForm] = useState(false);
	const groups = useSelector((state) => state.admin.groups.data);
	const groups_links = useSelector((state) => state.admin.groups.links);
	const groups_total = useSelector((state) => state.admin.groups.total);
	const is_load = useSelector((state) => state.admin.groups.groups_load);
	const dispatch = useDispatch();
	const paginate_groups = (u) => {
		dispatch(loadGroupsAction());
		dispatch(getGroupsAction(u));
	};
	const groups_paginate =
		groups_links && groups_links.length > 3 ? (
			<Paginate
				links={groups_links}
				pk="groups"
				onClick={paginate_groups}
			/>
		) : null;
	useEffect(() => {
		dispatch(loadGroupsAction());
		dispatch(getGroupsAction());
	}, [dispatch]);
	return (
		<div className="flex-column grow justify-stretch">
			<div className="flex-row align-center wrap justify-stretch">
				<div className="flex-row wrap align-center justify-start">
					{view_new_group_form ? null : (
						<Button
							text_color="white"
							not_border
							bg_color="success"
							icon={faFolderPlus}
							text="Nuevo Groupo"
							onClick={() => setViewNewGroupForm(true)}
						/>
					)}
				</div>
				<div className="flex-row grow justify-end">
					<span className="text-grey-700">
						{groups_total
							? `${groups_total} grupos en total.`
							: "Cargando..."}
					</span>
				</div>
			</div>
			{view_new_group_form ? (
				<div className="container-lg">
					<NewGroupForm
						onSuccess={() => {
							setViewNewGroupForm(false);
						}}
						onCancel={() => {
							setViewNewGroupForm(false);
						}}
					/>
				</div>
			) : null}
			{groups_paginate}
			<div className="container-lg">
				<ListView>
					{is_load ? (
						<p>Cargando...</p>
					) : (
						groups.map((p) => (
							<GroupBox
								key={`period-${p.id}`}
								period={p}
								url={url}
							/>
						))
					)}
				</ListView>
			</div>
		</div>
	);
};

export default HomeView;
