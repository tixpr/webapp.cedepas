import React from "react";
import "./UserBox.scss";
import clsx from "clsx";
import Text from "./Text";
import ButtonLink from "./ButtonLink";
import {
	faEdit,
	faEye,
	faTrash,
	faExclamationCircle,
	faCheck
} from "@fortawesome/free-solid-svg-icons";

const UserBox = ({ user, url }) => {
	return (
		<div
			className={clsx(
				"flex-column justify-stretch user-box bg-white",
				user.active && "bd-success",
				!user.active && "bd-warning"
			)}
		>
			<div className="flex-row align-center justify-stretch">
				<Text text className="grow">{user.name}</Text>
				<ButtonLink
					to={`${url}/${user.id}`}
					icon={faEye}
					icon_size='1x'
					not_border
					title="Ver usuario"
				/>
				<ButtonLink
					to={`${url}/edit/${user.id}`}
					icon={faEdit}
					not_border
					icon_size='1x'
					title="Editar usuario"
				/>
				<ButtonLink
					to={`${url}/delete/${user.id}`}
					icon={faTrash}
					not_border
					icon_size='1x'
					text_color='danger'
					title="Eliminar usuario"
				/>
				<ButtonLink
					to={`${url}/${user.active?'disabled':'enabled'}/${user.id}`}
					icon={(user.active)?(faExclamationCircle):(faCheck)}
					not_border
					icon_size='1x'
					text_color={user.active?'warning':'success'}
					title={`${user.active?'Desabilitar ':'Habilitar '} usuario`}
				/>
			</div>
		</div>
	);
};

export default UserBox;
