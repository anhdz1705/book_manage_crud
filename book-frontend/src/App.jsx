import { useEffect, useState } from "react";
import {
  getBooks,
  getBookDetail,
  addBook,
  updateBook,
  deleteBook,
} from "./services/bookApi";
import "./App.css";

const emptyBookForm = {
  title: "",
  author: "",
  price: "",
  quantity: "",
};

function App() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  const [filter, setFilter] = useState({
    title: "",
    author: "",
  });
  const [activeFilter, setActiveFilter] = useState({
    title: "",
    author: "",
  });
  const [refreshKey, setRefreshKey] = useState(0);

  const [form, setForm] = useState({ ...emptyBookForm });
  const [editForm, setEditForm] = useState({ ...emptyBookForm });

  const [editingId, setEditingId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const formatNumber = (value) => {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return value;
    }

    return new Intl.NumberFormat("vi-VN").format(numericValue);
  };

  useEffect(() => {
    let isCurrent = true;

    getBooks(page, pageSize, activeFilter.title, activeFilter.author).then((res) => {
      if (!isCurrent) {
        return;
      }

      setBooks(res.data.results || []);
      setNext(res.data.next);
      setPrevious(res.data.previous);
    });

    return () => {
      isCurrent = false;
    };
  }, [page, pageSize, activeFilter.title, activeFilter.author, refreshKey]);

  const refreshBooks = () => {
    setRefreshKey((currentKey) => currentKey + 1);
  };

  const handleSearch = () => {
    setPage(1);
    setActiveFilter({ ...filter });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    const bookData = {
      title: form.title,
      author: form.author,
      price: Number(form.price),
      quantity: Number(form.quantity),
    };

    await addBook(bookData);

    setForm({ ...emptyBookForm });
    refreshBooks();
  };

  const handleDetail = async (id) => {
    setDetail(null);
    setActiveModal("detail");

    const res = await getBookDetail(id);
    setDetail(res.data);
  };

  const handleEdit = (book) => {
    setEditingId(book.id);
    setEditForm({
      title: book.title,
      author: book.author,
      price: book.price,
      quantity: book.quantity,
    });
    setActiveModal("edit");
  };

  const closeModal = () => {
    setActiveModal(null);
    setDetail(null);
    setEditingId(null);
    setEditForm({ ...emptyBookForm });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editingId) {
      return;
    }

    await updateBook(editingId, {
      title: editForm.title,
      author: editForm.author,
      price: Number(editForm.price),
      quantity: Number(editForm.quantity),
    });

    closeModal();
    refreshBooks();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa sách này không?");
    if (!confirmDelete) return;

    await deleteBook(id);
    refreshBooks();
  };

  return (
    <div className="container">
      <header className="page-header">
        <h1>Book Management</h1>
      </header>

      <section className="box">
        <h2>Filter</h2>

        <div className="filter-controls">
          <input
            type="text"
            placeholder="Search title"
            value={filter.title}
            onChange={(e) =>
              setFilter({ ...filter, title: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Search author"
            value={filter.author}
            onChange={(e) =>
              setFilter({ ...filter, author: e.target.value })
            }
          />

          <button className="primary-button" onClick={handleSearch}>
            Search
          </button>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value="20">20 records</option>
            <option value="100">100 records</option>
          </select>
        </div>
      </section>

      <section className="box">
        <h2>Add Book</h2>

        <form className="book-form" onSubmit={handleAddBook}>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Author"
            value={form.author}
            onChange={(e) =>
              setForm({ ...form, author: e.target.value })
            }
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
            required
          />

          <button className="primary-button" type="submit">
            Add Book
          </button>
        </form>
      </section>

      <div className="table-card">
        <table className="book-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th className="number-cell">Price</th>
              <th className="number-cell">Quantity</th>
              <th className="action-heading">Action</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td className="number-cell">{formatNumber(book.price)}</td>
                <td className="number-cell">{formatNumber(book.quantity)}</td>
                <td className="action-cell">
                  <button
                    className="action-button action-detail"
                    onClick={() => handleDetail(book.id)}
                  >
                    Detail
                  </button>

                  <button
                    className="action-button action-edit"
                    onClick={() => handleEdit(book)}
                  >
                    Edit
                  </button>

                  <button
                    className="action-button action-delete"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          className="secondary-button"
          disabled={!previous}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span>Page {page}</span>

        <button
          className="secondary-button"
          disabled={!next}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {activeModal && (
        <div className="modal-backdrop" onMouseDown={closeModal}>
          <section
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 id="modal-title">
                {activeModal === "detail" ? "Book Detail" : "Edit Book"}
              </h2>
              <button
                className="modal-close"
                type="button"
                aria-label="Close"
                onClick={closeModal}
              >
                X
              </button>
            </div>

            {activeModal === "detail" && (
              detail ? (
                <dl className="detail-list">
                  <div className="detail-row">
                    <dt>Title</dt>
                    <dd>{detail.title}</dd>
                  </div>
                  <div className="detail-row">
                    <dt>Author</dt>
                    <dd>{detail.author}</dd>
                  </div>
                  <div className="detail-row">
                    <dt>Price</dt>
                    <dd>{formatNumber(detail.price)}</dd>
                  </div>
                  <div className="detail-row">
                    <dt>Quantity</dt>
                    <dd>{formatNumber(detail.quantity)}</dd>
                  </div>
                </dl>
              ) : (
                <p className="modal-loading">Loading detail...</p>
              )
            )}

            {activeModal === "edit" && (
              <form className="modal-form" onSubmit={handleEditSubmit}>
                <label>
                  <span>Title</span>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                    required
                  />
                </label>

                <label>
                  <span>Author</span>
                  <input
                    type="text"
                    value={editForm.author}
                    onChange={(e) =>
                      setEditForm({ ...editForm, author: e.target.value })
                    }
                    required
                  />
                </label>

                <label>
                  <span>Price</span>
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                    required
                  />
                </label>

                <label>
                  <span>Quantity</span>
                  <input
                    type="number"
                    value={editForm.quantity}
                    onChange={(e) =>
                      setEditForm({ ...editForm, quantity: e.target.value })
                    }
                    required
                  />
                </label>

                <div className="modal-actions">
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button className="primary-button" type="submit">
                    Save
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
