function CountdownToast({
  durationSeconds,
  onClose,
  toast,
}) {
  if (!toast) {
    return null;
  }

  return (
    <div className="toast-region" aria-live="polite" aria-atomic="true">
      <section
        key={toast.id}
        className="success-toast"
        role="status"
        style={{ "--toast-duration": `${durationSeconds}s` }}
      >
        <div className="toast-icon" aria-hidden="true">
          {"\u2713"}
        </div>

        <div className="toast-content">
          <strong>{toast.message}</strong>
        </div>

        <button
          className="toast-close"
          type="button"
          aria-label="Close notification"
          onClick={onClose}
        >
          {"\u00d7"}
        </button>

        <div className="toast-progress" aria-hidden="true">
          <span />
        </div>
      </section>
    </div>
  );
}

export default CountdownToast;
