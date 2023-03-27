import React from "react";

import "./Paginator.css";

function Paginator({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="Pagination">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="Pagination__button"
      >
        Previous page
      </button>
      <span className="Pagination__span">{`${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="Pagination__button"
      >
        Forward page
      </button>
    </div>
  );
}

export default Paginator;
