import React, { useState } from "react";
import Button from "../../components/Button";
import EditPresenceForm from "./EditPresenceForm";

const PresenceTD = ({ user_presence, presence_id }) => {
	const [edit, setEdit] = useState(false);
	const { presence, user_id } = user_presence;
	const click = (e) => {
		e.preventDefault();
		setEdit(true);
	};
	return (
		<td>
			{edit && (
				<EditPresenceForm
					presence={presence}
					presence_id={presence_id}
					user_id={user_id}
					onCancel={() => setEdit(false)}
					onSuccess={() => setEdit(false)}
				/>
			)}
			<center>
				<Button
					text={presence ? "A" : "F"}
					text_color={presence ? "primary" : "danger"}
					not_border
					center
					onClick={click}
				/>
			</center>
		</td>
	);
};

export default PresenceTD;
