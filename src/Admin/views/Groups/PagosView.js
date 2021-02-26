import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Text from "../../../components/Text";
import Load from "../../../components/Load";
import ListView from "../../../components/ListView";
import ErrorMessage from "../../../components/ErrorMessage";
import {
	getPagosAction,
	resetPagosAction,
} from "../../redux/actions/pagosActions";
import PagoBox from "./Pagos/PagoBox";

const PagosView = () => {
	const dispatch = useDispatch();
	const { course_group_id } = useParams();
	const students = useSelector((state) => state.admin.pagos.students);
	const pagos = useSelector((state) => state.admin.pagos.pagos);
	const get_errors = useSelector((state) => state.admin.pagos.get_errors);
	const get_load = useSelector((state) => state.admin.pagos.get_load);
	useEffect(() => {
		dispatch(getPagosAction(course_group_id));
		return () => dispatch(resetPagosAction());
	}, [dispatch, course_group_id]);
	return (
		<>
			{get_load && <Load />}
			{get_errors && <ErrorMessage msg={get_errors} />}
			{!get_load && (
				<>
					<Text
						h1
						className="text-dark text-center padding-10 bg-white"
					>
						Pagos
					</Text>
					<ListView>
						{students.map((s) => (
							<PagoBox
								key={`pgs-${s.id}-${s.student_pago_id}`}
								user={s}
								pagos={pagos.filter(
									(p) =>
										p.student_pago_id === s.student_pago_id
								)}
							/>
						))}
					</ListView>
				</>
			)}
		</>
	);
};

export default PagosView;
