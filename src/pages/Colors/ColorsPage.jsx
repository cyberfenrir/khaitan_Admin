import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorsTable from './ColorsTable';

const ColorsPage = () => {
  const [colorsData, setColorsData] = useState([
    { id: '1', name: 'Red', hexCode: '#FF0000' },
    { id: '2', name: 'Green', hexCode: '#00FF00' },
    { id: '3', name: 'Blue', hexCode: '#0000FF' },
  ]);

  const navigate = useNavigate();

  return (
    <section className="container mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm">
        <header className="flex justify-between items-center p-5 border-b border-slate-200">
          <h1 className="text-xl font-semibold text-slate-700">All Colors List</h1>
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-lg"
            onClick={() => navigate('/colors/create')}
          >
            Add Color
          </button>
        </header>
        <ColorsTable colorsList={colorsData} />
      </div>
    </section>
  );
};

export default ColorsPage;