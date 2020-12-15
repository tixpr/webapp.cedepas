import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import './Input.scss';

export default function Input({ name = Math.random(), label = 'texto', type = 'text', register=null, required=false, pattern=null, error=null, inline=false, ...others }) {
	console.info('render input');
	const [msg, setMsg] = useState('');
	useEffect(()=>{
		if(error){
			switch(error.type){
				case 'required':
					setMsg(`Campo obligatorio`);break;
				case 'type':
					setMsg(`Tipo incorrecto`);break;
				case 'pattern':
					setMsg(`Valor invalido`);break;
				case 'maxLength':
				case 'max':
					setMsg(`Mayor el máximo`);break;
				case 'minLength':
				case 'min':
					setMsg(`Menor al mínimo`);break;
				case 'validate':
					setMsg(`Valor incorrecto`);break;
				default:
					setMsg('');break;
			}
		}
	},[error]);
	return (
		<div className={clsx(!inline && 'flex-column-reverse', inline && 'flex-row','input-group', error && 'error')}>
			{error&&<span>{msg}</span>}
			<input ref={register({required,pattern})} id={name} name={name} type={type} {...others}/>
			<label htmlFor={name}>
				{`${label}:`}
			</label>
		</div>
	);
};
