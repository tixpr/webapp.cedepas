import {
	clear_get_books_type,
	set_search_book_type,
	load_get_books_type,
	get_books_type,
	get_books_error_type,
} from "../actions/libraryActions";

const init = {
	books: [],
	links: [],
	total: 0,
	search: "",
	is_load: true,
	errors: null,
};

const libraryReducer = (state = init, { type, payload }) => {
	switch (type) {
		case clear_get_books_type:
			return Object.assign(state, {
				books: [],
				links: [],
				total: 0,
				search: "",
				is_load: true,
				errors: null,
			});
		case set_search_book_type:
			return Object.assign(state, {
				search: payload,
			});
		case get_books_type:
			return Object.assign(state, {
				books: payload.data,
				total: payload.meta.total,
				links: payload.meta.links,
				errors: null,
				is_load: false,
			});
		case load_get_books_type:
			return Object.assign(state, {
				is_load: true,
				errors: null,
			});
		case get_books_error_type:
			return Object.assign(state, {
				books: [],
				total: 0,
				links: [],
				errors: payload,
				is_load: false,
			});
		default:
			return state;
	}
};

export default libraryReducer;
