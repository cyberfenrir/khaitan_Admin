import { useState, useEffect } from 'react';
import { Users, UserPlus, UserCheck, UserMinus } from 'lucide-react';
import CustomerPage from './Utils/CustomerPage'; // Adjust path if needed
import PropTypes from 'prop-types';
// Simple Card components with PropTypes remain the same
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
  const [customerData, setCustomerData] = useState([]);

  const analyticsData = [
    { title: 'Total Users', value: '10,234', icon: Users, color: 'text-blue-500' },
    { title: 'New Users', value: '1,234', icon: UserPlus, color: 'text-green-500' },
    { title: 'Active Users', value: '8,569', icon: UserCheck, color: 'text-yellow-500' },
    { title: 'Inactive Users', value: '1,665', icon: UserMinus, color: 'text-red-500' },
  ];

  useEffect(() => {
    // Fetch customer data here
    const fetchData = async () => {
      // Replace this with actual API call
      const mockData = [
        {
          id: "CUS001",
          name: "John Doe",
          email: "john.doe@example.com",
          registrationDate: "2024-01-15",
          status: "Active",
          location: "New York, USA",
          avatar: "/api/placeholder/40/40"
        },
        {
          id: "CUS002",
          name: "Jane Smith",
          email: "jane.smith@example.com",
          registrationDate: "2024-02-01",
          status: "Active",
          location: "Los Angeles, USA",
          avatar: "/api/placeholder/40/40"
        },
        {
          id: "CUS003",
          name: "Mike Johnson",
          email: "mike.j@example.com",
          registrationDate: "2024-02-15",
          status: "Inactive",
          location: "Chicago, USA",
          avatar: "/api/placeholder/40/40"
        }
      ];
      setCustomerData(mockData);
    };

    fetchData();
  }, []);

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

      {/* Customer Table */}
      <div className="bg-white rounded-lg shadow">
        <CustomerPage customersList={customerData} />
      </div>
    </div>
  );
};

export default UsersPage;