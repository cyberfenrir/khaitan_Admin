import React from 'react';

export default function TablePagination() {
  return (
    <nav className="flex flex-col px-6 pt-5 pb-5 w-full text-sm text-gray-600 whitespace-nowrap border-t border-solid border-t-slate-200 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-0 w-full max-md:max-w-full">
        <button className="px-3.5 py-2 w-20 bg-white rounded-xl border border-solid border-slate-200">
          Previous
        </button>
        <button className="px-3.5 h-[35px] w-[35px] bg-orange-500 text-white border border-orange-500 border-solid">
          1
        </button>
        <button className="px-3.5 h-[35px] w-[35px] bg-white border border-solid border-slate-200">
          2
        </button>
        <button className="px-3.5 h-[35px] w-[35px] bg-white border border-solid border-slate-200">
          3
        </button>
        <button className="px-3.5 py-2 w-14 bg-white rounded-none border border-solid border-slate-200">
          Next
        </button>
      </div>
    </nav>
  );
}