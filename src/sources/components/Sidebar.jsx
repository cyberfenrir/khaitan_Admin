import { Menu } from 'lucide-react';
import PropTypes from 'prop-types';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const categories = [
    { name: 'Category 1', subcategories: ['Subcat 1.1', 'Subcat 1.2', 'Subcat 1.3'] },
    { name: 'Category 2', subcategories: ['Subcat 2.1', 'Subcat 2.2'] },
    { name: 'Category 3', subcategories: ['Subcat 3.1', 'Subcat 3.2', 'Subcat 3.3', 'Subcat 3.4'] },
    { name: 'Category 4', subcategories: ['Subcat 4.1'] },
  ];
  
  return (
    <>
      {/* Mobile Toggle Button */}
      <div className='fixed top-4 left-4 z-50 md:hidden'>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 bg-[#262D34] text-white rounded-md"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-full 
        w-[250px]
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 bg-[#262D34] text-white overflow-y-auto
      `}>
        <div className="p-4 pt-8 md:pt-4">
          <h2 className="text-xl font-bold mb-6">My App</h2>
          <ul className="space-y-4">
            {categories.map((category, index) => (
              <li key={index} className="group">
                <div className="font-bold text-lg group-hover:text-blue-400 cursor-pointer">
                  {category.name}
                </div>
                <ul className="pl-4 mt-2 space-y-1">
                  {category.subcategories.map((subcat, subIndex) => (
                    <li 
                      key={subIndex} 
                      className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors"
                    >
                      {subcat}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Sidebar;