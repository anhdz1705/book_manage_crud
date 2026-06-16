import { LogOutIcon } from "./Icons";

function ConfirmDialog({
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  isSubmitting = false,
  message,
  onCancel,
  onConfirm,
  submittingLabel = "Processing...",
  title,
}) {
  return (
    <div
      className="modal-backdrop confirm-backdrop"
      onMouseDown={() => {
        if (!isSubmitting) {
          onCancel();
        }
      }}
    >
      <section
        className="confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="confirm-icon">
          <LogOutIcon />
        </div>

        <div className="confirm-copy">
          <h2 id="confirm-title">{title}</h2>
          <p>{message}</p>
        </div>

        <div className="confirm-actions">
          <button
            className="secondary-button"
            type="button"
            disabled={isSubmitting}
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            className="danger-button"
            type="button"
            disabled={isSubmitting}
            onClick={onConfirm}
          >
            {isSubmitting ? submittingLabel : confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmDialog;
