import axios from "axios";
import err_fnc from "../../components/err_fnc";

export const load_get_books_type = "load_get_books";
export const loadGetBooksAction = () => {
	return {
		type: load_get_books_type,
	};
};

export const clear_get_books_type = "clear_get_books";
export const clearGetBooksAction = () => {
	return {
		type: clear_get_books_type,
	};
};

export const get_books_type = "get_books";
export const get_books_error_type = "get_books_error";
export const getBooksAction = (url = null) => {
	return (dispatch, getState) => {
		axios
			.get(url ? url : "/api/academic/library", {
				params: { search: getState().library.search },
			})
			.then(({ data }) => {
				return dispatch({
					type: get_books_type,
					payload: data,
				});
			})
			.catch(({ response, message }) =>
				err_fnc(dispatch, get_books_error_type, response, message)
			);
	};
};

export const set_search_book_type = "SET_SEARCH_BOOK";
export const setSearchBookAction = (search) => {
	return {
		type: set_search_book_type,
		payload: search,
	};
};
