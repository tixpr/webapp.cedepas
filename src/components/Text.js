import React from "react";
import './Text.scss';

const Text = ({
	children,
	className='',
	h1 = false,
	h2 = false,
	h3 = false,
	h4 = false,
	h5 = false,
	h6 = false,
	p = false,
	primary = false,
	title = false,
	text=false,
	sub_text=false
}) => {
	if (h1) {
		return <h1 className={`text ${className}`} >{children}</h1>;
	}
	if(h2){
		return <h2 className={`text ${className}`} >{children}</h2>;
	}
	if(h3){
		return <h3 className={`text ${className}`} >{children}</h3>;
	}
	if(h4){
		return <h4 className={`text ${className}`} >{children}</h4>;
	}
	if(h5){
		return <h5 className={`text ${className}`} >{children}</h5>;
	}
	if(h6){
		return <h6 className={`text ${className}`} >{children}</h6>;
	}
	if(p){
		return <p className={`text ${className}`} >{children}</p>;
	}
	if(primary){
		return <span className={`text primary ${className}`} >{children}</span>;
	}
	if(title){
		return <span className={`text title ${className}`} >{children}</span>
	}
	if(text){
		return <span className={`text normal ${className}`} >{children}</span>
	}
	if(sub_text){
		return <span className={`text sub-text ${className}`}>{children}</span>
	}
};

export default Text;
