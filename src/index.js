import './styles/global.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './redux/store';
import {isLoginAction} from './redux/actions/authActions';

import Splash from './Splash';

import * as serviceWorker from './serviceWorker';

window.axios = axios;
axios.defaults.withCredentials = true;
axios.defaults.baseURL="http://localhost:8000";
axios.defaults.headers.post['Content-Type'] = 'application/json';

store.dispatch(isLoginAction());

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ConnectedRouter history={history} >
				<Splash />
			</ConnectedRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
