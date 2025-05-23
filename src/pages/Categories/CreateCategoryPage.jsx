import { useState } from 'react';
import CreateAttributesPage from './CreateAttributesPage';
import { X } from 'lucide-react';
import MessageBox from '../../Utils/message';
import { createCategory } from '../../services/categoryService';

const FormField = ({ label, value, placeholder, onChange }) => (
  <div className="flex flex-col flex-1 px-3 text-sm text-slate-500 w-full">
    <label className="mb-2">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="px-4 py-2 bg-white rounded-lg border border-zinc-200"
    />
  </div>
);

const TagInput = ({ label, tags, onRemoveTag, onCreateAttribute }) => (
  <div className="flex flex-1 ">
   
      <button
        onClick={onCreateAttribute}
        className="h-10 px-5 m-2  bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
      >
        Create Attribute
      </button>
    </div>
 
);

const StatusToggle = ({ label, checked, onChange }) => (
  <label className="flex items-center cursor-pointer">
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <div className={`w-10 h-6 ${checked ? 'bg-orange-500' : 'bg-gray-200'} rounded-full shadow-inner`}></div>
      <div className={`absolute w-4 h-4 bg-white rounded-full shadow inset-y-1 left-1 transition-transform ${checked ? 'transform translate-x-full' : ''}`}></div>
    </div>
    <span className="ml-3 text-sm text-slate-500">{label}</span>
  </label>
);

function CreateCategoryPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleRemoveTag = (indexToRemove, newTag = null) => {
    if (newTag) {
      setTags([...tags, newTag]);
    } else {
      setTags(tags.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleCreateAttribute = () => {
    if (!categoryId) {
      setMessage('Please specify Category details first.');
      setMessageType('error');
      return;
    }
    setIsDialogOpen(true);
  };

  const handleSaveAttributes = (newAttribute) => {
    setTags(prevTags => [...prevTags, newAttribute]);
    setIsDialogOpen(false);
  };

  const handleSaveCategory = async () => {
    if (!categoryName.trim() || !categoryDescription.trim()) {
      setMessage('Please specify Category details first.');
      setMessageType('error');
      return;
    }

    const categoryData = {
      name: categoryName,
      description: categoryDescription,
    };
    console.log(categoryData);
    // const response = await addData(categoryData, 'categories');
    const response = await createCategory(categoryName, categoryDescription);
    console.log("Create Category Response: ",response);
    if (response.sucess) {
      setCategoryId(response.data.id);
      setMessage('Category Created! Please assign Attributes.');
      setMessageType('success');
    } else {
      setMessage('Failed to create category.');
      setMessageType('error');
    }
  };

  return (
    <section className="flex flex-col max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <header className="px-6 py-5 border-b border-slate-200">
          <h1 className="text-base font-semibold text-slate-700">Category Information</h1>
        </header>
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Category Name" value={categoryName} placeholder="Category Name" onChange={(e) => setCategoryName(e.target.value)} />
            <FormField label="Category Description" value={categoryDescription} placeholder="Description" onChange={(e) => setCategoryDescription(e.target.value)} />
            <TagInput label="Attributes" tags={tags} onRemoveTag={handleRemoveTag} onCreateAttribute={handleCreateAttribute} />
          </div>
        </main>
        <footer className="px-6 py-5 border-t border-slate-200 flex justify-center ">
          <button onClick={handleSaveCategory} className="w-1/3 px-4 py-2.5 bg-orange-500 text-white rounded-xl border border-orange-500 text-sm font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors">
            Save Changes
          </button>
        </footer>
      </div>
      {message && (
        <div className="mt-4">
          <MessageBox message={message} type={messageType} onClose={() => setMessage('')} />
        </div>
      )}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className='bg-white rounded-lg p-6 flex flex-col'>
            <div className='flex justify-end' onClick={handleClose}><X/></div>
            <CreateAttributesPage onSave={handleSaveAttributes} categoryName={categoryName} categoryId={categoryId} />
          </div>
        </div>
      )}
    </section>
  );
}

export default CreateCategoryPage;