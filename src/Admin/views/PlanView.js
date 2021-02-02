import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListView from "../../components/ListView";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import AreaBox from "./Plan/AreaBox";
import AddAreaForm from "./Plan/AddAreaForm";
import Load from "../../components/Load";
import {
	clearGetAreasAction,
	getAreasAction,
} from "../redux/actions/areasActions";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Text from "../../components/Text";

const PlanView = () => {
	const dispatch = useDispatch();
	const [add, setAdd] = useState(false);
	const action_errors = useSelector(
		(state) => state.admin.areas.get_areas_errors
	);
	const areas = useSelector((state) => state.admin.areas.areas);
	const is_load = useSelector((state) => state.admin.areas.get_areas_load);
	const cancel = () => setAdd(false);
	useEffect(() => {
		dispatch(getAreasAction());
		return () => dispatch(clearGetAreasAction());
	}, [dispatch]);
	return (
		<div className="grow flex-column">
			{action_errors ? <ErrorMessage msg={action_errors} /> : null}
			{add && (
				<div className="container-lg">
					<AddAreaForm onSuccess={cancel} onCancel={cancel} />
				</div>
			)}
			<div className="flex-row">
				<Button
					bg_color="success"
					text_color="white"
					text="Agregar"
					icon={faPlus}
					hidden={add}
					onClick={() => setAdd(true)}
				/>
			</div>
			<Text h2 className="text-dark">
				<center>
					Areas
				</center>
			</Text>
			{is_load ? (
				<Load />
			) : (
				<ListView>
					{areas.map((area) => (
						<AreaBox key={`area-${area.id}`} area={area} />
					))}
				</ListView>
			)}
		</div>
	);
};

export default PlanView;
