import React from "react";
import "./UserBox.scss";
import clsx from "clsx";
import Text from "./Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonLink from "./ButtonLink";
import {
	faUser,
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
				"flex-column align-stretch justify-stretch user-box",
				user.active && "bd-success",
				!user.active && "bd-warning"
			)}
		>
			<div className="flex-row align-stretch justify-stretch">
				<div className="flex-column align-center justify-center user-avatar">
					{user.avatar ? (
						<img
							className="img-responsive"
							alt="Avatar"
							src={user.avatar}
						/>
					) : (
						<FontAwesomeIcon icon={faUser} size="5x" />
					)}
				</div>
				<div className="flex-row grow wrap align-end justify-start">
					<Text h4>{user.name}</Text>
					<Text text>{user.phone || "celular no especificado"}</Text>
					<Text text>{user.email}</Text>
				</div>
			</div>
			<div className="flex-row wrap align-center justify-evenly user-actions">
				<ButtonLink
					to={`${url}/user/${user.id}`}
					icon={faEye}
					text="Ver"
					not_border
					title="ver usuario"
				/>
				<ButtonLink
					to={`${url}/user_edit/${user.id}`}
					icon={faEdit}
					text="Editar"
					not_border
					title="editar usuario"
				/>
				<ButtonLink
					to={`${url}/user_delete/${user.id}`}
					icon={faTrash}
					not_border
					text="eliminar"
					text_color='danger'
					title="eliminar usuario"
				/>
				<ButtonLink
					to={`${url}/user_disabled/${user.id}`}
					icon={(user.active)?(faExclamationCircle):(faCheck)}
					text={(user.active)?('Inhabilitar'):('Habilitar')}
					not_border
					text_color={user.active?'warning':'success'}
					title="desabilitar usuario"
				/>
			</div>
		</div>
	);
};

export default UserBox;
