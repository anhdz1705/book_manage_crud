import { PAGE_SIZE_OPTIONS } from "../constants/book";
import { SearchIcon } from "./Icons";

function BookFilters({
  filter,
  onFilterChange,
  onPageSizeChange,
  onSearch,
  pageSize,
}) {
  return (
    <div className="table-toolbar">
      <div className="filter-controls">
        <label className="input-with-icon">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search title"
            value={filter.title}
            onChange={(event) =>
              onFilterChange({ ...filter, title: event.target.value })
            }
          />
        </label>

        <label className="input-with-icon">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search author"
            value={filter.author}
            onChange={(event) =>
              onFilterChange({ ...filter, author: event.target.value })
            }
          />
        </label>

        <button className="primary-button" type="button" onClick={onSearch}>
          Search
        </button>

        <select
          className="toolbar-select"
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
        >
          {PAGE_SIZE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option} records
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default BookFilters;
