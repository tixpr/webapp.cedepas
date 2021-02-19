import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Load from "./Load";
import {
	loadGetBooksAction,
	getBooksAction,
	setSearchBookAction,
	clearGetBooksAction,
} from "../redux/actions/libraryActions";

import ListView from "./ListView";
import Text from "./Text";
import InputForm from "./InputForm";
import Form, { Submit } from "./Form";
import Paginate from "./Paginate";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from "./ErrorMessage";

const LibraryView = () => {
	const { register, handleSubmit } = useForm();
	const books = useSelector((state) => state.library.books);
	const links = useSelector((state) => state.library.links);
	const total = useSelector((state) => state.library.total);
	const load = useSelector((state) => state.library.is_load);
	const errors = useSelector((state) => state.library.errors);
	const dispatch = useDispatch();
	const on_paginate = (url) => {
		dispatch(loadGetBooksAction());
		dispatch(getBooksAction(url));
	};
	const paginate =
		!load && links && links.length > 3 ? (
			<Paginate links={links} onClick={on_paginate} />
		) : null;
	const on_submit = (d) => {
		dispatch(setSearchBookAction(d.search));
		dispatch(loadGetBooksAction());
		dispatch(getBooksAction());
	};
	useEffect(() => {
		dispatch(loadGetBooksAction());
		dispatch(getBooksAction());
		return () => dispatch(clearGetBooksAction());
	}, [dispatch]);
	return (
		<>
			{errors && <ErrorMessage msg={errors} />}
			<div className="flex-row align-center wrap justify-stretch">
				<span className="text-grey-700">
					{load ? "Cargando..." : `${total} resuldatos.`}
				</span>
				<div className="flex-row justify-end grow">
					<Form fielset="bg-white" onSubmit={handleSubmit(on_submit)}>
						<div className="flex-row justify-end grow">
							<InputForm name="search" register={register} placeholder="Buscar" />
							<Submit icon={faSearch} not_border bg_color="not" />
						</div>
					</Form>
				</div>
			</div>
			<div className="flex-column flex-center">
				<h4 className="text-grey-700">
					Para obtener los materiales, presentarse en biblioteca.
				</h4>
			</div>
			{paginate}
			{load ? (
				<Load />
			) : (
				<ListView>
					{books.map((book) => (
						<div
							key={`book-v-${book.id}`}
							className="flex-column bg-white box-shadow padding-10"
						>
							<Text h4 className="text-dark text-justify">
								{`${book.title_editor}`}
							</Text>
							<div className="flex-row justify-start">
								<Text text className="grow text-dark">
									{`Autor: ${book.author}`}
								</Text>
								<Text text className="grow text-dark">
									{`Código: ${book.code}`}
								</Text>
							</div>
						</div>
					))}
				</ListView>
			)}
			{paginate}
		</>
	);
};

export default LibraryView;
