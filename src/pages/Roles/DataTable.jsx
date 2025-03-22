import { Eye, CheckCircle, XCircle } from 'lucide-react';
import TablePagination from '../Products/utils/TablePagination';
import { useState, useEffect } from 'react';
import { getAllUnverifiedUsers, verifyRole } from '../../services/roleService';

function DataTable() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUnverifiedUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUnverifiedUsers();
      if(response.success) {
        setTableData(response.data);
      } else {
        console.error("Failed to fetch unverified users");
      }
    } catch (error) {
      console.error("Error fetching unverified users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnverifiedUsers();
  }, []);

  const handleVerify = async (userId) => {
    try {
      const response = await verifyRole(userId);
      if(response.success) {
        // Update the table data by removing the verified user
        setTableData(tableData.filter(user => user.id !== userId));
      }
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  // const handleReject = async (userId) => {
  //   try {
  //     const response = await rejectUser(userId);
  //     if(response.success) {
  //       // Update the table data by removing the rejected user
  //       setTableData(tableData.filter(user => user.id !== userId));
  //     }
  //   } catch (error) {
  //     console.error("Error rejecting user:", error);
  //   }
  // };
  
  return (
    <div className="flex-1 px-3 w-full max-w-[1558px] min-w-[240px] max-md:max-w-full">
      <div className="bg-white rounded-xl shadow-sm">
        <header className="flex justify-between items-center px-6 py-5 border-b border-slate-200 max-md:px-5 max-md:flex-wrap">
          <h1 className="text-base font-semibold leading-4 text-slate-700">
            Unverified Users
          </h1>
          <button 
            onClick={fetchUnverifiedUsers}
            className="px-3.5 py-2 rounded-xl border border-slate-100 text-sm leading-5 text-zinc-700 hover:bg-slate-50"
          >
            Refresh
          </button>
        </header>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading users...</div>
          ) : tableData.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No unverified users found</div>
          ) : (
            <table className="w-full table-fixed">
              <TableHeader />
              <tbody>
                {tableData.map((user) => (
                  <TableRow 
                    key={user.id} 
                    user={user} 
                    onVerify={handleVerify} 
                    // onReject={handleReject} 
                  />
                ))}
              </tbody>
            </table>
          )}
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
          User Name
        </th>
        <th className="w-96 p-4 text-left text-sm font-semibold text-slate-500 border-b border-slate-200">
          Email
        </th>
        <th className="w-64 p-4 text-left text-sm font-semibold text-slate-500 border-b border-slate-200">
          Registration Date
        </th>
        <th className="w-64 p-4 text-left text-sm font-semibold text-slate-500 border-b border-slate-200">
          Requested Role
        </th>
        <th className="w-64 p-4 text-left text-sm font-semibold text-slate-500 border-b border-slate-200">
          Action
        </th>
      </tr>
    </thead>
  );
}

function TableRow({ user, onVerify, onReject }) {
  const { id, name, email, registrationDate, requestedRole } = user;
  
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
      <td className="w-96 p-4 text-sm text-slate-500 border-b border-slate-200">
        {email}
      </td>
      <td className="w-64 p-4 text-sm text-slate-500 border-b border-slate-200">
        {registrationDate}
      </td>
      <td className="w-64 p-4 border-b border-slate-200">
        <span className={`px-3 py-1.5 text-xs font-semibold rounded ${getRoleStyle(requestedRole)}`}>
          {requestedRole}
        </span>
      </td>
      <td className="w-64 p-4 border-b border-slate-200">
        <div className="flex gap-3">
          <button
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
            aria-label="View Details"
            title="View Details"
          >
            <Eye className="w-4 h-4 text-slate-600" />
          </button>
          <button
            className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition-colors"
            aria-label="Verify User"
            title="Verify User"
            onClick={() => onVerify(id)}
          >
            <CheckCircle className="w-4 h-4 text-green-600" />
          </button>
          <button
            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition-colors"
            aria-label="Reject User"
            title="Reject User"
            onClick={() => onReject(id)}
          >
            <XCircle className="w-4 h-4 text-red-600" />
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