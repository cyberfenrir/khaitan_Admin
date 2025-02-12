import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProductPricing = ({ onNext }) => {
  const [category, setCategory] = useState('fan');
  const productCategories = [
    { value: "fan", label: "Fan" },
    { value: "light", label: "Light" },
  ];

  const attributes = [
    {
      slug: "fan",
      attributes: [
        {
          label: "Brand",
          type: "text",
          placeholder: "Enter Brand Name",
          cols: 1
        },
        {
          label: "Weight",
          type: "text",
          placeholder: "Enter Fan Weight",
          cols: 2
        },
        {
          label: "Blades",
          type: "number",
          placeholder: "Enter no. of blades",
          cols: 1
        }
      ]
    },
    {
      slug: "light",
      attributes: [
        {
          label: "Brand",
          type: "text",
          cols: 1,
          placeholder: "Enter Brand Name",
        },
        {
          label: "Light Type",
          type: "select",
          placeholder: "Select Light Type",
          options: [{ value: "LED", label: "LED" }, { value: "CFL", label: "CFL" }],
          cols: 1
        }
      ]
    }
  ];

  const [currentAttributes, setCurrentAttributes] = useState({});

  const handleCategoryChange = () => {
    setCurrentAttributes(attributes.find((attr) => attr.slug === category));
  };

  useEffect(() => {
    handleCategoryChange(category);
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    onNext(data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Product Pricing</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentAttributes.attributes && currentAttributes.attributes.map((attr) => (
            <>
              {attr.type !== "select" && (
                <div className={`flex flex-col col-span-${attr.cols}`}>
                  <label htmlFor={attr.label}>{attr.label}</label>
                  <input 
                    id={attr.label} 
                    name={attr.label} 
                    placeholder={attr.placeholder} 
                    type={attr.type || "text"}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              )}
              {attr.type === "select" && (
                <div className={`flex flex-col col-span-${attr.cols}`}>
                  <label htmlFor={attr.label}>{attr.label}</label>
                  <select 
                    id={attr.label} 
                    name={attr.label} 
                    placeholder={attr.placeholder}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    {attr.options.map((option) => (
                      <option value={option.value} key={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              )}
            </>
          ))}
        </div>
        <div className="flex justify-end w-[100%]">
          <button type="submit" className="bg-orange-500 px-6 py-2 rounded text-white mt-4">Next</button>
        </div>
      </form>
    </div>
  );
};

ProductPricing.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default ProductPricing;