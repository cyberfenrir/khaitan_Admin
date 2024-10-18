import PropTypes from 'prop-types';
import Actions from './actions';

import viewIcon from '../assets/view.svg';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';

function OrderTableRow({ id, createdAt, customer, priority, total, paymentStatus, items, deliveryNumber, orderStatus }) {
  const getPaymentStatusClass = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-500 text-white';
      case 'Unpaid':
      case 'Refund':
        return 'bg-slate-100 text-slate-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getOrderStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'border-green-500 text-green-500';
      case 'Canceled':
        return 'border-red-400 text-red-400';
      case 'Packaging':
        return 'border-amber-400 text-amber-400';
      default:
        return 'border-slate-500 text-slate-500';
    }
  };

  const actionIcons = [
    { src: viewIcon, bgColor: "bg-slate-100", action: "view" },
    { src: editIcon, bgColor: "bg-orange-500 bg-opacity-10", action: "edit" },
    { src: deleteIcon, bgColor: "bg-red-400 bg-opacity-10", action: "delete" }
  ];

  const handleAction = (action) => {
    switch (action) {
      case 'view':
        console.log(`View order ${id}`);
        break;
      case 'edit':
        console.log(`Edit order ${id}`);
        break;
      case 'delete':
        console.log(`Delete order ${id}`);
        break;
      default:
        break;
    }
  };

  return (
    <tr className="border-b border-slate-200 text-sm text-slate-500">
      <td className="p-3">{id}</td>
      <td className="p-3">{createdAt}</td>
      <td className="p-3 text-orange-500">{customer}</td>
      <td className="p-3">{priority}</td>
      <td className="p-3">{total}</td>
      <td className="p-3">
        <span className={`px-2 py-1 rounded ${getPaymentStatusClass(paymentStatus)}`}>
          {paymentStatus}
        </span>
      </td>
      <td className="p-3">{items}</td>
      <td className="p-3">{deliveryNumber}</td>
      <td className="p-3">
        <span className={`px-2 py-1 rounded border ${getOrderStatusClass(orderStatus)}`}>
          {orderStatus}
        </span>
      </td>
      <td className="p-3">
        <Actions icons={actionIcons} onAction={(action) => handleAction(action)} />
      </td>
    </tr>
  );
}

OrderTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  customer: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  paymentStatus: PropTypes.string.isRequired,
  items: PropTypes.string.isRequired,
  deliveryNumber: PropTypes.string.isRequired,
  orderStatus: PropTypes.string.isRequired,
};

export default OrderTableRow;