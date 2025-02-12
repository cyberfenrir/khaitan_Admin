import { useState } from 'react';
import CreateAttributesPage from './CreateAttributesPage';
import { X } from 'lucide-react';
import { createCategory } from '../../Middlewares/data/categoriesapi';
import {addData} from '../../Utils/service';

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
  <div className="flex flex-col flex-1 px-3 w-full">
    <label className="mb-2 text-sm text-slate-500">{label}</label>
    <div className="flex items-center gap-2">
      <div className="flex flex-wrap gap-1.5 p-2 bg-white rounded-lg border border-zinc-200 flex-grow">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center bg-orange-500 text-white rounded-lg px-2 py-1">
            <span className="text-xs">{tag}</span>
            <button
              onClick={() => onRemoveTag(index)}
              className="ml-2 opacity-75 hover:opacity-100 focus:outline-none"
              aria-label={`Remove ${tag} tag`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        ))}
        <input
          type="text"
          className="flex-grow min-w-[60px] bg-transparent focus:outline-none"
          placeholder="Add an attribute..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              onRemoveTag(null, e.target.value.trim());
              e.target.value = '';
            }
          }}
        />
      </div>
      <button
        onClick={onCreateAttribute}
        className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
      >
        Create Attribute
        
      </button>
    </div>
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
  const [isActive, setIsActive] = useState(true);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  
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
    setIsDialogOpen(true);
    console.log("Redirecting to create attribute page...");
  };

  const handleSaveAttributes = (newAttribute) => {
    setTags([...tags, newAttribute]);
    setIsDialogOpen(false);
  };

  const handleSaveCategory = async () => {
    const categoryData = {
      name: categoryName,
      description: categoryDescription,
    };
    console.log(categoryData);
    await createCategory(categoryData);
    await addData(categoryData, 'categories');
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
      {isDialogOpen == true && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className='bg-white rounded-lg p-6 flex flex-col'>
            <div className='flex justify-end' onClick={handleClose}><X/></div>
            <CreateAttributesPage onSave={handleSaveAttributes} categoryName={categoryName} />
          </div>
        </div>
      )}
    </section>
  );
}

export default CreateCategoryPage;
