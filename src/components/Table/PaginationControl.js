import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationControl = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="d-flex justify-content-center mt-3">
      <Pagination>
        <Pagination.First disabled={currentPage === 1} onClick={() => onPageChange(1)} />
        <Pagination.Prev disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} />
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i}
            active={currentPage === i + 1}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} />
        <Pagination.Last disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)} />
      </Pagination>
    </div>
  );
};

export default PaginationControl;
