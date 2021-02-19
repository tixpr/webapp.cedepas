import axios from "axios";
import err_fnc from "../../../components/err_fnc";

export const load_get_books_type = "ADMIN_LOAD_GET_BOOKS";
export const loadGetBooksAction = () => {
	return {
		type: load_get_books_type,
	};
};

export const get_books_type = "ADMIN_GET_BOOKS";
export const get_books_error_type = "ADMIN_GET_BOOKS_ERROR";

export const getBooksAction = (url = null) => {
	return (dispatch, getState) => {
		axios
			.get(url ? url : "/api/library", {
				params: { search: getState().admin.library.search },
			})
			.then(({ data }) => {
				dispatch({
					type: get_books_type,
					payload: data,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, get_books_error_type, response, message)
			);
	};
};
//
export const set_search_book_type = "ADMIN_SET_SEARCH_BOOK";
export const setSearchBookAction = (search) => {
	return {
		type: set_search_book_type,
		payload: search,
	};
};

//crear libro

export const load_post_book_type = "ADMIN_LOAD_POST_BOOK";
export const loadPostBookAction = () => {
	return {
		type: load_post_book_type,
	};
};
export const clear_post_book_type = "ADMIN_CLEAR_POST_BOOK";
export const clearPostBookAction = () => {
	return {
		type: clear_post_book_type,
	};
};

export const post_book_type = "ADMIN_POST_BOOK";
export const post_book_error_type = "ADMIN_POST_BOOK_ERROR";

export const postBookAction = (data) => {
	return (dispatch, getState) => {
		axios
			.post("/api/library", data)
			.then(({ data }) => {
				let books = getState().admin.library.books;
				let t = getState().admin.library.total;
				books.pop();
				return dispatch({
					type: post_book_type,
					payload: {
						data: [data.data].concat(books),
						total: ++t,
					},
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, post_book_error_type, response, message)
			);
	};
};
//editar libro

export const load_put_book_type = "ADMIN_LOAD_PUT_BOOK";
export const loadPutBookAction = () => {
	return {
		type: load_put_book_type,
	};
};
export const clear_put_book_type = "ADMIN_CLEAR_PUT_BOOK";
export const clearPutBookAction = () => {
	return {
		type: clear_put_book_type,
	};
};

export const put_book_type = "ADMIN_PUT_BOOK";
export const put_book_error_type = "ADMIN_PUT_BOOK_ERROR";

export const putBookAction = (data, book_id) => {
	return (dispatch, getState) => {
		axios
			.put(`/api/library/${book_id}`, data)
			.then(({ data }) => {
				let books = getState().admin.library.books;
				const i = books.findIndex((u) => u.id === book_id);
				let d = [].concat(books);
				d[i] = data.data;
				return dispatch({
					type: put_book_type,
					payload: d,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, put_book_error_type, response, message)
			);
	};
};

//eliminar libro
export const load_delete_book_type = "ADMIN_LOAD_DELETE_BOOK";
export const loadDeleteBookAction = () => {
	return {
		type: load_delete_book_type,
	};
};
export const clear_delete_book_type = "ADMIN_CLEAR_DELETE_BOOK";
export const clearDeleteBookAction = () => {
	return {
		type: clear_delete_book_type,
	};
};

export const delete_book_type = "ADMIN_DELETE_USER";
export const delete_book_error_type = "ADMIN_DELETE_BOOK_ERROR";

export const deleteBookAction = (book_id) => {
	return (dispatch, getState) => {
		axios
			.delete(`/api/library/${book_id}`)
			.then(() => {
				let books = getState().admin.library.books;
				let t = getState().admin.library.total;
				let nd = books.filter((e) => e.id !== book_id);
				return dispatch({
					type: delete_book_type,
					payload: {
						data: nd,
						total: --t,
					},
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, delete_book_error_type, response, message)
			);
	};
};
