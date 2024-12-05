import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Users, UserPlus, UserCheck, UserMinus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReusableTable from '../../Utils/table'; // Adjust the import path as necessary

// Simple Card components with PropTypes
const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const CardHeader = ({ children, className }) => (
  <div className={`flex items-center justify-between mb-2 ${className}`}>
    {children}
  </div>
);

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const CardTitle = ({ children, className }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const UsersPage = () => {
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

  const analyticsData = [
    { title: 'Total Users', value: '10,234', icon: Users, color: 'text-blue-500' },
    { title: 'New Users', value: '1,234', icon: UserPlus, color: 'text-green-500' },
    { title: 'Active Users', value: '8,569', icon: UserCheck, color: 'text-yellow-500' },
    { title: 'Inactive Users', value: '1,665', icon: UserMinus, color: 'text-red-500' },
  ];

  const columnDefs = [
    { headerName: 'User Name', field: 'name' },
    { headerName: 'User ID', field: 'id' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Registration Date', field: 'registrationDate' },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <div>
          <button 
            onClick={() => handleEdit(params.data.id)}
            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
          >
            Edit
          </button>
          <button 
            onClick={() => handleDelete(params.data.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    // Fetch user data here
    const fetchData = async () => {
      // Replace this with actual API call
      const mockData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', registrationDate: '2023-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', registrationDate: '2023-02-20' },
        // Add more mock data as needed
      ];
      setRowData(mockData);
    };

    fetchData();
  }, []);

  const handleEdit = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleDelete = (userId) => {
    // Implement delete logic here
    console.log(`Delete user with id: ${userId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users Dashboard</h1>
      
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {analyticsData.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ReusableTable */}
      <ReusableTable
        columnDefs={columnDefs}
        rowData={rowData}
        paginationPageSize={10}
        height={400}
      />
    </div>
  );
};

export default UsersPage;