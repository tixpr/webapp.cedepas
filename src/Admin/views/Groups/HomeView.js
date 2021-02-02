import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ButtonLink from "../../../components/ButtonLink";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import ListView from "../../../components/ListView";
import Paginate from "../../../components/Paginate";
import Load from "../../../components/Load";
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
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

const edit_group_schema = yup.object().shape({
	name: yup.string().required("Requerido"),
});
const EditGroupForm = ({ onSuccess, period, onCancel }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			name: period.name,
		},
		mode: "onBlur",
		resolver: yupResolver(edit_group_schema),
	});
	const load = useSelector((state) => state.admin.groups.put_group_load);
	const action_error = useSelector(
		(state) => state.admin.groups.put_group_errors
	);
	const action_success = useSelector(
		(state) => state.admin.groups.put_group_success
	);
	const dispatch = useDispatch();
	const submit = (d) => {
		dispatch(loadPutGroupAction());
		dispatch(putGroupAction(d, period.id));
	};
	if (action_success) {
		onSuccess && onSuccess();
	}
	useEffect(() => {
		return () => dispatch(clearPutGroupAction());
	}, [dispatch]);
	return (
		<Form
			className="grow"
			fielset="bg-white flex-column box-shadow"
			onSubmit={handleSubmit(submit)}
			errors={action_error}
		>
			{load && <Load />}
			<InputForm
				label="Nombre del Grupo"
				name="name"
				upper
				hidden={load}
				register={register}
				error={errors.name}
			/>
			<div
				className={clsx(
					lg && "flex-row flex-center",
					!lg && "flex-column"
				)}
			>
				<Submit
					text="Aceptar"
					hidden={load}
					icon={faEdit}
					bg_color="primary"
					text_color="white"
					center
				/>
				<Button
					text="Cancelar"
					hidden={load}
					icon={faTimes}
					bg_color="danger"
					text_color="white"
					center
					onClick={onCancel}
				/>
			</div>
		</Form>
	);
};
const DeleteGroupForm = ({ onSuccess, period, onCancel }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { handleSubmit } = useForm();
	const load = useSelector((state) => state.admin.groups.delete_group_load);
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
	if (action_success) {
		onSuccess && onSuccess();
	}
	useEffect(() => {
		return () => dispatch(clearDeleteGroupAction());
	}, [dispatch]);
	return (
		<Form
			className="grow flex-column"
			fielset="bg-white box-shadow"
			onSubmit={handleSubmit(submit)}
			errors={action_error}
		>
			{load && <Load />}
			<div
				className={clsx(
					lg && "flex-row flex-center",
					!lg && "flex-column"
				)}
			>
				<Text h3 className={clsx("grow text-danger", load && "hidden")}>
					<center>Confirmar la eliminación</center>
				</Text>
				<Submit
					text="Eliminar"
					icon={faCheck}
					hidden={load}
					bg_color="danger"
					text_color="white"
					center
				/>
				<Button
					icon={faTimes}
					hidden={load}
					text="Cancelar"
					bg_color="success"
					text_color="white"
					center
					onClick={onCancel}
				/>
			</div>
		</Form>
	);
};

const GroupBox = ({ period, url, ...others }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { id, name } = period;
	const [edit, setEdit] = useState(false);
	const [trash, setTrash] = useState(false);
	if (edit) {
		return (
			<EditGroupForm
				period={period}
				onSuccess={() => setEdit(false)}
				onCancel={() => setEdit(false)}
			/>
		);
	}
	if (trash) {
		return (
			<DeleteGroupForm
				period={period}
				onSuccess={() => setTrash(false)}
				onCancel={() => setTrash(false)}
			/>
		);
	}
	return (
		<div
			className={clsx(
				lg && "flex-row align-center justify-start",
				!lg && "flex-column-reverse",
				"bg-white box-shadow bd-grey-400"
			)}
			{...others}
		>
			<ButtonLink
				className={clsx(lg && "grow", "")}
				not_border
				text={name}
				to={`${url}/${id}`}
			/>
			<div
				className={clsx(
					"flex-row",
					lg && "justify-center",
					!lg && "grow justify-end"
				)}
			>
				<Button
					icon={faEdit}
					not_border
					icon_size="1x"
					title="Editar periodo"
					onClick={() => setEdit(true)}
				/>
				<Button
					icon={faTrash}
					not_border
					icon_size="1x"
					text_color="danger"
					title="Eliminar periodo"
					onClick={() => setTrash(true)}
				/>
			</div>
		</div>
	);
};
const new_group_schema = yup.object().shape({
	name: yup.string().required("Requerido"),
});
const NewGroupForm = ({ onSuccess, onCancel }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(new_group_schema),
	});
	const load = useSelector((state) => state.admin.groups.post_group_load);
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
	if (action_success) {
		onSuccess && onSuccess();
	}
	useEffect(() => {
		return () => dispatch(clearPostGroupAction());
	}, [dispatch]);
	return (
		<div className="grow">
			<Form
				className="container-lg"
				legend="Nuevo Grupo"
				fielset="bg-white"
				onSubmit={handleSubmit(submit)}
				errors={action_error}
			>
				{load && <Load />}
				<InputForm
					name="name"
					upper
					label="Nombre del Grupo"
					hidden={load}
					register={register}
					error={errors.name}
				/>
				<div
					className={clsx(
						lg && "flex-row flex-center",
						!lg && "flex-column"
					)}
				>
					<Submit
						text="Aceptar"
						icon={faCheck}
						hidden={load}
						bg_color="primary"
						text_color="white"
						center
					/>
					<Button
						text="Cancelar"
						icon={faTimes}
						hidden={load}
						bg_color="danger"
						text_color="white"
						center
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
	const load = useSelector((state) => state.admin.groups.groups_load);
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
					<Button
						text_color="white"
						not_border
						hidden={view_new_group_form}
						bg_color="success"
						icon={faFolderPlus}
						text="Nuevo Grupo"
						onClick={() => setViewNewGroupForm(true)}
					/>
				</div>
				<div className="flex-row grow justify-end">
					<span className="text-grey-700">
						{!load
							? groups_total
								? `${groups_total} grupos en total.`
								: `${groups.length} grupos en total.`
							: "Cargando..."}
					</span>
				</div>
			</div>
			{view_new_group_form && (
				<NewGroupForm
					onSuccess={() => {
						setViewNewGroupForm(false);
					}}
					onCancel={() => {
						setViewNewGroupForm(false);
					}}
				/>
			)}
			<Text title className={clsx("text-grey-700", load && "hidden")}>
				<center>Grupos</center>
			</Text>
			{groups_paginate}
			{load ? (
				<Load />
			) : (
				<ListView>
					{groups.map((p) => (
						<GroupBox key={`period-${p.id}`} period={p} url={url} />
					))}
				</ListView>
			)}
		</div>
	);
};

export default HomeView;
