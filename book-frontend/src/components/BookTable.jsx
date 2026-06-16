import { formatNumber, formatVnd } from "../utils/formatNumber";
import { EyeIcon, PencilIcon, TrashIcon } from "./Icons";

function BookTable({ books, isLoading, onDelete, onDetail, onEdit }) {
  const hasBooks = books.length > 0;

  return (
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
          {isLoading && (
            <tr>
              <td className="empty-cell" colSpan="5">
                Loading books...
              </td>
            </tr>
          )}

          {!isLoading && !hasBooks && (
            <tr>
              <td className="empty-cell" colSpan="5">
                No books found.
              </td>
            </tr>
          )}

          {!isLoading &&
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td className="number-cell price-cell">{formatVnd(book.price)}</td>
                <td className="number-cell">{formatNumber(book.quantity)}</td>
                <td className="action-cell">
                  <button
                    className="icon-action action-detail"
                    type="button"
                    aria-label={`View ${book.title}`}
                    title="View detail"
                    onClick={() => onDetail(book.id)}
                  >
                    <EyeIcon />
                  </button>

                  <button
                    className="icon-action action-edit"
                    type="button"
                    aria-label={`Edit ${book.title}`}
                    title="Edit"
                    onClick={() => onEdit(book)}
                  >
                    <PencilIcon />
                  </button>

                  <button
                    className="icon-action action-delete"
                    type="button"
                    aria-label={`Delete ${book.title}`}
                    title="Delete"
                    onClick={() => onDelete(book.id)}
                  >
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookTable;
