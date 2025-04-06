import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageItems = () => {
    const items = [];
    const maxVisiblePages = 5; 
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    
    if (startPage > 1) {
      items.push(
        <BootstrapPagination.Item 
          key="first" 
          onClick={() => onPageChange(1)}
        >
          1
        </BootstrapPagination.Item>
      );
      
      if (startPage > 2) {
        items.push(<BootstrapPagination.Ellipsis key="ellipsis-start" disabled />);
      }
    }
    
    
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <BootstrapPagination.Item 
          key={page} 
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </BootstrapPagination.Item>
      );
    }
    
    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<BootstrapPagination.Ellipsis key="ellipsis-end" disabled />);
      }
      
      items.push(
        <BootstrapPagination.Item 
          key="last" 
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </BootstrapPagination.Item>
      );
    }
    
    return items;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="d-flex justify-content-center mt-5">
      <BootstrapPagination>
        <BootstrapPagination.Prev 
          disabled={currentPage === 1} 
          onClick={() => onPageChange(currentPage - 1)}
        />
        
        {renderPageItems()}
        
        <BootstrapPagination.Next 
          disabled={currentPage === totalPages} 
          onClick={() => onPageChange(currentPage + 1)}
        />
      </BootstrapPagination>
    </div>
  );
};

export default Pagination;