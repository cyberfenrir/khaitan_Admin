import PropTypes from 'prop-types';
import Actions from './actions';
import viewIcon from '../assets/view.svg';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';

const CustomerTableHeader = () => {
  return (
    <div role="rowheader" className="contents">
      <div className="flex justify-center py-3.5 px-5 bg-gray-50 border-b border-slate-200">
        <input
          type="checkbox"
          className="w-4 bg-white rounded border border-black border-opacity-20"
          aria-label="Select all customers"
        />
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
        Customer Name
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
        Customer ID
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
        Email
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
        Registration Date
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
        Status
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
        Actions
      </div>
    </div>
  );
};

const CustomerTableRow = ({ customer }) => {
  const actionIcons = [
    { src: viewIcon, bgColor: "bg-slate-100", action: "view" },
    { src: editIcon, bgColor: "bg-orange-500 bg-opacity-10", action: "edit" },
    { src: deleteIcon, bgColor: "bg-red-400 bg-opacity-10", action: "delete" }
  ];

  const handleAction = (action) => {
    switch (action) {
      case 'view':
        console.log(`View customer ${customer.id}`);
        break;
      case 'edit':
        console.log(`Edit customer ${customer.id}`);
        break;
      case 'delete':
        console.log(`Delete customer ${customer.id}`);
        break;
      default:
        break;
    }
  };

  return (
    <div role="row" className="contents group">
      <div className="flex justify-center py-4 px-5 border-b border-slate-200 group-hover:bg-slate-50">
        <input
          type="checkbox"
          className="w-4 h-4 bg-white rounded border border-black border-opacity-20"
          aria-label={`Select ${customer.name}`}
        />
      </div>
      <div className="flex items-center py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center w-10 h-10 rounded-full bg-slate-100">
            <img
              loading="lazy"
              src={customer.avatar}
              alt={customer.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm font-medium text-slate-700">{customer.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{customer.location}</p>
          </div>
        </div>
      </div>
      <div className="py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
        <span className="text-sm text-slate-600">{customer.id}</span>
      </div>
      <div className="py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
        <span className="text-sm text-slate-600">{customer.email}</span>
      </div>
      <div className="py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
        <span className="text-sm text-slate-600">{customer.registrationDate}</span>
      </div>
      <div className="py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          customer.status === 'Active' ? 'bg-green-100 text-green-700' : 
          customer.status === 'Inactive' ? 'bg-gray-100 text-gray-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          {customer.status}
        </span>
      </div>
      <div className="py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
        <Actions icons={actionIcons} onAction={handleAction} />
      </div>
    </div>
  );
};

const CustomerTable = ({ customersList }) => {
  return (
    <div className="w-full bg-white rounded-lg border border-slate-200">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 hidden md:block" />
        
        <div className="overflow-auto">
          <div className="min-w-[980px]">
            <div role="table" className="grid grid-cols-[59px_minmax(240px,1fr)_120px_200px_160px_120px_140px]">
              <CustomerTableHeader />
              <div role="rowgroup" className="contents">
                {customersList.map((customer) => (
                  <CustomerTableRow 
                    key={customer.id} 
                    customer={customer}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CustomerTable.propTypes = {
  customersList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      registrationDate: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['Active', 'Inactive', 'Pending']).isRequired,
      location: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired
};

export default CustomerTable;