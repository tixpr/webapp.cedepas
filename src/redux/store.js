import { createHashHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";
import thunk from "redux-thunk";

export const history = createHashHistory();

const store = createStore(
	createRootReducer(history),
	compose(
		applyMiddleware(
			routerMiddleware(history), // for dispatching history actions
			thunk
		)
	)
);

export default store;
