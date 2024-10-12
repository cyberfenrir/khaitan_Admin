import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './sources/components/Sidebar';
import Dashboard from './sources/components/Dashboard';
import Header from './sources/header/header';
// import Products from './sources/components/Products';
// import Orders from './sources/components/Orders';
// import Welcome from './sources/components/Welcome';
import Footer from './sources/footer/footer'; 

import CreateProduct from './pages/Products/CreateProduct';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100"> {/* Change to flex-col to allow footer to stick at the bottom */}
        {/* Header */}
        <div className="fixed w-full z-10 bg-white shadow">
          <Header />
        </div>

        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen}
        />
        
        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 md:ml-[250px] pt-[80px]`}>
          <div className="p-8">
            {/* Routes for different sections */}
            <Routes>
              {/* <Route path="/" element={<Welcome />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products/add-product" element={<CreateProduct />} />
              {/* <Route path="/products" element={<Products />} /> */}
              {/* <Route path="/orders" element={<Orders />} /> */}
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
