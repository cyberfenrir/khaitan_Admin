import PropTypes from 'prop-types';

export default function TablePagination({ currentPage, totalPages, onPageChange }) {
  return (
    <nav className="flex px-6 py-5 w-full text-sm text-gray-600 border-t border-slate-200">
      <div className="flex gap-2 w-full">
        <button
          className="px-3.5 py-2 w-20 bg-white rounded-xl border border-slate-200"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              className={`px-3.5 h-[35px] w-[35px] border ${
                page === currentPage
                  ? 'bg-orange-500 border-orange-500 text-white'
                  : 'bg-white border-slate-200'
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        })}
        <button
          className="px-3.5 py-2 w-14 bg-white border border-slate-200"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </nav>
  );
}

TablePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
