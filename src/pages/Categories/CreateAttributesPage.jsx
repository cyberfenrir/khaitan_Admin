import { useState } from 'react';
import PropTypes from 'prop-types';
import { createAttribute } from '../../Utils/service';

function CreateAttributesPage({ onSave, categoryName, categoryId }) {
  const [attributes, setAttributes] = useState([]);
  const [attributeName, setAttributeName] = useState('');
  const [attributeType, setAttributeType] = useState('');
  const [attributeUnit, setAttributeUnit] = useState('');

  const handleSave = async () => {
    if (attributeName.trim()) {
      const attributeData = {
        name: attributeName.trim(),
        type: attributeType.trim(),
        unit: attributeUnit.trim(),
        categoryId: categoryId
      };
      console.log('Attribute Data payload:', attributeData);
      try {
        const response = await createAttribute(attributeData);
        if (response.success) {
          setAttributes([...attributes, attributeData]);  
          onSave(attributeData);
          setAttributeName('');
          setAttributeType('');
          setAttributeUnit('');
        } else {
          console.error('Failed to create attribute:', response.message);
        }
      } catch (error) {
        console.error('Error creating attribute:', error);
      }
    }
  };

  return (
    <section className="flex flex-col max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <header className="px-6 py-5 border-b border-slate-200">
          <h1 className="text-base font-semibold text-slate-700">Create Attributes for {categoryName}</h1>
        </header>
        <main className="p-6">
          <div className="flex flex-col flex-1 px-3 w-full">
            <label className="mb-2 text-sm text-slate-500">Attribute Name</label>
            <input
              type="text"
              value={attributeName}
              onChange={(e) => setAttributeName(e.target.value)}
              className="px-4 py-2 bg-white rounded-lg border border-zinc-200"
              placeholder="Enter attribute name..."
            />
            <label className="mb-2 text-sm text-slate-500">Attribute DataType</label>
            <input
              type="text"
              value={attributeType}
              onChange={(e) => setAttributeType(e.target.value)}
              className="px-4 py-2 bg-white rounded-lg border border-zinc-200"
              placeholder="Enter attribute type..."
            />
            <label className="mb-2 text-sm text-slate-500">Attribute Unit</label>
            <input
              type="text"
              value={attributeUnit}
              onChange={(e) => setAttributeUnit(e.target.value)}
              className="px-4 py-2 bg-white rounded-lg border border-zinc-200"
              placeholder="Enter attribute Unit..."
            />
          </div>
        </main>
        <footer className="px-6 py-5 border-t border-slate-200">
          <button onClick={handleSave} className="w-full px-4 py-2.5 bg-orange-500 text-white rounded-xl border border-orange-500 text-sm font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors">
            Save Attributes
          </button>
        </footer>
      </div>
    </section>
  );
}

CreateAttributesPage.propTypes = {
  onSave: PropTypes.func.isRequired,
  categoryName: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
};

export default CreateAttributesPage;