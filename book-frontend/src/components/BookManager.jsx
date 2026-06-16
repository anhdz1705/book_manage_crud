import { useState } from "react";
import { EMPTY_BOOK_FORM } from "../constants/book";
import { useBooks } from "../hooks/useBooks";
import { useCountdownToast } from "../hooks/useCountdownToast";
import {
  addBook,
  deleteBook,
  getBookDetail,
  updateBook,
} from "../services/bookApi";
import BookFilters from "./BookFilters";
import BookModal from "./BookModal";
import BookTable from "./BookTable";
import CountdownToast from "./CountdownToast";
import { PlusIcon } from "./Icons";
import Pagination from "./Pagination";

const toBookPayload = (bookForm) => ({
  title: bookForm.title,
  author: bookForm.author,
  price: Number(bookForm.price),
  quantity: Number(bookForm.quantity),
});

function BookManager({ onUnauthorized }) {
  const {
    books,
    error,
    filter,
    handlePageSizeChange,
    handleSearch,
    isLoading,
    next,
    page,
    pageSize,
    previous,
    refreshBooks,
    setFilter,
    setPage,
    totalPages,
  } = useBooks({ onUnauthorized });

  const [form, setForm] = useState({ ...EMPTY_BOOK_FORM });
  const [editForm, setEditForm] = useState({ ...EMPTY_BOOK_FORM });
  const [editingId, setEditingId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [actionError, setActionError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const {
    closeToast,
    durationSeconds,
    showToast,
    toast,
  } = useCountdownToast(3);

  const closeModal = () => {
    setActiveModal(null);
    setDetail(null);
    setEditingId(null);
    setForm({ ...EMPTY_BOOK_FORM });
    setEditForm({ ...EMPTY_BOOK_FORM });
  };

  const openAddModal = () => {
    setForm({ ...EMPTY_BOOK_FORM });
    setActionError("");
    setActiveModal("add");
  };

  const handleAddBook = async (event) => {
    event.preventDefault();
    setActionError("");
    setIsAdding(true);

    try {
      await addBook(toBookPayload(form));
      closeModal();
      refreshBooks();
      showToast("Thêm sách thành công.");
    } catch (requestError) {
      setActionError(
        requestError?.response?.data?.detail || "Không thể thêm sách."
      );
    } finally {
      setIsAdding(false);
    }
  };

  const handleDetail = async (id) => {
    setDetail(null);
    setActiveModal("detail");
    setActionError("");

    try {
      const response = await getBookDetail(id);
      setDetail(response.data);
    } catch (requestError) {
      closeModal();
      setActionError(
        requestError?.response?.data?.detail || "Không thể tải chi tiết sách."
      );
    }
  };

  const handleEdit = (book) => {
    setEditingId(book.id);
    setEditForm({
      title: book.title,
      author: book.author,
      price: book.price,
      quantity: book.quantity,
    });
    setActionError("");
    setActiveModal("edit");
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (!editingId) {
      return;
    }

    setActionError("");
    setIsSaving(true);

    try {
      await updateBook(editingId, toBookPayload(editForm));
      closeModal();
      refreshBooks();
      showToast("Cập nhật sách thành công.");
    } catch (requestError) {
      setActionError(
        requestError?.response?.data?.detail || "Không thể cập nhật sách."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa sách này không?");

    if (!confirmDelete) {
      return;
    }

    setActionError("");

    try {
      await deleteBook(id);
      refreshBooks();
      showToast("Xóa sách thành công.");
    } catch (requestError) {
      setActionError(
        requestError?.response?.data?.detail || "Không thể xóa sách."
      );
    }
  };

  return (
    <>
      {(error || (!activeModal && actionError)) && (
        <p className="status-message error">
          {error || (!activeModal && actionError)}
        </p>
      )}

      <section className="table-panel">
        <div className="table-panel-header">
          <h2>Books</h2>
          <button
            className="primary-button add-button"
            type="button"
            onClick={openAddModal}
          >
            <PlusIcon />
            <span>Add New Book</span>
          </button>
        </div>

        <BookFilters
          filter={filter}
          onFilterChange={setFilter}
          onPageSizeChange={handlePageSizeChange}
          onSearch={handleSearch}
          pageSize={pageSize}
        />

        <BookTable
          books={books}
          isLoading={isLoading}
          onDelete={handleDelete}
          onDetail={handleDetail}
          onEdit={handleEdit}
        />
      </section>

      <Pagination
        next={next}
        onPageChange={setPage}
        page={page}
        previous={previous}
        totalPages={totalPages}
      />

      <CountdownToast
        durationSeconds={durationSeconds}
        onClose={closeToast}
        toast={toast}
      />

      <BookModal
        activeModal={activeModal}
        addForm={form}
        detail={detail}
        editForm={editForm}
        error={activeModal ? actionError : ""}
        isAdding={isAdding}
        isSaving={isSaving}
        onAddChange={setForm}
        onAddSubmit={handleAddBook}
        onClose={closeModal}
        onEditChange={setEditForm}
        onEditSubmit={handleEditSubmit}
      />
    </>
  );
}

export default BookManager;
