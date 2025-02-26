import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bulkAddData, getAllAttributes } from '../../Utils/service';
import { X } from 'lucide-react';
import MessageBox from '../../Utils/message';

function CreateAttributesPage({ onSave, categoryName, categoryId }) {
  const [attributes, setAttributes] = useState([]);
  const [attributeName, setAttributeName] = useState('');
  const [attributeType, setAttributeType] = useState('');
  const [attributeUnit, setAttributeUnit] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [existingAttributes, setExistingAttributes] = useState([]);

  useEffect(() => {
    const fetchAttributes = async () => {
      const response = await getAllAttributes();
      if (response.success) {
        setExistingAttributes(response.data);
      } else {
        console.error('Failed to fetch attributes:', response.message);
      }
    };
    fetchAttributes();
  }, []);

  const handleAddAttribute = () => {
    if (!attributeName.trim() || !attributeType.trim()) {
      setErrorMessage('Please fill all mandatory fields');
      return;
    }
    // Check if attribute with the same name, type, and unit already exists for the same categoryId
    const isDuplicate = existingAttributes.some(attr => 
      attr.name.trim().toLowerCase() === attributeName.trim().toLowerCase() &&
      attr.type.trim().toLowerCase() === attributeType.trim().toLowerCase() &&
      attr.unit.trim().toLowerCase() === attributeUnit.trim().toLowerCase() &&
      String(attr.categoryId) === String(categoryId)
    ) || attributes.some(attr => 
      attr.name.trim().toLowerCase() === attributeName.trim().toLowerCase() &&
      attr.type.trim().toLowerCase() === attributeType.trim().toLowerCase() &&
      attr.unit.trim().toLowerCase() === attributeUnit.trim().toLowerCase() &&
      String(attr.categoryId) === String(categoryId)
    );

    if (isDuplicate) {
      setErrorMessage('This attribute already exists for the same category');
      return;
    }

    const attributeData = {
      name: attributeName.trim(),
      type: attributeType.trim(),
      unit: attributeUnit.trim() || '',
      categoryId: categoryId,
      createdAt: new Date().toISOString()
    };
    setAttributes([...attributes, attributeData]);
    setAttributeName('');
    setAttributeType('');
    setAttributeUnit('');
    setErrorMessage('');
  };

  const handleRemoveAttribute = (indexToRemove) => {
    setAttributes(attributes.filter((_, index) => index !== indexToRemove));
  };

  const handleSelectExistingAttribute = (e) => {
    const selectedAttribute = existingAttributes.find(attr => attr.id === e.target.value);
    if (selectedAttribute) {
      setAttributeName(selectedAttribute.name);
      setAttributeType(selectedAttribute.type);
      setAttributeUnit(selectedAttribute.unit);
      setErrorMessage('');
    }
  };

  const handleSaveAll = async () => {
    if (attributes.length === 0) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await bulkAddData(attributes, 'attributes');
      if (response.success) {
        onSave(attributes);
        setAttributes([]);
        setSuccessMessage('Attributes saved successfully!');
      } else {
        setErrorMessage('Failed to create attributes: ' + response.message);
      }
    } catch (error) {
      setErrorMessage('Error creating attributes: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearFields = () => {
    setAttributeName('');
    setAttributeType('');
    setAttributeUnit('');
  };

  return (
    <section className="flex flex-col max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <header className="px-6 py-5 border-b border-slate-200">
          <h1 className="text-base font-semibold text-slate-700">Create Attributes for {categoryName}</h1>
        </header>
        <main className="p-6">
          <div className="flex flex-col flex-1 px-3 w-full space-y-4">
            {errorMessage && <MessageBox message={errorMessage} type="error" onClose={() => setErrorMessage('')} />}
            {successMessage && <MessageBox message={successMessage} type="success" onClose={() => setSuccessMessage('')} />}
            
            <div>
              <label className="mb-2 text-sm text-slate-500">Select Existing Attribute (Optional)</label>
              <div className="flex gap-2">
                <select
                  onChange={handleSelectExistingAttribute}
                  className="px-4 py-2 bg-white rounded-lg border border-zinc-200 flex-grow"
                  defaultValue=""
                >
                  <option value="">Select Attribute for reference</option>
                  {existingAttributes.map((attr) => (
                    <option key={attr.id} value={attr.id}>
                      {attr.name} ({attr.type} - {attr.unit})
                    </option>
                  ))}
                </select>
                <button
                  onClick={clearFields}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 focus:outline-none transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <label className="mb-2 text-sm text-slate-500">Attribute Name</label>
              <input
                type="text"
                value={attributeName}
                onChange={(e) => setAttributeName(e.target.value)}
                className="px-4 py-2 bg-white rounded-lg border border-zinc-200 w-full"
                placeholder="Enter attribute name..."
              />
            </div>
            
            <div>
              <label className="mb-2 text-sm text-slate-500">Attribute DataType</label>
              <input
                type="text"
                value={attributeType}
                onChange={(e) => setAttributeType(e.target.value)}
                className="px-4 py-2 bg-white rounded-lg border border-zinc-200 w-full"
                placeholder="Enter attribute type..."
              />
            </div>
            
            <div>
              <label className="mb-2 text-sm text-slate-500">Attribute Unit (Optional)</label>
              <input
                type="text"
                value={attributeUnit}
                onChange={(e) => setAttributeUnit(e.target.value)}
                className="px-4 py-2 bg-white rounded-lg border border-zinc-200 w-full"
                placeholder="Enter attribute unit..."
              />
            </div>

            <div>
              <label className="mb-2 text-sm text-slate-500">Added Attributes</label>
              <div className="flex flex-wrap gap-1.5 p-2 bg-white rounded-lg border border-zinc-200 min-h-[50px]">
                {attributes.map((attr, index) => (
                  <div key={index} className="flex items-center bg-orange-500 text-white rounded-lg px-2 py-1">
                    <span className="text-xs">{attr.name} ({attr.type} - {attr.unit})</span>
                    <button
                      onClick={() => handleRemoveAttribute(index)}
                      className="ml-2 opacity-75 hover:opacity-100 focus:outline-none"
                      disabled={isSubmitting}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                {attributes.length === 0 && (
                  <span className="text-sm text-slate-400">No attributes added yet</span>
                )}
              </div>
            </div>
          </div>
        </main>
        <footer className="px-6 py-5 border-t border-slate-200 flex gap-4">
          <button 
            onClick={handleAddAttribute}
            disabled={!attributeName.trim() || isSubmitting}
            className="flex-1 px-4 py-2.5 bg-gray-500 text-white rounded-xl border border-gray-500 text-sm font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Attribute
          </button>
          <button 
            onClick={handleSaveAll}
            disabled={attributes.length === 0 || isSubmitting}
            className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-xl border border-orange-500 text-sm font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save All Attributes'}
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