import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './sources/components/Sidebar';
import Dashboard from './sources/components/Dashboard';
import Header from './sources/header/header';
import CategoryPage from './pages/Categories/CategoryPage';
import OrderList from './pages/Orders/OrderList';
import UsersPage from './pages/Users/UsersPage';
// import ReusableTable from './pages/test';
import ProductList from "./pages/Products/ProductList";
// import Products from './sources/components/Products';
// import Orders from './sources/components/Orders';
import DashboardStats from './pages/Roles/DashboardStatus';
import Footer from './sources/footer/footer';

import { ProductProvider } from './pages/Products/context/ProductContext';

import Inventory from './pages/Pro/inventory';

import WarehouseDashboard from './pages/Warehouse/warehouseDashBoard';

import SettingsPage from './pages/settings/settings';

import ColorsPage from './pages/Colors/ColorsPage';

// import CreateProduct from './pages/Products/CreateProduct';

import ProductInformationPage from './pages/Products/ProductInformationPage';
import ProductPricingPage from './pages/Products/ProductPricingPage'; 
import ProductImagePage from './pages/Products/ProductImagePage';
import EditProduct from './pages/Products/EditProduct';

import RolesInformation from './pages/Roles/create/RolesInformation';

import OrderDetails from'./pages/Orders/OrderDetails/orderdetails';

import ProfilePage from './pages/Profile/utils/ProfilePage';

import Chat from './pages/Pro/chat';
import Calendar from './pages/Pro/calendar';
import Purchases from './pages/Pro/purchases';
import Deals from './pages/Pro/deals';
import Reviews from './pages/Pro/reviews';

import CreateCategoryPage from './pages/Categories/CreateCategoryPage';
import CreateAttributesPage from './pages/Categories/CreateAttributesPage';


import CreateColor from './pages/Colors/CreateColor';
import SignInPage from './pages/Login/LoginPage';
import CreateAccountPage from './pages/Login/SignInPage';
import CreateProduct from './pages/Products/CreateProduct';

import ProtectedLayout from './ProtectedLayout';
import { AuthProvider } from './AuthContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AuthProvider>
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

            <ProductProvider>
              <Routes>
              <Route element={<ProtectedLayout />}>
                <Route path="/dashboard/analytics" element={<Dashboard />} />
                <Route path="/products/add-product" element={<CreateProduct/>} />
                <Route path="/products/edit-product/:slug" element={<EditProduct />} />
                <Route path="/products/categories" element={<CategoryPage />} />
                <Route path="/orders/order-history" element={<OrderList />} />
                <Route path="/customers" element={<UsersPage />} />
                <Route path="/products/product-list" element={<ProductList />} />
                <Route path="/warehouses" element={<WarehouseDashboard />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/roles/admin" element={<DashboardStats />} />
                <Route path="/roles/create-role" element={<RolesInformation />} />
                <Route path="/orders/randid" element={<OrderDetails />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/purchases" element={<Purchases />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/profile/view-profile" element={<ProfilePage />} />
                <Route path="/category/create-category/" element={<CreateCategoryPage />} />
                <Route path="/category/create-attributes/" element={<CreateAttributesPage />} />
                <Route path="colors/colors" element={<ColorsPage />} />
                <Route path="colors/all-colors" element={<ColorsPage />} />
                <Route path="/colors/create" element={<CreateColor />} />
                <Route path="/colors/add-color" element={<CreateColor />} />
                </Route>
                <Route path="/" element={<SignInPage />} />
                <Route path="/login" element={<SignInPage />} />
                <Route path="/signin" element={<CreateAccountPage />} />
              </Routes>
            </ProductProvider>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;