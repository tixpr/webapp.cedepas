import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Load from "../../components/Load";
import {
	loadGetPagosAction,
	clearGetPagosAction,
	getPagosAction,
} from "../redux/actions/pagosActions";
import Button from "../../components/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PagoBox from "./PagoBox";
import AddPagoForm from "./AddPagoForm";

const PagosView = () => {
	const { course_group_id } = useParams();
	const dispatch = useDispatch();
	const [add, setAdd] = useState(false);
	const load = useSelector((state) => state.student.pagos.load);
	const action_errors = useSelector((state) => state.student.pagos.errors);
	const cost = useSelector((state) => state.student.pagos.cost);
	const pagos = useSelector((state) => state.student.pagos.pagos);
	let pagado = 0;
	if (pagos.length > 0) {
		pagos.forEach((p) => {
			if (p.approved) {
				pagado += p.mont;
			}
		});
	}
	useEffect(() => {
		dispatch(loadGetPagosAction());
		dispatch(getPagosAction(course_group_id));
		return () => dispatch(clearGetPagosAction());
	}, [dispatch, course_group_id]);
	return (
		<div className="flex-column grow">
			{load && <Load />}
			{action_errors && <ErrorMessage msg={action_errors} />}
			{!load && (
				<>
					<div className="flex-row">
						<Button
							bg_color="success"
							icon={faPlus}
							text="Agregar Pago"
							not_border
							text_color="white"
							hidden={add}
							onClick={() => setAdd(true)}
						/>
						{add && (
							<AddPagoForm
								onSucess={() => setAdd(false)}
								onCancel={() => setAdd(false)}
							/>
						)}
					</div>
					<div className="flex-row flex-center">
						<h1
							style={{
								borderRadius: "50%",
								padding: "30px 20px",
							}}
							className="text-primary bg-white text-center"
						>
							{`${pagado} / ${cost.toString()}`}
						</h1>
					</div>
					<div className="flex-row wrap justify-evenly">
						{pagos.map((p) => (
							<PagoBox key={`pago-stu-${p.id}`} pago={p} />
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default PagosView;
