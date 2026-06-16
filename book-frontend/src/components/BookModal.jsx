import { formatNumber, formatVnd } from "../utils/formatNumber";
import BookForm from "./BookForm";

function BookModal({
  activeModal,
  addForm,
  detail,
  editForm,
  error,
  isAdding,
  isSaving,
  onAddChange,
  onAddSubmit,
  onClose,
  onEditChange,
  onEditSubmit,
}) {
  if (!activeModal) {
    return null;
  }

  const modalTitle = {
    add: "Add New Book",
    detail: "Book Detail",
    edit: "Edit Book",
  }[activeModal];

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="modal-title">{modalTitle}</h2>
          <button
            className="modal-close"
            type="button"
            aria-label="Close"
            onClick={onClose}
          >
            X
          </button>
        </div>

        {error && <p className="status-message error modal-error">{error}</p>}

        {activeModal === "detail" &&
          (detail ? (
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
                <dd>{formatVnd(detail.price)}</dd>
              </div>
              <div className="detail-row">
                <dt>Quantity</dt>
                <dd>{formatNumber(detail.quantity)}</dd>
              </div>
            </dl>
          ) : (
            <p className="modal-loading">Loading detail...</p>
          ))}

        {activeModal === "add" && (
          <BookForm
            form={addForm}
            isSubmitting={isAdding}
            onCancel={onClose}
            onChange={onAddChange}
            onSubmit={onAddSubmit}
            submitLabel="Create Book"
            submittingLabel="Creating..."
          />
        )}

        {activeModal === "edit" && (
          <BookForm
            form={editForm}
            isSubmitting={isSaving}
            onCancel={onClose}
            onChange={onEditChange}
            onSubmit={onEditSubmit}
            submitLabel="Save"
            submittingLabel="Saving..."
          />
        )}
      </section>
    </div>
  );
}

export default BookModal;
