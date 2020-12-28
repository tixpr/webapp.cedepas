import React, { useState } from "react";
import clsx from "clsx";
import EditUserform from "./EditUserForm";
import DeleteUserForm from "./DeleteUserForm";
import ActiveUserForm from "./ActiveUserForm";
import Button from "../../../components/Button";
import {
	faEdit,
	faTrash,
	faExclamationCircle,
	faCheck,
} from "@fortawesome/free-solid-svg-icons";

const UserBox = ({ user }) => {
	const { active, firstname, lastname } = user;
	const [mode, setMode] = useState("default");
	switch (mode) {
		case "edit":
			return (
				<EditUserform
					onSuccess={() => setMode("default")}
					onCancel={() => setMode("default")}
					user={user}
				/>
			);
		case "delete":
			return (
				<DeleteUserForm
					onSuccess={() => setMode("default")}
					onCancel={() => setMode("default")}
					user_id={user.id}
				/>
			);
		case "disabled":
			return (
				<ActiveUserForm
					onSuccess={() => setMode("default")}
					onCancel={() => setMode("default")}
					user={user}
				/>
			);
		case "view":
			return null;
		default:
			return (
				<div
					className={clsx(
						"flex-column justify-stretch bg-white",
						active && "bd-success",
						!active && "bd-warning"
					)}
				>
					<div className="flex-row align-center justify-stretch">
						<div className="flex-column grow">
							<Button
								text={`${firstname} ${lastname}`}
								not_border
								text_color={active ? "primary" : "warning"}
							/>
						</div>
						<Button
							icon={faEdit}
							not_border
							icon_size="1x"
							title="Editar usuario"
							onClick={() => setMode("edit")}
						/>
						<Button
							icon={faTrash}
							not_border
							icon_size="1x"
							text_color="danger"
							title="Eliminar usuario"
							onClick={() => setMode("delete")}
						/>
						<Button
							icon={active ? faExclamationCircle : faCheck}
							not_border
							icon_size="1x"
							text_color={active ? "warning" : "success"}
							title={`${
								active ? "Desabilitar " : "Habilitar "
							} usuario`}
							onClick={() => setMode("disabled")}
						/>
					</div>
				</div>
			);
	}
};
export default UserBox;
