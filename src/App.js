import React from "react";
//import { useDispatch, useSelector } from 'react-redux';
//compoenentes
import Header from "./components/Header";
//import Button from './components/Button';
//módulos
import Admin from './Admin';
//import Student from './Student';
//import Teacher from './Teacher';
//actions
//import { changeUserModeAction } from './redux/actions/uiActions';

const App = () => {
	/*
	const mode = useSelector(state=>state.ui.mode);
	const roles = useSelector(state=>state.auth.user.data.roles);
	const dispatch = useDispatch();
	let modulo=null;
	switch(mode){
		case null:
			if(roles.length===1){
				dispatch(changeUserModeAction(roles[0]))
			}
			return (
				<div className="flex-row grow wrap align-center justify-evenly bg-dark">
					{roles.map(r=><Button key={r} text={r} bg_color='not' text_color="warning" onClick={()=>{dispatch(changeUserModeAction(r))}}></Button>)}
				</div>
			);
		case 'Administrador':
			modulo = <Admin/>;break;
		case 'Estudiante':
			modulo=<Student/>;break;
		case 'Docente':
			modulo=<Teacher/>;break;
		default:
			break;
	}
	*/
	return (
		<>
			<Header />
			<Admin />
		</>
	);
};

export default App;
