import { useState, useEffect } from 'react';
import { Users, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AnalyticsCard from './AnalyticsCard';

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const analyticsData = {
    customers: { total: 1234, percentageChange: 5.2 },
    orders: { total: 789, percentageChange: -2.1 },
    revenue: { total: 50000, percentageChange: 7.8 },
    growth: { rate: 12.5, percentageChange: 3.4 }
  };

  const analyticsCards = [
    {
      icon: Users,
      title: 'Total Customers',
      value: analyticsData.customers.total,
      percentageChange: analyticsData.customers.percentageChange,
      detailsPath: '/customers',
      colorScheme: 'blue'
    },
    {
      icon: ShoppingCart,
      title: 'Total Orders',
      value: analyticsData.orders.total,
      percentageChange: analyticsData.orders.percentageChange,
      detailsPath: '/orders',
      colorScheme: 'green'
    },
    {
      icon: DollarSign,
      title: 'Revenue',
      value: `₹${analyticsData.revenue.total.toLocaleString()}`,
      percentageChange: analyticsData.revenue.percentageChange,
      detailsPath: '/revenue',
      colorScheme: 'purple'
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      value: `${analyticsData.growth.rate}%`,
      percentageChange: analyticsData.growth.percentageChange,
      detailsPath: '/growth',
      colorScheme: 'orange'
    }
  ];

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setIsLoading(true);
        // Simulating API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // const response = await fetch('/api/sales-data');
        // const data = await response.json();
        
        const mockData = [
          { month: 'Jan', sales: 4000 },
          { month: 'Feb', sales: 3000 },
          { month: 'Mar', sales: 5000 },
          { month: 'Apr', sales: 2780 },
          { month: 'May', sales: 1890 },
          { month: 'Jun', sales: 2390 },
          { month: 'Jul', sales: 3490 },
        ];
        
        setSalesData(mockData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Analytics</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Analytics Cards Container */}
        <div className="w-full lg:w-1/2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {analyticsCards.map((card, index) => (
              <AnalyticsCard
                key={index}
                icon={card.icon}
                title={card.title}
                value={card.value}
                percentageChange={card.percentageChange}
                detailsPath={card.detailsPath}
                colorScheme={card.colorScheme}
              />
            ))}
          </div>
        </div>
        
        {/* Sales Chart Container */}
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Monthly Sales</h3>
          <div className="h-[410px]">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;