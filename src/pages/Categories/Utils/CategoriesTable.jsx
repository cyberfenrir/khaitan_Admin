import PropTypes from 'prop-types';
import Actions from './actions';
import viewIcon from '../assets/view.svg';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAttributesbyCategory, deleteCategory } from '../../../Utils/service';
import MessageBox from '../../../Utils/message';

const CategoriesTableHeader = () => {
  return (
    <div role="rowheader" className="contents">
      <div className="py-1 px-1 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
        &nbsp;
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
        Category Name
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
        Category ID
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
        Description
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
        Status
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
        Actions
      </div>
    </div>
  );
};

const CategoriesTableRow = ({ category, onDelete }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const actionIcons = [
    { src: viewIcon, bgColor: "bg-slate-100", action: "view" },
    { src: editIcon, bgColor: "bg-orange-500 bg-opacity-10", action: "edit" },
    { src: deleteIcon, bgColor: "bg-red-400 bg-opacity-10", action: "delete" }
  ];

  const handleAction = async (action) => {
    switch (action) {
      case 'view':
        try {
          const response = await getAttributesbyCategory(parseInt(category.id));
          if (response.success) {
            setAttributes(response.data);
            setShowPopup(true);
          } else {
            setErrorMessage('Failed to fetch attributes');
          }
        } catch (error) {
          setErrorMessage('Error fetching attributes: ' + error.message);
        }
        break;
      case 'edit':
        navigate(`/category/edit-category/${category.id}`);
        break;
      case 'delete':
        try {
          const catId = parseInt(category.id);
          const result = await deleteCategory(catId); 
          if (result.success) {
            console.log('Category deleted:', catId);
            onDelete(category.id); 
          } else {
            console.error('Error:', result.error, category.id);
          }
        } catch (error) {
          setErrorMessage('Error deleting category: ' + error.message);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div role="row" className="contents group hover:bg-slate-50">
        <div className="py-1 px-1 border-b border-slate-200 group-hover:bg-slate-50">
          &nbsp;
        </div>
        <div className="flex items-center py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <h2 className="text-sm font-medium text-slate-700">{category.name}</h2>
            </div>
          </div>
        </div>
        <div className="py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
          <span className="text-sm text-slate-600">{category.id}</span>
        </div>
        <div className="py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
          <span className="text-sm text-slate-600">{category.description}</span>
        </div>
        <div className="py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            category.status === 'Active' ? 'bg-green-100 text-green-700' : 
            category.status === 'Inactive' ? 'bg-gray-100 text-gray-700' :
            'bg-yellow-100 text-yellow-700'
          }`}>
            {category.status}
          </span>
        </div>
        <div className="py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
          <Actions icons={actionIcons} onAction={handleAction} />
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-1/2">
            <h2 className="text-xl font-semibold mb-4">Attributes for {category.name}</h2>
            <ul className="list-disc pl-5">
              {attributes.map(attr => (
                <li key={attr.id} className="mb-2">
                  <strong>{attr.name}</strong>: {attr.type} - {attr.unit}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {errorMessage && <MessageBox message={errorMessage} type="error" onClose={() => setErrorMessage('')} />}
    </>
  );
};

const CategoriesTable = ({ categoriesList }) => {
  const [categories, setCategories] = useState(categoriesList);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = (categoryId) => {
    setCategories(categories.filter(category => category.id !== categoryId));
  };

  return (
    <div className="w-full bg-white rounded-lg border border-slate-200">
      {errorMessage && <MessageBox message={errorMessage} type="error" onClose={() => setErrorMessage('')} />}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 hidden md:block" />
        
        <div className="overflow-auto">
          <div className="min-w-[1080px]">
            <div role="table" className="grid grid-cols-6">
              <CategoriesTableHeader />
              <div role="rowgroup" className="contents"></div>
                {categories.map((category) => (
                  <CategoriesTableRow 
                    key={category.id} 
                    category={category}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

CategoriesTable.propTypes = {
  categoriesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['Active', 'Inactive', 'Pending']).isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired
};

export default CategoriesTable;