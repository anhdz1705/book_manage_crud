import { useCallback, useEffect, useState } from "react";
import { DEFAULT_PAGE_SIZE } from "../constants/book";
import { getBooks } from "../services/bookApi";

const emptyFilter = {
  title: "",
  author: "",
};

const getErrorMessage = (error) => {
  if (error?.response?.status === 401) {
    return "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.";
  }

  return "Không thể tải danh sách sách.";
};

export function useBooks({ onUnauthorized } = {}) {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({ ...emptyFilter });
  const [activeFilter, setActiveFilter] = useState({ ...emptyFilter });
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const refreshBooks = useCallback(() => {
    setRefreshKey((currentKey) => currentKey + 1);
  }, []);

  const handleSearch = () => {
    setPage(1);
    setActiveFilter({ ...filter });
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setPage(1);
  };

  useEffect(() => {
    let isCurrent = true;

    const loadBooks = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await getBooks({
          page,
          pageSize,
          title: activeFilter.title,
          author: activeFilter.author,
        });

        if (!isCurrent) {
          return;
        }

        setBooks(response.data.results || []);
        setNext(response.data.next);
        setPrevious(response.data.previous);
        setTotalPages(response.data.total_pages || 1);
      } catch (requestError) {
        if (!isCurrent) {
          return;
        }

        setError(getErrorMessage(requestError));

        if (requestError?.response?.status === 401 && onUnauthorized) {
          onUnauthorized();
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    };

    loadBooks();

    return () => {
      isCurrent = false;
    };
  }, [
    activeFilter.author,
    activeFilter.title,
    onUnauthorized,
    page,
    pageSize,
    refreshKey,
  ]);

  return {
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
  };
}
