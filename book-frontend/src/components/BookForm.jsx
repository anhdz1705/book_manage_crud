function BookForm({
  form,
  isSubmitting,
  onCancel,
  onChange,
  onSubmit,
  submitLabel = "Save",
  submittingLabel = "Saving...",
}) {
  const updateForm = (field, value) => {
    onChange({ ...form, [field]: value });
  };

  return (
    <form className="modal-form book-entry-form" onSubmit={onSubmit}>
      <label>
        <span>Title</span>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(event) => updateForm("title", event.target.value)}
          required
        />
      </label>

      <label>
        <span>Author</span>
        <input
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={(event) => updateForm("author", event.target.value)}
          required
        />
      </label>

      <label>
        <span>Price</span>
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(event) => updateForm("price", event.target.value)}
          required
        />
      </label>

      <label>
        <span>Quantity</span>
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(event) => updateForm("quantity", event.target.value)}
          required
        />
      </label>

      <div className="modal-actions">
        {onCancel && (
          <button className="secondary-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? submittingLabel : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default BookForm;
