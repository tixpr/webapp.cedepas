import axios from "axios";

export const reset_course_group_type = "teacher_clear_course_group";
export const resetCourseGroupAction = () => {
	return {
		type: reset_course_group_type,
	};
};

export const get_course_group_type = "teacher_get_course_group";
export const get_course_group_error_type = "teacher_get_course_group_error";
export const getCourseGroupAction = (course_group_id) => {
	return (dispatch) => {
		axios
			.get(`api/teacher/course_group/${course_group_id}`)
			.then(({ data }) => {
				return dispatch({
					type: get_course_group_type,
					payload: data.data,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: get_course_group_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: get_course_group_error_type,
					payload: message,
				});
			});
	};
};
//Editar nota
export const load_put_user_note_type = "teacher_load_put_user_note";
export const loadPutUserNoteAction = () => {
	return {
		type: load_put_user_note_type,
	};
};

export const reset_put_user_note_type = "teacher_reset_put_user_note";
export const resetPutUserNoteAction = () => {
	return {
		type: reset_put_user_note_type,
	};
};

export const put_user_note_type = "teacher_put_user_note";
export const put_user_note_error_type = "teacher_put_user_note_error";
export const putUserNoteAction = (user_id, note_id, d) => {
	return (dispatch, getState) => {
		axios
			.put(`api/teacher/note/${note_id}/${user_id}`, d)
			.then(({ data }) => {
				const notes = getState().teacher.course.notes;
				const ns_i = notes.findIndex((n) => n.id === note_id);
				const s_i = notes[ns_i].notes.findIndex(
					(n) => n.user_id === user_id
				);
				let new_note_notes = [].concat(notes[ns_i].notes);
				new_note_notes[s_i] = data.data;
				const ns = Object.assign(notes[ns_i], {
					notes: new_note_notes,
				});
				let temp = [].concat(notes);
				temp[ns_i] = ns;
				return dispatch({
					type: put_user_note_type,
					payload: temp,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: put_user_note_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: put_user_note_error_type,
					payload: message,
				});
			});
	};
};
//editar asistencia
export const load_put_user_presence_type = "teacher_load_put_user_presence";
export const loadPutUserPresenceAction = () => {
	return {
		type: load_put_user_presence_type,
	};
};

export const reset_put_user_presence_type = "teacher_reset_put_user_presence";
export const resetPutUserPresenceAction = () => {
	return {
		type: reset_put_user_presence_type,
	};
};

export const put_user_presence_type = "teacher_put_user_presence";
export const put_user_presence_error_type = "teacher_put_user_presence_error";
export const putUserPresenceAction = (user_id, presence_id, d) => {
	return (dispatch, getState) => {
		axios
			.put(`api/teacher/presence/${presence_id}/${user_id}`, d)
			.then(({ data }) => {
				const presences = getState().teacher.course.presences;
				const ns_i = presences.findIndex((p) => p.id === presence_id);
				const s_i = presences[ns_i].presences.findIndex(
					(p) => p.user_id === user_id
				);
				let new_presence_presences = [].concat(
					presences[ns_i].presences
				);
				new_presence_presences[s_i] = data.data;
				const ns = Object.assign(presences[ns_i], {
					presences: new_presence_presences,
				});
				let temp = [].concat(presences);
				temp[ns_i] = ns;
				return dispatch({
					type: put_user_presence_type,
					payload: temp,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: put_user_presence_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: put_user_presence_error_type,
					payload: message,
				});
			});
	};
};
//eliminar nota
export const load_delete_note_type = "teacher_load_delete_note";
export const loadDeleteNoteAction = () => {
	return {
		type: load_delete_note_type,
	};
};

export const reset_delete_note_type = "teacher_reset_delete_note";
export const resetDeleteNoteAction = () => {
	return {
		type: reset_delete_note_type,
	};
};

export const delete_note_type = "teacher_delete_note";
export const delete_note_error_type = "teacher_delete_note_error";
export const deleteNoteAction = (note_id) => {
	return (dispatch, getState) => {
		axios
			.delete(`api/teacher/note/${note_id}`)
			.then(() => {
				const notes = getState().teacher.course.notes;
				let new_notes = notes.filter((n) => n.id !== note_id);
				return dispatch({
					type: delete_note_type,
					payload: new_notes,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: delete_note_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: delete_note_error_type,
					payload: message,
				});
			});
	};
};
//eliminar asistencia
export const load_delete_presence_type = "teacher_load_delete_presence";
export const loadDeletePresenceAction = () => {
	return {
		type: load_delete_presence_type,
	};
};

export const reset_delete_presence_type = "teacher_reset_delete_presence";
export const resetDeletePresenceAction = () => {
	return {
		type: reset_delete_presence_type,
	};
};

export const delete_presence_type = "teacher_delete_presence";
export const delete_presence_error_type = "teacher_delete_presence_error";
export const deletePresenceAction = (presence_id) => {
	return (dispatch, getState) => {
		axios
			.delete(`api/teacher/presence/${presence_id}`)
			.then(() => {
				const presences = getState().teacher.course.presences;
				let new_presences = presences.filter(
					(n) => n.id !== presence_id
				);
				return dispatch({
					type: delete_presence_type,
					payload: new_presences,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: delete_presence_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: delete_presence_error_type,
					payload: message,
				});
			});
	};
};

//agregar nota

export const load_post_note_type = "teacher_load_post_note";
export const loadPostNoteAction = () => {
	return {
		type: load_post_note_type,
	};
};

export const reset_post_note_type = "teacher_reset_post_note";
export const resetPostNoteAction = () => {
	return {
		type: reset_post_note_type,
	};
};

export const post_note_type = "teacher_post_note";
export const post_note_error_type = "teacher_post_note_error";
export const postNoteAction = (course_group_id, d) => {
	return (dispatch, getState) => {
		axios
			.post(`api/teacher/course_group/${course_group_id}/note`, d)
			.then(({ data }) => {
				let n_notes = [].concat(getState().teacher.course.notes);
				n_notes.push(data.data);
				return dispatch({
					type: post_note_type,
					payload: n_notes,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: post_note_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: post_note_error_type,
					payload: message,
				});
			});
	};
};

//agregar asistencia

export const load_post_presence_type = "teacher_load_post_presence";
export const loadPostPresenceAction = () => {
	return {
		type: load_post_presence_type,
	};
};

export const reset_post_presence_type = "teacher_reset_post_presence";
export const resetPostPresenceAction = () => {
	return {
		type: reset_post_presence_type,
	};
};

export const post_presence_type = "teacher_post_presence";
export const post_presence_error_type = "teacher_post_presence_error";
export const postPresenceAction = (course_group_id, d) => {
	return (dispatch, getState) => {
		axios
			.post(`api/teacher/course_group/${course_group_id}/presence`, d)
			.then(({ data }) => {
				let n_presences = [].concat(getState().teacher.course.presences);
				n_presences.push(data.data);
				return dispatch({
					type: post_presence_type,
					payload: n_presences,
				});
			})
			.catch(({ response, message }) => {
				if (response) {
					if (response.status === 401) {
						window.location.reload();
					}
					return dispatch({
						type: post_presence_error_type,
						payload: {
							data: response.data,
							status: response.status,
						},
					});
				}
				return dispatch({
					type: post_presence_error_type,
					payload: message,
				});
			});
	};
};
