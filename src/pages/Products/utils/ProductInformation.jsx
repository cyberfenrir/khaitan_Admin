import { useState,useEffect } from "react";
const ProductInformation = () => {
    const [category,setCategory] = useState('fan');
    const productCategories = [
       {value: "fan", label:"Fan"},
        {value: "light", label:"Light"},
    ]
    
    const attributes= [
        {
            slug:"fan",
            attributes:[
                {
                    label: "Brand",
                    type: "text",
                    placeholder: "Enter Brand Name",
                    cols:1
                    
                },
                {
                    label: "Weight",
                    type: "text",
                    placeholder: "Enter Fan Weight",
                    cols:2
                    
                },
                {
                    label: "Blades",
                    type: "number",
                    placeholder: "Enter no. of blades",
                    cols:1
                    
                }
            ]
        },
        {
            slug:"light",
            attributes:[
                {
                    label: "Brand",
                    type: "text",
                    cols:1,
                    placeholder: "Enter Brand Name",
                    
                },
                {
                    label: "Light Type",
                    type:"select",
                    placeholder: "Select Light Type",
                    options: [{value:"LED", label:"LED"},{value:"CFL", label:"CFL"}],
                    cols:1
                    
                }
            ]
        }
    ]

    const [currentAttributes, setCurrentAttributes] = useState({})
    const [submittedEntries,setSubmittedEntries]= useState({})
    const handleCategoryChange = () => {
        // todo: replace with API
        setCurrentAttributes(attributes.find((attr) => attr.slug === category))
     }

    useEffect(()=>{
        handleCategoryChange(category)
    },[category])
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Product Information</h2>
          <form className="space-y-4" onSubmit={e => {
              e.preventDefault(); 
            console.log("form submitted")
        const formData= new FormData(e.target)
              setSubmittedEntries(()=>Object.fromEntries(formData))
            
              console.log(formData)
              console.log(submittedEntries)
      }}>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
                </label>
                <input
                id="productName"
                type="text"
                name="productName"
                placeholder="Enter product name"
                className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div>
                <label htmlFor="productCategories" className="block text-sm font-medium text-gray-700 mb-1">
                Product Categories
                </label>
                      <select 
                       id="productCategories"
                          value={category}
                           name="category"
                          onChange={(e) => setCategory(e.target.value)}
                       placeholder="Select product category"
                       className="w-full px-3 py-2 border rounded-md"
                      >
                          {productCategories.map((category) => (
                            <option value={category.value} key={category.value}>{category.label}</option>
                        ))}
                          </select>
                
            </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentAttributes.attributes && currentAttributes.attributes.map((attr) => (<>
                  {
                      attr.type !== "select" &&
                      <div className={`flex flex-col col-span-${attr.cols}` }>
                        <label htmlFor={attr.label}>{attr.label}</label>
                              <input id={attr.label} name={attr.label} placeholder={attr.placeholder} type={attr.type || "text"}
                              
                              className={`w-full px-3 py-2 border rounded-md `}
                              />
                      </div>
              }
              {
                      attr.type == "select" &&
                      <div className={`flex flex-col col-span-${attr.cols}` }>
                        <label htmlFor={attr.label}>{attr.label}</label>
                              <select id={attr.label} name={attr.label} placeholder={attr.placeholder}                               
                              className={`w-full px-3 py-2 border rounded-md `}
                              >
                                  { attr?.options.map((option) => (<option value={option.value} key={option.value}>{option.label}</option>))}
                                </select>
                      </div>
              }
              </>))}
        </div>
    <button className="bg-blue-600 px-6 py-2 rounded text-white">Submit</button>
      </form>
          {/* <pre>{ JSON.stringify(submittedEntries)}</pre> */}
    </div>
  );
};

export default ProductInformation;