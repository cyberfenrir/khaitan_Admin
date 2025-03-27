import { getAllOrders } from '../../../services/orderService';
import { getAllUsers } from '../../../services/userService';
import OrderTableRow from './OrderTableRow';
import { useState, useEffect } from 'react';

function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getAllOrders();
      setOrders(data.data);
    };

    const fetchUsers = async () => {
      const result = await getAllUsers();
      setUsers(result.data);
    };

    fetchOrders();
    fetchUsers();
  }, []);

  const getCustomerName = (userId) => {
    const customer = users.find(user => user.id === userId);
    return customer ? customer.name : 'Unknown';
  };

  const ordersWithCustomerNames = orders.map(order => ({
    ...order,
    customer: getCustomerName(order.userId)
  }));

  // Calculate number of pages (rounding up)
  const pageCount = Math.ceil(orders.length / 5);

  // Generate page buttons dynamically
  const pageButtons = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[1000px] bg-white rounded-xl shadow-sm">
        <thead>
          <tr className="text-sm font-bold bg-gray-50 text-slate-500">
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">Created at</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Payment Status</th>
            <th className="p-3 text-left">Items</th>
            <th className="p-3 text-left">Order Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {ordersWithCustomerNames.map((order, index) => (
            <OrderTableRow key={index} {...order} />
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center p-4 border-t border-slate-200">
        <button className="px-3 py-1 text-sm bg-white rounded-xl border border-slate-200">
          Previous
        </button>
        <div className="flex">
          {pageButtons.map((page) => (
            <button 
              key={page} 
              className={`w-8 h-8 text-sm ${
                page === 1 
                  ? 'text-white bg-orange-500 border border-orange-500' 
                  : 'bg-white border border-slate-200'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="px-3 py-1 text-sm bg-white rounded-xl border border-slate-200">
          Next
        </button>
      </div>
    </div>
  );
}

export default OrderTable;