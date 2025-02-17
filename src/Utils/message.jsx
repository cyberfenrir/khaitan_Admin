import PropTypes from 'prop-types';

const MessageBox = ({ message, type, onClose }) => {
  return (
    <div className={`flex items-center p-4 mb-4 text-sm rounded-lg shadow-lg ${type === 'error' ? ' text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400' : 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400'}`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white">
          &times;
        </button>
      </div>
    </div>
  );
};

MessageBox.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MessageBox;