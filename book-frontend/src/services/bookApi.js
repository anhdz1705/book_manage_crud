import apiClient from "./apiClient";

export const getBooks = ({
  page = 1,
  pageSize = 20,
  title = "",
  author = "",
} = {}) =>
  apiClient.get("/books/", {
    params: {
      page,
      page_size: pageSize,
      title,
      author,
    },
  });

export const getBookDetail = (id) => apiClient.get(`/books/${id}/`);

export const addBook = (book) => apiClient.post("/books/", book);

export const updateBook = (id, book) => apiClient.put(`/books/${id}/`, book);

export const deleteBook = (id) => apiClient.delete(`/books/${id}/`);
