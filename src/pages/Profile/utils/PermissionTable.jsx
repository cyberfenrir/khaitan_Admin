// import React from 'react';
import PermissionTableRow from './PermissionTableRow';

const permissions = [
  { functionality: 'User Management', permissions: 'View, Create, Edit' },
  { functionality: 'Orders', permissions: 'View Only' },
  { functionality: 'Products', permissions: 'View, Edit' },
  { functionality: 'Reports', permissions: 'View Only' },
  { functionality: 'Settings', permissions: 'No Access' }
];

function PermissionTable() {
  return (
    <div className="w-full">
      <div className="rounded-md border border-slate-200">
        <div className="bg-slate-50 p-4 border-b border-slate-200">
          <h3 className="text-lg font-medium text-slate-900">Permissions & Access Control</h3>
          <p className="text-sm text-slate-500 mt-1">Manage access levels for different functionalities</p>
        </div>
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="text-sm font-medium text-slate-500">
              <th className="p-3 text-left w-1/2">Functionality</th>
              <th className="p-3 text-left w-1/2">Access Level</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission) => (
              <PermissionTableRow
                key={permission.functionality}
                functionality={permission.functionality}
                permissions={permission.permissions}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 bg-slate-50 rounded-md border border-slate-200">
        <h4 className="text-sm font-medium text-slate-900 mb-2">Access Level Legend</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-slate-600">Full Access (View, Create, Edit)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-slate-600">Partial Access (View, Edit)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            <span className="text-slate-600">View Only Access</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="text-slate-600">No Access</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PermissionTable;