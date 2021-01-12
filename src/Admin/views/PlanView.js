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

const PlanView = () => {
	const dispatch = useDispatch();
	const [add, setAdd] = useState(false);
	const action_success = useSelector(
		(state) => state.admin.areas.get_areas_success
	);
	const action_errors = useSelector(
		(state) => state.admin.areas.get_areas_errors
	);
	const areas = useSelector((state) => state.admin.areas.areas);
	const is_load = useSelector((state) => state.admin.areas.get_areas_load);
	const cancel = () => setAdd(false);
	useEffect(() => {
		dispatch(getAreasAction());
	}, [dispatch]);
	if (action_success) {
		dispatch(clearGetAreasAction());
	}
	return (
		<div className="grow flex-column">
			{action_errors ? <ErrorMessage msg={action_errors} /> : null}
			{add ? (
				<div className="container-lg">
					<AddAreaForm onSuccess={cancel} onCancel={cancel} />
				</div>
			) : (
				<div className="flex-row">
					<Button
						bg_color="success"
						text_color="white"
						text="Area"
						icon={faPlus}
						onClick={() => setAdd(true)}
					/>
				</div>
			)}
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
