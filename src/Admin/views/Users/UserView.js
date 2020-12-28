import React from 'react';
import {useParams} from 'react-router-dom';
import Text from '../../../components/Text';
import Back from '../../../components/Back';

const UserView = ()=>{
	const {user_id} = useParams();
	console.info('user_id=>',user_id);
	return (
		<div className="container-lg">
			<div className="flex-column justify-stretch bg-white">
				<div className="flex-row align-start wrap justify-stretch">
					<div className="flex-row align-center justify-center">
						Imagen
					</div>
					<div className="flex-column grow justify-stretch">
						<Text h2>
							Nombres y Apellidos: asfasdsadsad
						</Text>
						<Text text>
							Correo electronico: fagds@adfsa.dsad
						</Text>
						<Text text>
							Celular: 9325324324
						</Text>
						<div className="flex-row">
							<Text text className="text-warning">
								Estudiante
							</Text>
							<Text text className="text-success">
								Docente
							</Text>
							<Text text className="text-purple">
								Administrador
							</Text>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserView;