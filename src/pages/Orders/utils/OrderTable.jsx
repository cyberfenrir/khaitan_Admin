import OrderTableRow from './OrderTableRow';

const orders = [
  {
    id: '#583488/80',
    createdAt: 'Oct 09 , 2024',
    customer: 'Gail C. Anderson',
    priority: 'Normal',
    total: '$1,230.00',
    paymentStatus: 'Unpaid',
    items: '4',
    deliveryNumber: '-',
    orderStatus: 'Draft'
  },
  {
    id: '#456754/80',
    createdAt: 'Oct 09 , 2024',
    customer: 'Jung S. Ayala',
    priority: 'Normal',
    total: '$987.00',
    paymentStatus: 'Paid',
    items: '2',
    deliveryNumber: '-',
    orderStatus: 'Packaging'
  },
  {
    id: '#578246/80',
    createdAt: 'Oct 09 , 2024',
    customer: 'David A. Arnold',
    priority: 'High',
    total: '$1,478.00',
    paymentStatus: 'Paid',
    items: '5',
    deliveryNumber: '#D-57837678',
    orderStatus: 'Completed'
  },
  {
    id: '#348930/80',
    createdAt: 'Oct 09 , 2024',
    customer: 'Cecile D. Gordon',
    priority: 'Normal',
    total: '$720.00',
    paymentStatus: 'Refund',
    items: '4',
    deliveryNumber: '-',
    orderStatus: 'Canceled'
  },
  // Add more sample orders here for testing
];

function OrderTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[1000px] bg-white rounded-xl shadow-sm">
        <thead>
          <tr className="text-sm font-bold bg-gray-50 text-slate-500">
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">Created at</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Priority</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Payment Status</th>
            <th className="p-3 text-left">Items</th>
            <th className="p-3 text-left">Delivery Number</th>
            <th className="p-3 text-left">Order Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <OrderTableRow key={index} {...order} />
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center p-4 border-t border-slate-200">
        <button className="px-3 py-1 text-sm bg-white rounded-xl border border-slate-200">
          Previous
        </button>
        <div className="flex">
          <button className="w-8 h-8 text-sm text-white bg-orange-500 border border-orange-500">
            1
          </button>
          <button className="w-8 h-8 text-sm bg-white border border-slate-200">
            2
          </button>
          <button className="w-8 h-8 text-sm bg-white border border-slate-200">
            3
          </button>
        </div>
        <button className="px-3 py-1 text-sm bg-white rounded-xl border border-slate-200">
          Next
        </button>
      </div>
    </div>
  );
}

export default OrderTable;