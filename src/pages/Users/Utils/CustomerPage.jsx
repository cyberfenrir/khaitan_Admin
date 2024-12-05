import CustomerTable from './CustomerTable';


const customers = [
    {
      id: "CUS001",
      name: "John Doe",
      email: "john.doe@example.com",
      registrationDate: "2024-01-15",
      status: "Active",
      location: "New York, USA",
      avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/c7fd0e71825c4aafc1f3902c076a18efbe30e21caa18f09a8a3b2806fd5e1708?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9https://cdn.builder.io/api/v1/image/assets/TEMP/c7fd0e71825c4aafc1f3902c076a18efbe30e21caa18f09a8a3b2806fd5e1708?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9"
    },
    {
      id: "CUS002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      registrationDate: "2024-02-01",
      status: "Active",
      location: "Los Angeles, USA",
      avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/c7fd0e71825c4aafc1f3902c076a18efbe30e21caa18f09a8a3b2806fd5e1708?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9"
    },
    // Add more customers as needed
];

const CustomerPage = () => {
  return (
    <div className="p-6">
      <CustomerTable customersList={customers} />
    </div>
  );
};

export default CustomerPage;