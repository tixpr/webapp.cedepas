import React from "react";
import clsx from "clsx";
//compoenentes
import Drawer from "./components/Drawer";
import Header from "./components/Header";
//módulos
import Admin, { admin_menu } from "./Admin";
//import Student, {student_links} from './Student';
import { changeDrawerAction } from "./redux/actions/uiActions";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
	const drawer = useSelector((state) => state.ui.drawer);
	const dispatch = useDispatch();
	return (
		<>
			<Header />
			<section className="flex-row grow justify-start">
				<Drawer main_menu={admin_menu} />
				<main className="bg-grey-50">
					<div
						className={clsx("base", drawer && "view")}
						onClick={() => dispatch(changeDrawerAction())}
					></div>
					<Admin />
				</main>
			</section>
		</>
	);
};

export default App;
