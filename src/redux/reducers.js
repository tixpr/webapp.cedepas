import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './reducers/authReducer';
import drawer from './reducers/drawerReducer';

const createRootReducer = (history) => combineReducers({
	router: connectRouter(history),
	auth,
	drawer
});
export default createRootReducer;