import React, { useState } from 'react';
import Sidebar from './sources/components/Sidebar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Content */}
      <main className={`
        flex-1 p-8 transition-all duration-300
        md:ml-[250px]
      `}>
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        <p>Select a category from the sidebar to view content.</p>
      </main>
    </div>
  );
}

export default App;