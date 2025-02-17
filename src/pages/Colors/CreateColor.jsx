import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addColor } from '../../Utils/service';
import MessageBox from '../../Utils/message';

const CreateColor = () => {
  const [name, setName] = useState('');
  const [hexCode, setHexCode] = useState('#000000');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !hexCode.trim()) {
      setErrorMessage('Please fill all fields');
      return;
    }

    const newColor = { name, hexCode };
    try {
      await addColor(newColor);
      navigate('/colors/colors');
    } catch (error) {
      console.error('Failed to create color:', error);
    }
  };

  return (
    <section className="container mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-4 text-slate-600">Add New Color</h1>
        {errorMessage && <MessageBox message={errorMessage} type="error" onClose={() => setErrorMessage('')} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Color Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="hexCode" className="block text-sm font-medium text-gray-700 mb-1">
              Hex Code
            </label>
            <input
              type="color"
              id="hexCode"
              value={hexCode}
              onChange={(e) => setHexCode(e.target.value)}
              className="w-16 h-10 p-1 border border-gray-300 rounded cursor-pointer"
              required
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-lg">
            Add Color
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateColor;