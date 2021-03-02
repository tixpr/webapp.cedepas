import React, { useState } from "react";
import clsx from "clsx";
import EditUserForm from "./EditUserForm";
import DeleteUserForm from "./DeleteUserForm";
import ActiveUserForm from "./ActiveUserForm";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import {
	faEdit,
	faTrash,
	faExclamationCircle,
	faCheck,
	faIdBadge,
} from "@fortawesome/free-solid-svg-icons";

const UserBox = ({ user }) => {
	const { id, active, firstname, lastname } = user;
	const [edit, setEdit] = useState(false);
	const [trash, setTrash] = useState(false);
	const [enabled, setEnabled] = useState(false);
	if (edit) {
		return (
			<EditUserForm
				onSuccess={() => setEdit(false)}
				onCancel={() => setEdit(false)}
				user={user}
			/>
		);
	}
	if (trash) {
		return (
			<DeleteUserForm
				onSuccess={() => setTrash(false)}
				onCancel={() => setTrash(false)}
				user_id={user.id}
			/>
		);
	}
	if (enabled) {
		return (
			<ActiveUserForm
				onSuccess={() => setEnabled(false)}
				onCancel={() => setEnabled(false)}
				user={user}
			/>
		);
	}
	return (
		<div
			className={clsx(
				"flex-column justify-stretch bg-white box-shadow",
				active && "bd-success",
				!active && "bd-warning"
			)}
		>
			<div className="flex-row align-center justify-stretch">
				<Text
					h4
					className={clsx(
						active && "text-grey-700",
						!active && "text-warning",
						"grow"
					)}
				>
					{`${firstname} ${lastname}`}
				</Text>
				{id === 1 ? null : (
					<>
						<Button
							icon={faIdBadge}
							not_border
							icon_size="1x"
							title="Reporte de usuario"
							onClick={() =>
								window.open(
									`http://localhost:8000/api/certificado/${user.id}`,
									"_blank"
								)
							}
						/>
						<Button
							icon={faEdit}
							not_border
							icon_size="1x"
							title="Editar usuario"
							onClick={() => setEdit(true)}
						/>
						<Button
							icon={faTrash}
							not_border
							icon_size="1x"
							text_color="danger"
							title="Eliminar usuario"
							onClick={() => setTrash(true)}
						/>
						<Button
							icon={active ? faExclamationCircle : faCheck}
							not_border
							icon_size="1x"
							text_color={active ? "warning" : "success"}
							title={`${
								active ? "Desabilitar " : "Habilitar "
							} usuario`}
							onClick={() => setEnabled(true)}
						/>
					</>
				)}
			</div>
		</div>
	);
};
export default UserBox;
