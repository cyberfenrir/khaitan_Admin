import React from 'react';

function TablePagination() {
  return (
    <nav className="flex flex-col px-6 pt-5 pb-5 w-full text-sm leading-5 text-gray-600 whitespace-nowrap border-t border-solid border-t-slate-200 max-md:px-5 max-md:max-w-full" aria-label="Pagination">
      <ul className="flex flex-wrap pl-20 w-full max-md:pl-5 max-md:max-w-full">
        <li className="flex flex-col min-h-[35px]">
          <button className="px-3.5 py-2 w-full bg-white rounded-xl border border-solid border-slate-200" aria-label="Go to previous page">Previous</button>
        </li>
        <li className="flex flex-col text-white min-h-[35px]">
          <button className="px-3.5 bg-orange-500 border border-orange-500 border-solid h-[35px] w-[35px]" aria-label="Page 1, current page">1</button>
        </li>
        <li className="flex flex-col min-h-[35px]">
          <button className="px-3.5 py-2 w-full bg-white border border-solid border-slate-200" aria-label="Go to page 2">2</button>
        </li>
        <li className="flex flex-col min-h-[35px]">
          <button className="px-3.5 bg-white border border-solid border-slate-200 h-[35px] w-[35px]" aria-label="Go to page 3">3</button>
        </li>
        <li className="flex flex-col min-h-[35px]">
          <button className="px-3.5 py-2 w-full bg-white rounded-none border border-solid border-slate-200" aria-label="Go to next page">Next</button>
        </li>
      </ul>
    </nav>
  );
}

export default TablePagination;