import PropTypes from 'prop-types';

function PermissionTableRow({ functionality, permissions }) {
  const getPermissionClass = (permissionType) => {
    switch (permissionType) {
      case 'View, Create, Edit':
        return 'bg-green-100 text-green-700';
      case 'View, Edit':
        return 'bg-blue-100 text-blue-700';
      case 'View Only':
        return 'bg-yellow-100 text-yellow-700';
      case 'No Access':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getPermissionIcon = (permissionType) => {
    switch (permissionType) {
      case 'No Access':
        return '✕';
      case 'View Only':
        return '👁';
      case 'View, Edit':
        return '✎';
      case 'View, Create, Edit':
        return '✓';
      default:
        return '-';
    }
  };

  return (
    <tr className="border-b border-slate-200 text-sm text-slate-500 hover:bg-slate-50">
      <td className="p-3">
        <div className="flex items-center">
          <span className="font-medium text-slate-700">{functionality}</span>
        </div>
      </td>
      <td className="p-3">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded flex items-center gap-2 ${getPermissionClass(permissions)}`}>
            <span className="text-xs">{getPermissionIcon(permissions)}</span>
            {permissions}
          </span>
        </div>
      </td>
    </tr>
  );
}

PermissionTableRow.propTypes = {
  functionality: PropTypes.string.isRequired,
  permissions: PropTypes.string.isRequired,
};

export default PermissionTableRow;