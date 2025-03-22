import { useState, useEffect } from 'react';
import CategoriesTable from './Utils/CategoriesTable';
import CategoryGrid from './Utils/categoryList';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../services/categoryService';
import MessageBox from '../../Utils/message';

const CategoryPage = () => {
  const navigate = useNavigate();
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        console.log("Categories response: ",response);
        if (response.sucess) {
          setCategoriesData(response.data);
          console.log('Categories:', response.data);
        } else {
          setError('Failed to fetch categories');
        }
      } catch (error) {
        setError('Error fetching categories: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleNewCategory = () => {
    navigate('/category/create-category');
  };

  return (
    <section className="container mx-auto p-6">
      {error && <MessageBox message={error} type="error" onClose={() => setError('')} />}
      
      {/* Category Grid Section */}
      <div className="mb-8">
        {/* <h2 className="text-2xl font-semibold text-slate-700 mb-4">Category Grid</h2> */}
        {/* <CategoryGrid /> */}
      </div>
      
      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm">
        <header className="flex justify-between items-center p-5 border-b border-slate-200">
          <h1 className="text-xl font-semibold text-slate-700">All Categories List</h1>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg" onClick={handleNewCategory}>Add Category</button>
        </header>
        
        {loading ? (
          <div className="p-5 text-center">Loading...</div>
        ) : (
          <CategoriesTable categoriesList={categoriesData} />
        )}
      </div>
    </section>
  );
};

export default CategoryPage;