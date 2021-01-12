import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "./Button";
import RadioGroupMenu from "./RadioGroupMenu";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { logoutAction, loadLogoutAction } from "../redux/actions/authActions";
import RadioForm from "./RadioForm";
import { changeUiUserModeAction } from "../redux/actions/uiActions";
import "./UserButton.scss";

const UserButton = () => {
	const user = useSelector((state) => state.auth.user);
	const ui_mode = useSelector((state) => state.ui.mode);
	const dispatch = useDispatch();
	const [is_open, setOpen] = useState(false);
	return (
		<div className="menu">
			<Button
				text={user.firstname}
				not_border
				bg_color="none"
				text_color="white"
				onClick={() => setOpen(!is_open)}
			/>
			{is_open ? (
				<div className="flex-column menu-items bg-white">
					<Button
						text={user.firstname}
						not_border
						bg_color="none"
						text_color="grey-700"
						onClick={() => setOpen(!is_open)}
					/>
					<hr />
					<RadioGroupMenu>
						{user.roles.map((role) => (
							<RadioForm
								key={`role-${role}`}
								text={role}
								name={"role"}
								value={role}
								checked={ui_mode === role}
								onChange={(m) =>
									dispatch(changeUiUserModeAction(m)) &&
									setOpen(false)
								}
							/>
						))}
					</RadioGroupMenu>
					<hr />
					<Button
						text="Salir"
						icon={faSignOutAlt}
						not_border
						bg_color="danger"
						text_color="white"
						onClick={() => {
							dispatch(loadLogoutAction());
							dispatch(logoutAction());
						}}
					/>
				</div>
			) : null}
		</div>
	);
};

export default UserButton;
