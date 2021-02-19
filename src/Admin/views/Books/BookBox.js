import React, { useState } from "react";
import EditBookForm from "./EditBookForm";
import DeleteBookForm from "./DeleteBookForm";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const BookBox = ({ book }) => {
	const { code, author, title_editor } = book;
	const [edit, setEdit] = useState(false);
	const [trash, setTrash] = useState(false);
	if (edit) {
		return (
			<EditBookForm
				onSuccess={() => setEdit(false)}
				onCancel={() => setEdit(false)}
				book={book}
			/>
		);
	}
	if (trash) {
		return (
			<DeleteBookForm
				onSuccess={() => setTrash(false)}
				onCancel={() => setTrash(false)}
				book_id={book.id}
			/>
		);
	}
	return (
		<div className="flex-column justify-stretch bg-white box-shadow">
			<div className="flex-row justify-end align-center">
				<Button
					icon={faEdit}
					not_border
					icon_size="1x"
					title="Editar libro"
					onClick={() => setEdit(true)}
				/>
				<Button
					icon={faTrash}
					not_border
					icon_size="1x"
					text_color="danger"
					title="Eliminar libro"
					onClick={() => setTrash(true)}
				/>
			</div>
			<div className="flex-column">
				<Text h4 className="text-dark text-justify">
					{`${title_editor}`}
				</Text>
				<div className="flex-row justify-evenly">
					<Text text className="text-dark">
						{`Autor: ${author}`}
					</Text>
					<Text text className="text-dark">
						{`Código: ${code}`}
					</Text>
				</div>
			</div>
		</div>
	);
};
export default BookBox;
