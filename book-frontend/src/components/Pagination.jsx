function Pagination({ next, onPageChange, page, previous, totalPages }) {
  return (
    <div className="pagination">
      <button
        className="secondary-button"
        type="button"
        disabled={!previous}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>

      <span>
        Page {page} / {totalPages}
      </span>

      <button
        className="secondary-button"
        type="button"
        disabled={!next}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
