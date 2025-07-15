import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import laptop from '../../assets/dummyIcons/laptop.png';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getAllOrders } from '../../services/orderService';
import { getAllUsers } from '../../services/userService';
import { convertDateTime } from '../../Utils/timeConversion';

// const orderData = [
//   {
//     id: '#RB5625',
//     date: '08 Sept 2024',
//     productImage: laptop,
//     customerName: 'Aayush Kumar',
//     email: 'kumar.aayush@mail.com',
//     phone: '+91 1234567890',
//     address: 'abc def street',
//     paymentType: 'Credit Card',
//     status: 'Accepted',
//     statusIcon: laptop
//   },
//   {
//     id: '#RB9652',
//     date: '08 Sept 2024',
//     productImage: laptop,
//     customerName: 'Aakash Agrawal',
//     email: 'agrawal.aakash.com',
//     phone: '+91 1234567890',
//     address: 'abc def street',
//     paymentType: 'Credit Card',
//     status: 'Delivered',
//     statusIcon: laptop
//   },
//   {
//     id: '#RB5984',
//     date: '08 Sept 2024',
//     productImage: laptop,
//     customerName: 'Peter T. Smith',
//     email: 'peter.smith@mail.com',
//     phone: '+91 1234567890',
//     address: 'abc def street',
//     paymentType: 'COD',
//     status: 'In transit',
//     statusIcon: laptop
//   },
//   {
//     id: '#RB3625',
//     date: '08 Sept 2024',
//     productImage: laptop,
//     customerName: 'Shivam Kasera',
//     email: 'kasera.shivam@mail.com',
//     phone: '+91 1234567890',
//     address: 'abc def street',
//     paymentType: 'Debit Card',
//     status: 'Cancelled',
//     statusIcon: laptop
//   }
// ];

const RecentOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrderData(data.data || []);
    }
    catch(err){
      console.log("Recent Orders Error: ",err);
    }
  }

  const fetchUsers = async () => {
    const result = await getAllUsers();
    setUsers(result.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchOrders();
  }, []);

  const getCustomerName = (userId) => {
    const customer = users.find(user => user?.id === userId);
    return customer;
  };

  const ordersWithCustomerNames = (orderData.length>0 )? orderData.filter((order) => {
    return order?.status != "pending";
  }).map(order => ({
    ...order,
    items: order?.products.length,
    createdAt: convertDateTime(order?.createdAt),
    customer: getCustomerName(order?.userId)?.name,
    phone: getCustomerName(order?.userId)?.phoneNumber,
    address: getCustomerName(order?.userId)?.address,
    email: getCustomerName(order?.userId)?.email
  })): [];


  const columnDefs = [
    { headerName: "Order ID", field: "id" },
    { headerName: "Date", field: "createdAt" },
    {
      headerName: "Items",
      field: "items",
    },
    { headerName: "Customer Name", field: "customer" },
    { headerName: "Phone No.", field: "phone" },
    { headerName: "Email", field: "email" },
    // { headerName: "Address", field: "address" },
    { headerName: "Order Status", field: "deliveryStatus" },
    {
      headerName: "Payment Status",
      field: "status",
      // cellRenderer: params => (
      //   <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      //     <img 
      //       src={params.data.statusIcon} 
      //       alt="Status" 
      //       style={{ width: '14px', height: '14px', objectFit: 'contain' }} 
      //       onError={(e) => {
      //         console.error(`Failed to load status icon: ${params.data.statusIcon}`);
      //         e.target.alt = 'Status icon not found';
      //       }}
      //     />
      //     <span>{params.value}</span>
      //   </div>
      // )
    }
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Orders</h2>
      </div>
      {ordersWithCustomerNames.length === 0 ? (
        <div className="text-center text-gray-500 py-8 text-2xl font-bold">No orders available</div>
      ) : (
        <AgGridReact
          rowData={ordersWithCustomerNames}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={5}
        />
      )}
    </div>
  );
};

export default RecentOrders;