import { useEffect, useState } from 'react';
import { addPermissionsToRoleBulk, createRole, getAllPermissions, getAllRoles } from '../../../services/roleService';
import { useAuth } from '../../../AuthContext';

const FormField = ({ label, value, onChange }) => (
  <div className="flex flex-col flex-1 px-3 text-sm text-slate-500 w-full">
    <label className="mb-2">{label}</label>
    <input
      type="text"
      placeholder={value}
      value={value}
      onChange={onChange}
      className="px-4 py-2 bg-white rounded-lg border border-zinc-200"
    />
  </div>
);

const ComboBox = ({ label, options, value, onChange }) => (
  <div className="flex flex-col flex-1 px-3 w-full">
    <label className="mb-2 text-sm text-slate-500">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 bg-white rounded-lg border border-zinc-200 text-sm text-slate-500 appearance-none"
      >
        <option value="">Select a {label}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
);

const TagInput = ({ label, selectedPermissions, availablePermissions, onAddPermission, onRemovePermission }) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      // Check if the input matches any available permission
      const permissionToAdd = availablePermissions.find(
        perm => perm.name.toLowerCase() === inputValue.trim().toLowerCase()
      );
      
      if (permissionToAdd) {
        onAddPermission(permissionToAdd);
        setInputValue('');
      }
    }
  };

  return (
    <div className="flex flex-col flex-1 px-3 w-full">
      <label className="mb-2 text-sm text-slate-500">{label}</label>
      <div className="flex flex-wrap gap-1.5 p-2 bg-white rounded-lg border border-zinc-200">
        {selectedPermissions.map((permission) => (
          <div key={permission.id} className="flex items-center bg-orange-500 text-white rounded-lg px-2 py-1">
            <span className="text-xs">{permission.name}</span>
            <button
              onClick={() => onRemovePermission(permission.id)}
              className="ml-2 opacity-75 hover:opacity-100 focus:outline-none"
              aria-label={`Remove ${permission.name} permission`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        ))}
        <input
          type="text"
          className="flex-grow min-w-[60px] bg-transparent focus:outline-none"
          placeholder="Add a Permission..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          list="availablePermissions"
        />
        <datalist id="availablePermissions">
          {availablePermissions
            .filter(perm => !selectedPermissions.some(selected => selected.id === perm.id))
            .map(perm => (
              <option key={perm.id} value={perm.name} />
            ))}
        </datalist>
      </div>
    </div>
  );
};

// const StatusToggle = ({ label, checked, onChange }) => (
//   <label className="flex items-center cursor-pointer">
//     <div className="relative">
//       <input
//         type="checkbox"
//         className="sr-only"
//         checked={checked}
//         onChange={onChange}
//       />
//       <div className={`w-10 h-6 ${checked ? 'bg-orange-500' : 'bg-gray-200'} rounded-full shadow-inner`}></div>
//       <div className={`absolute w-4 h-4 bg-white rounded-full shadow inset-y-1 left-1 transition-transform ${checked ? 'transform translate-x-full' : ''}`}></div>
//     </div>
//     <span className="ml-3 text-sm text-slate-500">{label}</span>
//   </label>
// );

function RolesInformation() {
  const [allPermissions, setAllPermissions] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [permissionIds, setPermissionIds] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [selectedParentRoleId, setSelectedParentRoleId] = useState("");

  const handleAddPermission = (permission) => {
    if (!selectedPermissions.some(p => p.id === permission.id)) {
      const updatedPermissions = [...selectedPermissions, permission];
      setSelectedPermissions(updatedPermissions);
      setPermissionIds(updatedPermissions.map(p => p.id));
    }
  };

  const handleRemovePermission = (permissionId) => {
    const updatedPermissions = selectedPermissions.filter(p => p.id !== permissionId);
    setSelectedPermissions(updatedPermissions);
    setPermissionIds(updatedPermissions.map(p => p.id));
  };

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const response = await getAllPermissions();
        setAllPermissions(response.data || []);
      } catch (err) {
        alert("Error fetching existing permissions.");
        console.error(err);
      }
    };
    
    getPermissions();
  }, []);

  useEffect(() => {
    const getRoles = async () => {
      try {
        const response = await getAllRoles();
        setAllRoles(response.data || []);
      } catch (err) {
        alert("Error fetching existing roles.");
        console.error(err);
      }
    };
    
    getRoles();
  }, []);

  const handleSaveRole = async () => {
    if (!roleName) {
      alert("Please enter a role name");
      return;
    }
    
    if (permissionIds.length === 0) {
      alert("Please select at least one permission");
      return;
    }
    
    try {
      // Pass selectedParentRoleId instead of user
      const newRole = await createRole(roleName, roleDescription, selectedParentRoleId);
      console.log(newRole);
      const roleId = newRole.data.id;
      await addPermissionsToRoleBulk(roleId, permissionIds);
      alert("Role created successfully!");
      
      // Reset form
      setRoleName("");
      setRoleDescription("");
      setSelectedPermissions([]);
      setPermissionIds([]);
      setSelectedParentRoleId("");
    } catch (err) {
      alert("Error Creating Role!");
      console.error(err);
    }
  };

  return (
    <section className="flex flex-col max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <header className="px-6 py-5 border-b border-slate-200">
          <h1 className="text-base font-semibold text-slate-700">Roles Information</h1>
        </header>
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField 
              label="Role Name" 
              value={roleName} 
              onChange={(e) => setRoleName(e.target.value)} 
            />
            <FormField 
              label="Role Description" 
              value={roleDescription} 
              onChange={(e) => setRoleDescription(e.target.value)} 
            />
            <ComboBox 
              label="Parent Role" 
              options={allRoles}
              value={selectedParentRoleId}
              onChange={(e) => setSelectedParentRoleId(e.target.value)}
            />
            <TagInput 
              label="Permissions" 
              selectedPermissions={selectedPermissions} 
              availablePermissions={allPermissions} 
              onAddPermission={handleAddPermission} 
              onRemovePermission={handleRemovePermission} 
            />
          </div>
        </main>
        <footer className="px-6 py-5 border-t border-slate-200">
          <button 
            className="w-full px-4 py-2.5 bg-orange-500 text-white rounded-xl border border-orange-500 text-sm font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
            onClick={handleSaveRole}
          >
            Save Change
          </button>
        </footer>
      </div>
    </section>
  );
}

export default RolesInformation;