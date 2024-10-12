import { Menu, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [openSubcategories, setOpenSubcategories] = useState({});

  const categories = [
    { 
      name: 'GENERAL', 
      subcategories: [
        { 
          name: 'Dashboard',
          items: ['Analytics', 'Sales-overview', 'Traffic']
        },
        { 
          name: 'Products',
          items: ['Add-product', 'Product-list', 'Categories']
        },
        { 
          name: 'Orders',
          items: ['New-orders', 'Order-history', 'Returns']
        },
        'Inventory',
        'Purchases',
        'Deals',
        'Invoices',
        'Settings'
      ]
    },
    { 
      name: 'USERS', 
      subcategories: [
        {
          name: 'Profile',
          items: ['View-profile', 'Edit-profile', 'Security']
        },
        {
          name: 'Roles',
          items: ['Admin', 'Manager', 'Employee']
        },
        'Permissions',
        'Customers',
        'Warehouses'
      ]
    },
    { 
      name: 'OTHER', 
      subcategories: ['Coupons', 'Reviews'] 
    },
    { 
      name: 'OTHER APPS', 
      subcategories: [
        {
          name: 'Chat',
          items: ['Direct-messages', 'Groups', 'Channels']
        },
        'Email',
        'Calendar',
        'Todo'
      ] 
    },
  ];

  const toggleSubcategory = (categoryIndex, subcategoryIndex) => {
    setOpenSubcategories(prev => {
      const key = `${categoryIndex}-${subcategoryIndex}`;
      return {
        ...prev,
        [key]: !prev[key]
      };
    });
  };

  const renderSubcategory = (subcategory, categoryIndex, subcategoryIndex) => {
    if (typeof subcategory === 'string') {
      return (
        <li key={subcategoryIndex} className='mt-2 mb-2 pt-2 pb-2'>
          {/* Use NavLink for routing */}
          <NavLink 
            to={`/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
            className={({ isActive }) => `
              text-base cursor-pointer transition-colors py-2
              ${isActive ? 'text-blue-400 font-medium' : 'text-gray-400 hover:text-white'}
            `}
          >
            {subcategory}
          </NavLink>
        </li>
      );
    }

    const isOpen = openSubcategories[`${categoryIndex}-${subcategoryIndex}`];

    return (
      <li key={subcategoryIndex}>
        <div 
          className={`
            flex items-center justify-between cursor-pointer transition-colors py-2
            text-gray-400 hover:text-white
          `}
          onClick={() => toggleSubcategory(categoryIndex, subcategoryIndex)}
        >
          <span>{subcategory.name}</span>
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </div>
        {isOpen && subcategory.items && (
          <ul className="pl-4 mt-1 space-y-1">
            {subcategory.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                {/* Use NavLink for subcategory items */}
                <NavLink
                  to={`/${subcategory.name.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className={({ isActive }) => `
                    text-sm cursor-pointer transition-colors py-1
                    ${isActive ? 'text-blue-400 font-medium' : 'text-gray-500 hover:text-white'}
                  `}
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

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
          <img src="/khaitan.gif" alt="My App Logo" className="mb-9 w-32 mx-auto" />
          <ul className="space-y-6">
            {categories.map((category, categoryIndex) => (
              <li key={categoryIndex} className="group">
                <div className="font-bold text-lg text-gray-400 mb-2">
                  {category.name}
                </div>
                <ul className="pl-4 space-y-1">
                  {category.subcategories.map((subcat, subcatIndex) => 
                    renderSubcategory(subcat, categoryIndex, subcatIndex)
                  )}
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
  setIsOpen: PropTypes.func.isRequired
};

export default Sidebar;
