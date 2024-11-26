import PropTypes from 'prop-types';
import downIcon from './icons/down.svg';

export default function ProductHeader({ title, addButtonText, filterButtonText }) {
  return (
    <header className="flex justify-between items-center px-6 pt-5 pb-5 w-full border-b border-slate-200 max-md:px-5">
      <h1 className="flex-1 text-base font-semibold min-w-[240px] text-slate-700">
        {title}
      </h1>
      <button className="px-3.5 py-2 text-sm text-white bg-orange-500 rounded-lg border border-orange-500">
        {addButtonText}
      </button>
      <button className="flex gap-1 items-center px-3.5 py-2 rounded-lg border border-slate-100">
        <span className="text-sm text-zinc-700">{filterButtonText}</span>
        <img
          loading="lazy"
          src={downIcon}
          alt="Filter"
          className="w-4 h-4"
        />
      </button>
    </header>
  );
}

ProductHeader.propTypes = {
  title: PropTypes.string.isRequired,
  addButtonText: PropTypes.string.isRequired,
  filterButtonText: PropTypes.string.isRequired,
};