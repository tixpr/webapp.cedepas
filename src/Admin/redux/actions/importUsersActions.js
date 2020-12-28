import axios from 'axios';

export const post_import_users_type = "IMPORT_USERS";
export const post_import_users_error_type = 'IMPORT_USERS_ERROR';
export const postImportUsersAction = (file, progressFunc) => {
	return (dispatch) => {
		let fd = new FormData();
		fd.append("import_users", file);
		axios.post("api/users/import", fd, {
			onUploadProgress: e=>{
				let p = Math.round((e.loaded * 100) / e.total);
				progressFunc&&progressFunc(p);
			},
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}).then(({data})=>{
			return dispatch({
				type: post_import_users_type,
				payload: data.message,
			});
		}).catch(({response, message})=>{
			if(response){
				if (response.status === 401) {
					window.location.reload();
				}
				return dispatch({
					type: post_import_users_error_type,
					payload: {
						data:response.data,
						status:response.status
					},
				});
			}
			return dispatch({
				type: post_import_users_error_type,
				payload: message,
			});
		});
	};
};

export const clear_import_users_type='CLEAR_IMPORT_USERS';
export const clearImportUsersAction = ()=>{
	return {
		type: clear_import_users_type
	};
};
