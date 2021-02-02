import React, { useState } from "react";
import Button from "../../components/Button";
import EditNoteForm from "./EditNoteForm";

const NoteTD = ({ user_note, note_id }) => {
	const [edit, setEdit] = useState(false);
	const { note, user_id } = user_note;
	const click = (e) => {
		e.preventDefault();
		setEdit(true);
	};
	return (
		<td>
			{edit && (
				<EditNoteForm
					note={note}
					note_id={note_id}
					user_id={user_id}
					onCancel={() => setEdit(false)}
					onSuccess={() => setEdit(false)}
				/>
			)}
			<center>
				<Button
					text={note.toString()}
					text_color={note > 13 ? "primary" : "danger"}
					not_border
					center
					onClick={click}
				/>
			</center>
		</td>
	);
};

export default NoteTD;
