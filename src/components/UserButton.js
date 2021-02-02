import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "./Button";
import RadioGroupMenu from "./RadioGroupMenu";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { logoutAction, loadLogoutAction } from "../redux/actions/authActions";
import RadioForm from "./RadioForm";
import { changeUiUserModeAction } from "../redux/actions/uiActions";
import "./UserButton.scss";
import { useHistory } from "react-router-dom";

const UserButton = () => {
	const h = useHistory();
	const user = useSelector((state) => state.auth.user);
	const ui_mode = useSelector((state) => state.ui.mode);
	const dispatch = useDispatch();
	const [is_open, setOpen] = useState(false);
	return (
		<div className="menu">
			<Button
				icon={faUser}
				not_border
				bg_color="none"
				text_color="white"
				onClick={() => setOpen(!is_open)}
			/>
			{is_open ? (
				<div className="flex-column menu-items bg-white">
					<RadioGroupMenu>
						{user.roles.map((role) => (
							<RadioForm
								key={`role-${role}`}
								text={role}
								name={"role"}
								value={role}
								checked={ui_mode === role}
								onChange={(m) => {
									dispatch(changeUiUserModeAction(m));
									setOpen(false);
									h.entries = [];
									h.index = -1;
									h.push(`/`);
								}}
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
							setOpen(false);
							h.entries = [];
							h.index = -1;
							h.push(`/`);
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
