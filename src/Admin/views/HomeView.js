import React from "react";
import fondo from '../../images/san_pablo2.jpeg';

const HomeView = () => {
	return <div className='grow home-view' style={{
		backgroundImage: `url(${fondo})`,
	}} ></div>;
};

export default HomeView;
