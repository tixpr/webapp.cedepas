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
import Student from "./Student";
import Teacher from "./Teacher";
//actions
import { getUiUserModeAction } from "./redux/actions/uiActions";

const App = () => {
	const lg = useMediaQuery({
		query: "(min-width: 768px)",
	});
	const mode = useSelector((state) => state.ui.mode);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUiUserModeAction());
	}, [dispatch]);
	switch (mode) {
		case "Administrador":
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
						<Drawer main_menu={admin_menu} />
						<main className="grow bg-grey-100 overflow-y">
							<Admin />
						</main>
					</div>
				</>
			);
		case "Estudiante":
			return (
				<>
					<Header />
					<main className="grow bg-grey-100 overflow-y">
						<Student />
					</main>
				</>
			);
		case "Docente":
			return (
				<>
					<Header />
					<main className="grow bg-grey-100 overflow-y">
						<Teacher />
					</main>
				</>
			);
		default:
			return <Loading />;
	}
};

export default App;
