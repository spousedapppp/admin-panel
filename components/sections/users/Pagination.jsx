import React from "react";

export const Pagination = ({ perPage, totalData, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalData / perPage);
  if (totalPages <= 1) return null;

  const prevPage = () => {
    if (currentPage !== 1) paginate(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage !== totalPages) paginate(currentPage + 1);
  };

  // Smart page range with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalData);

  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
      {/* Info */}
      <p className="text-sm text-gray-400">
        Showing <span className="font-medium text-gray-600">{startItem}</span> to{" "}
        <span className="font-medium text-gray-600">{endItem}</span> of{" "}
        <span className="font-medium text-gray-600">{totalData}</span> results
      </p>

      {/* Pagination controls */}
      <nav className="flex items-center gap-1">
        {/* Previous */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-150 ${
            currentPage === 1
              ? "cursor-not-allowed border-gray-100 text-gray-300"
              : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`dots-${index}`} className="flex h-9 w-9 items-center justify-center text-sm text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all duration-150 ${
                currentPage === page
                  ? "bg-primary text-black shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-150 ${
            currentPage === totalPages
              ? "cursor-not-allowed border-gray-100 text-gray-300"
              : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </nav>
    </div>
  );
};
