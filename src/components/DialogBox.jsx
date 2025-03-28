import React from 'react';

function DialogBox({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <p className="text-center text-gray-700">{message}</p>
        <div className="mt-4 flex justify-center">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg" 
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DialogBox;
