import { Menu } from 'lucide-react';
import PropTypes from 'prop-types';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const categories = [
    { name: 'GENERAL', subcategories: ['Dashboard', 'Products', 'Category','Inventory', 'Orders','Purchases', 'Deals', 'Invoices', 'Settings'] },
    { name: 'USERS', subcategories: ['Profile', 'Roles', 'Permissions', 'Customers', 'Warehouses'] },
    { name: 'OTHER', subcategories: ['Coupons', 'Reviews'] },
    { name: 'OTHER APPS', subcategories: ['Chat','Email','Calender','Todo'] },
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
                <ul className="pl-4 mt-4 space-y-1">
                  {category.subcategories.map((subcat, subIndex) => (
                    <li 
                      key={subIndex} 
                      className="text-base text-gray-400 hover:text-white cursor-pointer transition-colors"
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