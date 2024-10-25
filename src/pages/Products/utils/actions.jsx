import PropTypes from 'prop-types';

const Actions = ({ icons, onAction }) => {
  return (
    <div className="flex gap-2">
      {icons.map((icon, index) => (
        <button
          key={index}
          className={`p-2 rounded-lg ${icon.bgColor}`}
          onClick={() => onAction(icon.action)}
        >
          <img
            src={icon.src}
            alt={icon.action}
            className="w-4 h-4 object-contain"
          />
        </button>
      ))}
    </div>
  );
};

Actions.propTypes = {
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      bgColor: PropTypes.string.isRequired,
      action: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAction: PropTypes.func.isRequired,
};

export default Actions;