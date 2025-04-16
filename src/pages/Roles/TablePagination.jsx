import React, { useState, useEffect } from 'react';

function TablePagination({ users, itemsPerPage = 10, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Calculate total pages when users or itemsPerPage changes
    if (users && users.length > 0) {
      setTotalPages(Math.ceil(users.length / itemsPerPage));
    } else {
      setTotalPages(1);
    }
  }, [users, itemsPerPage]);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3; // Show at most 3 page numbers
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // Adjust start page if end page is at max
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const handlePageChange = (pageNumber) => {
    // Ensure page number is within valid range
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      
      // Calculate start and end indices for the current page
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, users.length);
      
      // Pass the current page users to parent component
      if (onPageChange) {
        onPageChange({
          currentPage: pageNumber,
          totalPages,
          pageUsers: users.slice(startIndex, endIndex)
        });
      }
    }
  };

  const handlePrevious = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    handlePageChange(currentPage + 1);
  };

  return (
    <nav className="flex flex-col px-6 pt-5 pb-5 w-full text-sm leading-5 text-gray-600 whitespace-nowrap border-t border-solid border-t-slate-200 max-md:px-5 max-md:max-w-full" aria-label="Pagination">
      <ul className="flex flex-wrap items-center justify-center gap-2 w-full">
        <li className="flex flex-col min-h-[35px]">
          <button 
            className={`px-3.5 py-2 bg-white rounded-xl border border-solid border-slate-200 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            onClick={handlePrevious}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            Previous
          </button>
        </li>
        
        {getPageNumbers().map(pageNumber => (
          <li key={pageNumber} className="flex flex-col min-h-[35px]">
            <button 
              className={`px-3.5 flex items-center justify-center h-[35px] w-[35px] rounded-md ${
                currentPage === pageNumber 
                  ? 'bg-orange-500 text-white border border-orange-500 border-solid' 
                  : 'bg-white border border-solid border-slate-200 hover:bg-gray-50'
              }`}
              onClick={() => handlePageChange(pageNumber)}
              aria-label={`Page ${pageNumber}${currentPage === pageNumber ? ', current page' : ''}`}
              aria-current={currentPage === pageNumber ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        
        <li className="flex flex-col min-h-[35px]">
          <button 
            className={`px-3.5 py-2 bg-white rounded-xl border border-solid border-slate-200 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            onClick={handleNext}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default TablePagination;