// import React from 'react';
import { Users, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';

const Dashboard = () => {
  // Hardcoded analytics data
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
      value: `$${analyticsData.revenue.total.toLocaleString()}`,
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
  );
};

export default Dashboard;