import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/Loading";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
//compoenentes
import Header from "./components/Header";
import Drawer from "./components/Drawer";
//import Button from './components/Button';
//módulos
import Admin, { admin_menu } from "./Admin";
import Student, { student_menu } from "./Student";
import Teacher, { teacher_menu } from "./Teacher";
//actions
import { getUiUserModeAction } from "./redux/actions/uiActions";

const Ui = ({ menu, component: Component }) => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	return (
		<>
			<Header />
			<div
				className={clsx(
					!lg && "flex-column-reverse",
					lg && "flex-row",
					"grow justify-start overflow-hidden"
				)}
			>
				<Drawer main_menu={menu} />
				<main className="grow bg-grey-100 overflow-y">
					<Component />
				</main>
			</div>
		</>
	);
};

const App = () => {
	const mode = useSelector((state) => state.ui.mode);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUiUserModeAction());
	}, [dispatch]);
	switch (mode) {
		case "Administrador":
			return <Ui menu={admin_menu} component={Admin} />;
		case "Estudiante":
			return <Ui menu={student_menu} component={Student} />;
		case "Docente":
			return <Ui menu={teacher_menu} component={Teacher} />;
		default:
			return <Loading />;
	}
};

export default App;
