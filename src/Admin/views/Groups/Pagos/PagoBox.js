import React, { useState } from "react";
import clsx from "clsx";
import MyBox from "./MyBox";
import {
	faChevronDown,
	faChevronUp,
	faEdit,
	faUserCheck,
	faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/Button";
import Text from "../../../../components/Text";
import EditStudentPagoForm from "./EditStudentPagoForm";
import ActiveUserForm from "./ActiveUserForm";

const PagoBox = ({ user, pagos }) => {
	const [show, setShow] = useState(false);
	const [edit, setEdit] = useState(false);
	const [toggle, setToggle] = useState(false);
	let pagado = 0;
	pagos.forEach((p) => {
		if (p.approved) {
			pagado += p.mont;
		}
	});
	if (edit) {
		return (
			<EditStudentPagoForm
				user={user}
				onSuccess={() => setEdit(false)}
				onCancel={() => setEdit(false)}
			/>
		);
	}
	if (toggle) {
		return (
			<ActiveUserForm
				user={user}
				onSuccess={() => setToggle(false)}
				onCancel={() => setToggle(false)}
			/>
		);
	}
	return (
		<div className="grow flex-column bg-white box-shadow">
			<div className="flex-row flex-center">
				<Button
					icon={faEdit}
					text_color="primary"
					bg_color="none"
					onClick={() => setEdit(true)}
				/>
				<Button
					icon={user.active ? faUserLock : faUserCheck}
					text_color={user.active ? "warning" : "success"}
					bg_color="none"
					onClick={() => setToggle(true)}
				/>
			</div>
			<div className="flex-row align-center">
				<Text
					h4
					className={clsx(
						"grow",
						user.active && "text-dark",
						!user.active && "text-warning"
					)}
				>{`${user.firstname} ${user.lastname}`}</Text>

				<Text h4>
					<span className="text-success">{pagado}</span>
					{" / "}
					<span className="text-primary">{user.cost}</span>
				</Text>
				<Button
					icon={show ? faChevronUp : faChevronDown}
					text_color="grey-600"
					bg_color="none"
					onClick={() => setShow(!show)}
					title="Ver pagos"
				/>
			</div>
			{show && (
				<div className="flex-column padding-10">
					{pagos.map((p) => (
						<MyBox
							key={`pg-${p.id}-us${user.student_pago_id}`}
							pago={p}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default PagoBox;
