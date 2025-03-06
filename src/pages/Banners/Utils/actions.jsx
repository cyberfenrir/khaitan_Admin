import PropTypes from 'prop-types';

const Action = ({ src, bgColor, action, onClick }) => {
  return (
    <button
      className={`p-2 rounded-lg ${bgColor} transition-colors`}
      aria-label={action}
      onClick={onClick}
    >
      <img src={src} alt={action} className="w-4 h-4" />
    </button>
  );
};

Action.propTypes = {
  src: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Action;