import axios from 'axios';

export const load_post_course_type = 'LOAD_post_course';

export const loadPostCourseAction = ()=>{
	return {
		type: load_post_course_type
	};
};

export const clear_post_course_type='CLEAR_post_course';

export const clearPostCourseAction = ()=>{
	return {
		type: clear_post_course_type
	};
};

export const post_course_type = 'post_course';
export const post_course_error_type = 'post_course_ERROR';

export const postCourseAction = (data)=>{
	return dispatch=>{
		axios.post('api/courses',data)
		.then(({data})=>{
			return dispatch({
				type: post_course_type,
				payload: data.message
			});
		})
		.catch(({response,message})=>{
			if (response) {
				if (response.status === 401) {
					window.location.reload();
				}
				return dispatch({
					type: post_course_error_type,
					payload: {
						data: response.data,
						status: response.status,
					},
				});
			}
			return dispatch({
				type: post_course_error_type,
				payload: message,
			});
		});
	};
};