import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import laptop from '../../assets/dummyIcons/laptop.png';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const orderData = [
  {
    id: '#RB5625',
    date: '08 Sept 2024',
    productImage: laptop,
    customerName: 'Aayush Kumar',
    email: 'kumar.aayush@mail.com',
    phone: '+91 1234567890',
    address: 'abc def street',
    paymentType: 'Credit Card',
    status: 'Accepted',
    statusIcon: laptop
  },
  {
    id: '#RB9652',
    date: '08 Sept 2024',
    productImage: laptop,
    customerName: 'Aakash Agrawal',
    email: 'agrawal.aakash.com',
    phone: '+91 1234567890',
    address: 'abc def street',
    paymentType: 'Credit Card',
    status: 'Delivered',
    statusIcon: laptop
  },
  {
    id: '#RB5984',
    date: '08 Sept 2024',
    productImage: laptop,
    customerName: 'Peter T. Smith',
    email: 'peter.smith@mail.com',
    phone: '+91 1234567890',
    address: 'abc def street',
    paymentType: 'COD',
    status: 'In transit',
    statusIcon: laptop
  },
  {
    id: '#RB3625',
    date: '08 Sept 2024',
    productImage: laptop,
    customerName: 'Shivam Kasera',
    email: 'kasera.shivam@mail.com',
    phone: '+91 1234567890',
    address: 'abc def street',
    paymentType: 'Debit Card',
    status: 'Cancelled',
    statusIcon: laptop
  }
];

const RecentOrders = () => {
  const [rowData] = useState(orderData);

  const columnDefs = [
    { headerName: "Order ID", field: "id" },
    { headerName: "Date", field: "date" },
    {
      headerName: "Product",
      field: "productImage",
      cellRenderer: params => (
        <img 
          src={params.value} 
          alt="Product" 
          style={{ width: '36px', height: '36px', objectFit: 'contain' }} 
          onError={(e) => {
            console.error(`Failed to load product image: ${params.value}`);
            e.target.alt = 'Product image not found';
          }}
        />
      )
    },
    { headerName: "Customer Name", field: "customerName" },
    { headerName: "Email ID", field: "email" },
    { headerName: "Phone No.", field: "phone" },
    { headerName: "Address", field: "address" },
    { headerName: "Payment Type", field: "paymentType" },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: params => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <img 
            src={params.data.statusIcon} 
            alt="Status" 
            style={{ width: '14px', height: '14px', objectFit: 'contain' }} 
            onError={(e) => {
              console.error(`Failed to load status icon: ${params.data.statusIcon}`);
              e.target.alt = 'Status icon not found';
            }}
          />
          <span>{params.value}</span>
        </div>
      )
    }
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Orders</h2>
        <button className="bg-orange-500 text-white py-2 px-4 rounded-lg">
          Create Order
        </button>
      </div>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={5}
      />
    </div>
  );
};

export default RecentOrders;