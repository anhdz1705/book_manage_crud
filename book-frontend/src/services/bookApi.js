import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/books/";

export const getBooks = (page = 1, pageSize = 20, title = "", author = "") => {
    return axios.get(API_URL, {
        params: {
            page,
            page_size: pageSize,
            title,
            author,
        },
    });
};

export const getBookDetail = (id) => {
    return axios.get(`${API_URL}${id}/`);
};

export const addBook = (book) => {
    return axios.post(API_URL, book);
};

export const updateBook = (id, book) => {
    return axios.put(`${API_URL}${id}/`, book);
};

export const deleteBook = (id) => {
    return axios.delete(`${API_URL}${id}/`);
};