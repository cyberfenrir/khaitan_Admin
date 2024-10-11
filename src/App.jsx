import { useState } from 'react';
import Sidebar from './sources/components/Sidebar';
import Dashboard from './sources/components/Dashboard';
import Header from './sources/header/header';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const renderContent = () => {
    switch (selectedItem) {
      case 'Dashboard':
        return (
          <>
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
            <div className="mb-8">
              <Dashboard />
            </div>
          </>
        );
      case 'Products':
        return <h1 className="text-2xl font-bold mb-6">Products Management</h1>;
      case 'Orders':
        return <h1 className="text-2xl font-bold mb-6">Orders Overview</h1>;
      default:
        return (
          <>
            <h1 className="text-2xl font-bold mb-6">Welcome to the Admin Panel</h1>
            <p className="text-gray-600">Select a category from the sidebar to get started.</p>
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Header */}
      <div className="fixed w-full z-10 bg-white shadow">
        <Header />
      </div>

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      
      {/* Main Content */}
      <main className={`
        flex-1 transition-all duration-300 
        md:ml-[250px] pt-[80px] 
      `}>
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
