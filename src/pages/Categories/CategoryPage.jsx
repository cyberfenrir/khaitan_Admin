import { useState } from 'react';
import CategoriesTable from './Utils/CategoriesTable';
import CategoryGrid from './Utils/categoryList';
import prod1 from './Utils/prod1.png'
import prod2 from './Utils/prod2.png'
import { useNavigate } from 'react-router-dom';

const CategoryPage = () => {

  const navigate = useNavigate();

  const [categoriesData, setCategoriesData] = useState([
    { 
      id: 'FS16276', 
      name: "Fashion Men, Women & Kid's", 
      description: "Comprehensive fashion collection",
      created: '2024-01-15',
      status: 'Active', 
      productCount: 46233, 
      icon: prod1
    },
    { 
      id: 'HB73029', 
      name: 'Women Hand Bag', 
      description: "Premium handbag collection",
      created: '2024-02-01',
      status: 'Active', 
      productCount: 2739, 
      icon: prod2
    },
  ]);

  const handleNewCategory = () => {
    navigate('/category/create-category');
  };

  return (   
    <section className="container mx-auto p-6">
      {/* Category Grid Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Category Grid</h2>
        <CategoryGrid />
      </div>
      
      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm">
        <header className="flex justify-between items-center p-5 border-b border-slate-200">
          <h1 className="text-xl font-semibold text-slate-700">All Categories List</h1>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg" onClick={handleNewCategory}>Add Category</button>
        </header>
        
        <CategoriesTable categoriesList={categoriesData} />
      </div>
    </section>
  );
};

export default CategoryPage;