import { useState } from 'react';

const FormField = ({ label, value }) => (
  <div className="flex flex-col flex-1 px-3 text-sm text-slate-500 w-full">
    <label className="mb-2">{label}</label>
    <input
      type="text"
      value={value}
      readOnly
      className="px-4 py-2 bg-white rounded-lg border border-zinc-200"
    />
  </div>
);

const ComboBox = ({ label, value }) => (
  <div className="flex flex-col flex-1 px-3 w-full">
    <label className="mb-2 text-sm text-slate-500">{label}</label>
    <div className="relative">
      <select
        value={value}
        className="w-full px-4 py-2.5 bg-white rounded-lg border border-zinc-200 text-sm text-slate-500 appearance-none"
      >
        <option value={value}>{value}</option>
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
);

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
        placeholder="Add a tag..."
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

function RolesInformation() {
  const [tags, setTags] = useState(['Data', 'Manager']);
  const [isActive, setIsActive] = useState(true);

  const handleRemoveTag = (indexToRemove, newTag = null) => {
    if (newTag) {
      setTags([...tags, newTag]);
    } else {
      setTags(tags.filter((_, index) => index !== indexToRemove));
    }
  };

  return (
    <section className="flex flex-col max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <header className="px-6 py-5 border-b border-slate-200">
          <h1 className="text-base font-semibold text-slate-700">Roles Information</h1>
        </header>
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Roles Name" value="Workspace Manager" />
            <ComboBox label="Add Workspace" value="Facebook" />
            <TagInput label="Tag" tags={tags} onRemoveTag={handleRemoveTag} />
            <FormField label="User Name" value="Gaston Lapierre" />
          </div>
          <div className="mt-6">
            <h2 className="text-sm text-slate-500 mb-4">User Status</h2>
            <div className="flex gap-6">
              <StatusToggle
                label="Active"
                checked={isActive}
                onChange={() => setIsActive(true)}
              />
              <StatusToggle
                label="Inactive"
                checked={!isActive}
                onChange={() => setIsActive(false)}
              />
            </div>
          </div>
        </main>
        <footer className="px-6 py-5 border-t border-slate-200">
          <button className="w-full px-4 py-2.5 bg-orange-500 text-white rounded-xl border border-orange-500 text-sm font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors">
            Save Change
          </button>
        </footer>
      </div>
    </section>
  );
}

export default RolesInformation;