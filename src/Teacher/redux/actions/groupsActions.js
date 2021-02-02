import axios from 'axios';

export const reset_get_groups_type = 'teacher_reset_get_groups';
export const resetGetGroupsAction = ()=>{
	return {
		type:reset_get_groups_type,
	};
};

export const get_groups_type = 'teacher_get_groups';
export const get_groups_error_type = 'teacher_get_groups_error';
export const getGroupsAction=()=>{
	return dispatch=>{
		axios.get('api/teacher/groups')
		.then(({data})=>{
			return dispatch({
				type:get_groups_type,
				payload: data.data
			});
		})
		.catch(({response,message})=>{
			if (response) {
				if (response.status === 401) {
					window.location.reload();
				}
				return dispatch({
					type: get_groups_error_type,
					payload: {
						data: response.data,
						status: response.status,
					},
				});
			}
			return dispatch({
				type: get_groups_error_type,
				payload: message,
			});
		});
	};
}; 
