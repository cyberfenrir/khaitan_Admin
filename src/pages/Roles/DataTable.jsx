import { Eye, Edit, Trash2 } from 'lucide-react';
import TablePagination from '../Products/utils/TablePagination';

const tableData = [
  {
    name: 'User Management',
    assignedTo: ['Manager'],
    createdDate: '4 Mar 2023, 08:30 am',
    lastUpdate: 'Today'
  },
  {
    name: 'Financial Management',
    assignedTo: ['Administrator', 'Developer'],
    createdDate: '27 Jun 2024, 12:00 am',
    lastUpdate: 'Yesterday'
  },
  // ... rest of the data remains the same
];

function DataTable() {
  return (
    <div className="flex-1 px-3 w-full max-w-[1558px] min-w-[240px] max-md:max-w-full">
      <div className="bg-white rounded-xl shadow-sm">
        <header className="flex justify-between items-center px-6 py-5 border-b border-slate-200 max-md:px-5 max-md:flex-wrap">
          <h1 className="text-base font-semibold leading-4 text-slate-700">
            All Permissions List
          </h1>
          <div className="flex items-center px-3.5 py-2 rounded-xl border border-slate-100">
            <span className="text-sm leading-5 text-zinc-700">This Month</span>
          </div>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <TableHeader />
            <tbody>
              {tableData.map((row, index) => (
                <TableRow key={index} {...row} />
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination />
      </div>
    </div>
  );
}

function TableHeader() {
  return (
    <thead>
      <tr className="bg-gray-50">
        <th className="w-12 p-4 border-b border-slate-200">
          <input
            type="checkbox"
            className="w-4 h-4 bg-white rounded border border-slate-300"
            aria-label="Select all"
          />
        </th>
        <th className="w-64 p-4 text-left text-sm font-semibold text-slate-500 border-b border-slate-200">
          Name
        </th>
        <th className="w-96 p-4 text-left text-sm font-semibold text-slate-500 border-b border-slate-200">
          Assigned To
        </th>
        <th className="w-64 p-4 text-left text-sm font-semibold text-slate-500 border-b border-slate-200">
          Created Date & Time
        </th>
        <th className="w-40 p-4 text-left text-sm font-semibold text-slate-500 border-b border-slate-200">
          Last Update
        </th>
        <th className="w-64 p-4 text-left text-sm font-semibold text-slate-500 border-b border-slate-200">
          Action
        </th>
      </tr>
    </thead>
  );
}

function TableRow({ name, assignedTo, createdDate, lastUpdate }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="w-12 p-4 border-b border-slate-200">
        <input
          type="checkbox"
          className="w-4 h-4 bg-white rounded border border-slate-300"
          aria-label={`Select ${name}`}
        />
      </td>
      <td className="w-64 p-4 text-base text-slate-500 border-b border-slate-200">
        {name}
      </td>
      <td className="w-96 p-4 border-b border-slate-200">
        <div className="flex flex-wrap gap-2">
          {assignedTo.map((role, index) => (
            <span
              key={index}
              className={`px-3 py-1.5 text-xs font-semibold rounded ${getRoleStyle(role)}`}
            >
              {role}
            </span>
          ))}
        </div>
      </td>
      <td className="w-64 p-4 text-sm text-slate-500 border-b border-slate-200">
        {createdDate}
      </td>
      <td className="w-40 p-4 text-sm text-slate-500 border-b border-slate-200">
        {lastUpdate}
      </td>
      <td className="w-64 p-4 border-b border-slate-200">
        <div className="flex gap-3">
          <button
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
            aria-label="View"
          >
            <Eye className="w-4 h-4 text-slate-600" />
          </button>
          <button
            className="p-2 rounded-lg bg-orange-100 hover:bg-orange-200 transition-colors"
            aria-label="Edit"
          >
            <Edit className="w-4 h-4 text-orange-600" />
          </button>
          <button
            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition-colors"
            aria-label="Delete"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </td>
    </tr>
  );
}

function getRoleStyle(role) {
  switch (role) {
    case 'Manager':
      return 'bg-orange-100 text-orange-500';
    case 'Administrator':
      return 'bg-stone-200 text-teal-400';
    case 'Developer':
      return 'bg-slate-100 text-slate-700';
    case 'Analyst':
      return 'bg-emerald-100 text-green-500';
    case 'Trial':
      return 'bg-orange-100 text-amber-400';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export default DataTable;