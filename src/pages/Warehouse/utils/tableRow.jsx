import PropTypes from 'prop-types';
import { Eye, Edit, Trash2 } from 'lucide-react';

export default function TableRow({ id, name, location, manager, contact, stockAvailable, stockShipping, revenue }) {
  return (
    <tr className="border-b border-slate-200">
      <td className="px-3.5 py-5 w-[40px]">
        <input type="checkbox" className="w-4 h-4 bg-white rounded border border-solid border-black border-opacity-20" />
      </td>
      <td className="px-3.5 py-5 text-sm text-slate-500 text-left whitespace-nowrap w-[120px]">{id}</td>
      <td className="px-3.5 py-5 text-sm text-slate-500 text-left whitespace-nowrap w-[150px]">{name}</td>
      <td className="px-3.5 py-5 text-sm text-slate-500 text-left whitespace-nowrap w-[120px]">{location}</td>
      <td className="px-3.5 py-5 text-sm text-slate-500 text-left whitespace-nowrap w-[120px]">{manager}</td>
      <td className="px-3.5 py-5 text-sm text-slate-500 text-left whitespace-nowrap w-[140px]">{contact}</td>
      <td className="px-3.5 py-5 text-sm text-slate-500 text-right whitespace-nowrap w-[120px]">{stockAvailable}</td>
      <td className="px-3.5 py-5 text-sm text-slate-500 text-right whitespace-nowrap w-[120px]">{stockShipping}</td>
      <td className="px-3.5 py-5 text-sm text-slate-500 text-right whitespace-nowrap w-[150px]">${revenue}</td>
      <td className="px-3.5 py-3.5 text-center w-[120px]">
        <div className="flex gap-3 justify-center">
          <button className="p-2 rounded-lg border border-solid bg-slate-100 border-slate-100 hover:bg-slate-200">
            <Eye className="w-4 h-4 text-slate-600" />
          </button>
          <button className="p-2 rounded-lg bg-orange-500 bg-opacity-10 hover:bg-opacity-20">
            <Edit className="w-4 h-4 text-orange-500" />
          </button>
          <button className="p-2 rounded-lg bg-red-400 bg-opacity-10 hover:bg-opacity-20">
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  manager: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
  stockAvailable: PropTypes.number.isRequired,
  stockShipping: PropTypes.number.isRequired,
  revenue: PropTypes.number.isRequired,
};
