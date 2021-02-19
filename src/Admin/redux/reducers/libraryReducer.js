import {
	load_get_books_type,
	get_books_type,
	get_books_error_type,
	post_book_type,
	post_book_error_type,
	load_post_book_type,
	clear_post_book_type,
	load_put_book_type,
	clear_put_book_type,
	put_book_type,
	put_book_error_type,
	load_delete_book_type,
	clear_delete_book_type,
	delete_book_type,
	delete_book_error_type,
	set_search_book_type,
} from "../actions/libraryActions";

const initial = {
	books: [],
	links: [],
	total: 0,
	search: "",
	is_load: true,
	errors: null,
	post_book_errors: null,
	post_book_load: false,
	post_book_success: false,
	put_book_errors: null,
	put_book_load: false,
	put_book_success: false,
	delete_book_errors: null,
	delete_book_load: false,
	delete_book_success: false,
};

const usersReducer = (state = initial, { type, payload }) => {
	switch (type) {
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
		case post_book_type:
			return Object.assign(state, {
				books: payload.data,
				total: payload.total,
				post_book_success: true,
				post_book_load: false,
				post_book_error: null,
			});
		case post_book_error_type:
			return Object.assign(state, {
				post_book_errors: payload,
				post_book_load: false,
				post_book_success: false,
			});
		case load_post_book_type:
			return Object.assign(state, {
				post_book_load: true,
				post_book_error: null,
				post_book_success: false,
			});
		case clear_post_book_type:
			return Object.assign(state, {
				post_book_load: false,
				post_book_errors: null,
				post_book_success: false,
			});
		case clear_put_book_type:
			return Object.assign(state, {
				put_book_errors: null,
				put_book_load: false,
				put_book_success: false,
			});
		case load_put_book_type:
			return Object.assign(state, {
				put_book_errors: null,
				put_book_load: true,
				put_book_success: false,
			});
		case put_book_type:
			return Object.assign(state, {
				books: payload,
				put_book_errors: null,
				put_book_load: false,
				put_book_success: true,
			});
		case put_book_error_type:
			return Object.assign(state, {
				put_book_errors: payload,
				put_book_load: false,
				put_book_success: false,
			});
		case clear_delete_book_type:
			return Object.assign(state, {
				delete_book_errors: null,
				delete_book_load: false,
				delete_book_success: false,
			});
		case load_delete_book_type:
			return Object.assign(state, {
				delete_book_errors: null,
				delete_book_load: true,
				delete_book_success: false,
			});
		case delete_book_type:
			return Object.assign(state, {
				books: payload.data,
				total: payload.total,
				delete_book_errors: null,
				delete_book_load: false,
				delete_book_success: true,
			});
		case delete_book_error_type:
			return Object.assign(state, {
				delete_book_errors: payload,
				delete_book_load: false,
				delete_book_success: false,
			});
		default:
			return state;
	}
};
export default usersReducer;
