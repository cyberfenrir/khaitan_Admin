import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorsTable from './ColorsTable';
import { getAllColors, deleteColor } from '../../services/colorService';

const ColorsPage = () => {
  const [colorsData, setColorsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchColors = async () => {
      const result = await getAllColors();
      if (result.success) {
        setColorsData(result.data);
      } else {
        console.error(result.error);
      }
    };

    fetchColors();
  }, []);



  const handleEditColor = (colorId) => {
    navigate(`/colors/edit/${colorId}`);
  };

  const handleDeleteColor = async (colorId) => {
    const result = await deleteColor(colorId);
    if (result.success) {
      setColorsData(colorsData.filter(color => color.id !== colorId));
    } else {
      console.error(result.error);
    }
  };

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
        <ColorsTable
          colorsList={colorsData}
          onEditColor={handleEditColor}
          onDeleteColor={handleDeleteColor}
        />
      </div>
    </section>
  );
};

export default ColorsPage;