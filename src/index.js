import "./global.scss";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./redux/store";
import { isLoginAction } from "./redux/actions/authActions";
import {getActiveRegisterAction} from './redux/actions/registerActions';

import Splash from "./Splash";

//import reportWebVitals from "./reportWebVitals";

window.axios = axios;
axios.defaults.withCredentials = true;
//window.base_url = "https://api.seminarioandinosanpablo.org.pe";
window.base_url = "http://localhost:8000";
axios.defaults.baseURL = window.base_url;
axios.defaults.headers.post["Content-Type"] = "application/json";

store.dispatch(isLoginAction());
store.dispatch(getActiveRegisterAction());
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<Splash />
			</ConnectedRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
