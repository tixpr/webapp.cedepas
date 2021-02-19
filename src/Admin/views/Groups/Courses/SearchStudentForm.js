import React, { useEffect } from "react";
import Form, { Submit } from "../../../../components/Form";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import InputForm from "../../../../components/InputForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Load from "../../../../components/Load";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
	loadGetSearchStudentAction,
	clearGetSearchStudentAction,
	getSearchStudentAction,
} from '../../../redux/actions/courseGroupActions';
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';

const search_student_schema = yup.object().shape({
	search: yup.string().required("Requerido"),
});

const SearchStudentForm = ({ course_group_id }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(search_student_schema),
	});
	const dispatch = useDispatch();
	const action_errors = useSelector(state=>state.admin.course_group.search_errors);
	const load = useSelector(state=>state.admin.course_group.search_load);
	const submit = (d) => {
		dispatch(loadGetSearchStudentAction());
		dispatch(getSearchStudentAction(course_group_id,d));
	};
	useEffect(() => {
		return ()=>dispatch(clearGetSearchStudentAction());
	}, [dispatch]);
	return (
		<Form
			fielset="bg-white"
			onSubmit={handleSubmit(submit)}
			errors={action_errors}
		>
			{load && <Load />}
			<div className={clsx(lg&&"flex-row align-end",!lg&&"flex-column")}>
			<InputForm
				label="Buscar"
				name="search"
				add_class='grow'
				hidden={load}
				error={errors.search}
				register={register}
			/>
			<Submit
				hidden={load}
				text="Buscar"
				icon={faSearch}
				bg_color="none"
				text_color="primary"
				center
			/>
			</div>
		</Form>
	);
};

export default SearchStudentForm;
