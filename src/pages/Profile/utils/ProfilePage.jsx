import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, User } from 'lucide-react';
import PermissionTable from './PermissionTable';
import { getUser } from '../../../services/userService';
import { getAllRoles } from '../../../services/roleService';
import { convertDateTime } from '../../../Utils/timeConversion';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState ({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    employeeId: '',
    joiningDate: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  });

  const fetchUserData = async () => {
    const data = await getUser();
    console.log(data.data);
    setFormData(data.data);
  };

  const fetchAllRoles = async () => {
    const data = await getAllRoles();
    setRoles(data.data);
  }
  useEffect(() => {
    if(roles.length>0){
      fetchUserData();
    }
  }, []);
  
  useEffect(()=>{
    fetchAllRoles();

    return () => {};
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const role = roles.length>0? roles.filter((role) => role.id === formData.roleId) : [{name: ""}];

  const handleSave = async () => {
    try {
      console.log('Saving user data:', formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/analytics');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 text-slate-600">PROFILE INFORMATION</h2>
          <div className="space-y-4">
            <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                <User size={32} className="text-gray-500" />
              </div>
              <div>
                <h3 className="font-bold">{`${formData.name}`}</h3>
                <p className="text-gray-600">{role[0]?.name}</p>
                <p className="text-gray-600">{formData.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-600">Contact</p>
                <p className="font-medium">{formData.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Employee ID</p>
                <p className="font-medium">{formData.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Joining Date</p>
                <p className="font-medium">{convertDateTime(formData.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <PermissionTable />
        </div>
      </div>

      {/* Bottom Section - Edit Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold mb-6 text-slate-600">EDIT PROFILE INFORMATION</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData?.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div> */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={role[0]?.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div> */}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={handleCancel}
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
        >
          <X size={20} />
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-blue-600 flex items-center gap-2"
        >
          <Save size={20} />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;