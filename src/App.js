import React, {Fragment} from 'react';
//compoenentes
import Drawer from './components/Drawer';
import Header from './components/Header';
//módulos
import Administrator, {administrator_menu} from './AdminModule';
//import Student, {student_links} from './Student';

const App = () => {
	return (
		<Fragment>
			<Drawer main_menu={administrator_menu} />
			<section>
				<Header />
				<main>
					<Administrator />
				</main>
			</section>
		</Fragment>
	);
}

export default App;
