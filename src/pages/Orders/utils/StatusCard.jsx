import PropTypes from 'prop-types';

function OrderStatusCard({ title, count, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center">
      <div>
        <h3 className="text-base font-semibold text-slate-700">{title}</h3>
        <p className="mt-2 text-2xl text-slate-500">{count}</p>
      </div>
      <div className="w-14 h-14 rounded-xl bg-orange-500 bg-opacity-10 flex justify-center items-center">
        <img loading="lazy" src={icon} alt={title} className="w-8" />
      </div>
    </div>
  );
}

OrderStatusCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
};

export default OrderStatusCard;