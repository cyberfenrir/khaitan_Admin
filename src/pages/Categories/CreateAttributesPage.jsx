import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const TagInput = ({ label, tags, onRemoveTag }) => (
  <div className="flex flex-col flex-1 px-3 w-full">
    <label className="mb-2 text-sm text-slate-500">{label}</label>
    <div className="flex flex-wrap gap-1.5 p-2 bg-white rounded-lg border border-zinc-200">
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
  </div>
);

function CreateAttributesPage() {
  const location = useLocation();
  const categoryName = location.state?.category || 'Unknown Category';
  const [attributes, setAttributes] = useState([]);

  const handleRemoveAttribute = (indexToRemove, newAttribute = null) => {
    if (newAttribute) {
      setAttributes([...attributes, newAttribute]);
    } else {
      setAttributes(attributes.filter((_, index) => index !== indexToRemove));
    }
  };

  return (
    <section className="flex flex-col max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <header className="px-6 py-5 border-b border-slate-200">
          <h1 className="text-base font-semibold text-slate-700">Create Attributes for {categoryName}</h1>
        </header>
        <main className="p-6">
          <TagInput label="Attributes" tags={attributes} onRemoveTag={handleRemoveAttribute} />
        </main>
        <footer className="px-6 py-5 border-t border-slate-200">
          <button className="w-full px-4 py-2.5 bg-orange-500 text-white rounded-xl border border-orange-500 text-sm font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors">
            Save Attributes
          </button>
        </footer>
      </div>
    </section>
  );
}

export default CreateAttributesPage;
