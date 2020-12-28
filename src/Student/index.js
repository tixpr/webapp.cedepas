import React from "react";
import {
	Switch,
	Route,
	useRouteMatch
} from 'react-router-dom';
//vistas
import HomeView from './views/HomeView';
import NotView from "../views/NotView";

const Student = () => {
	const {url} = useRouteMatch();
	return (
		<main className="flex-column grow bg-grey-50 overflow-y">
			<Switch>
				<Route exact path={url} component={HomeView}/>
				<Route path="*" component={NotView} />
			</Switch>
		</main>
	);
};

export default Student;
