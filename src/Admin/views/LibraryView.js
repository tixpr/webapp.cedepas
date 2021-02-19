import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Load from "../../components/Load";
import {
	loadGetBooksAction,
	getBooksAction,
	setSearchBookAction,
} from "../redux/actions/libraryActions";
import ListView from "../../components/ListView";
import Button from "../../components/Button";
import InputForm from "../../components/InputForm";
import Form, { Submit } from "../../components/Form";
import Paginate from "../../components/Paginate";
import NewBookForm from "./Books/NewBookForm";
import { faBookmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import BookBox from "./Books/BookBox";
import ErrorMessage from "../../components/ErrorMessage";

const LibraryView = () => {
	const { register, handleSubmit } = useForm();
	const books = useSelector((state) => state.admin.library.books);
	const links = useSelector((state) => state.admin.library.links);
	const total = useSelector((state) => state.admin.library.total);
	const load = useSelector((state) => state.admin.library.is_load);
	const errors = useSelector((state) => state.admin.library.errors);
	const [view_new, setViewNew] = useState(false);
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
	}, [dispatch]);
	return (
		<>
			{errors && <ErrorMessage msg={errors} />}
			{view_new && (
				<NewBookForm
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
						icon={faBookmark}
						hidden={view_new}
						text="Nuevo"
						onClick={() => setViewNew(true)}
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
				<div className="grow flex-row justify-end">
					<h4 className="text-grey-700">
						Para obtener los materiales, presentarse en biblioteca.
					</h4>
				</div>
			</div>
			{paginate}
			{load ? (
				<Load />
			) : (
				<ListView>
					{books.map((book) => (
						<BookBox
							key={`book-${book.id}`}
							book={book}
						/>
					))}
				</ListView>
			)}
			{paginate}
		</>
	);
};

export default LibraryView;
