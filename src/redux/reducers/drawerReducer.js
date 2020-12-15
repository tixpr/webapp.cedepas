import {change_drawer_type} from '../actions/drawerActions';

const initial = true;

const drawerReducer = (state=initial,{type,payload})=>{
	switch(type){
		case change_drawer_type:
			let d =! state;
			return d;
		default: return state;
	}
}
export default drawerReducer;