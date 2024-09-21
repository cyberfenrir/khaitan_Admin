import 'react';
import './sidebar.css';
import Logo from '../../assets/logo/logo';
import MenuSection from './menu/menusection';
import ToggleButton from './menu/togglebutton';

const generalItems = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6056ea96397ce8a87cd9ad65acf9b932d5f607fb9c97778ecc11fba5824d8f4?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Dashboard", active: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a9c0867bae45bb5de35ab10eb1686d81e812ce4bdb9d7f9345cce20f52e79b2c?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Products", hasSubmenu: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/bc99a2986348c987a547e002a91360420c13fde7805912706dc2fbae1ab5ca86?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Category", hasSubmenu: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/20dd6c26e7dd19044b570cf0b6d6bde18b46bf04cab041bf47321ddbdeef5f14?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Inventory", hasSubmenu: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b2f306f81ac29963661117d7f6013eadebb769438e55bed3e92e4287dc8a6a6f?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Orders", hasSubmenu: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2f74c6897afcd42394768736ccb3ae66005ddd6c0364645cf0ebc5be37d9e62f?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Purchases", hasSubmenu: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/dc6b1e7371ed9d394e7101ba9f0eb8e4bf2a1593e204b8e2cc565b2aff0f52a2?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Deals", hasSubmenu: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/fa0c46e04caedb5e8157c5ca6a2a242a52a4d70e591bf608fcee30e1d6276ff3?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Invoices", hasSubmenu: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4ae3b5aea917468abc59df7c634c4669bab67974afa87e3aa8901f767206dbf4?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Settings" }
];

const userItems = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f588ed5d8b754c1cda6fcf745f83164a5c5562a17094035f3adf038ba7b291dc?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Profile" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ac91384c85c1b6d971846e939c12a005e06ec9dc4aa05d2cffadb7a3e8b1df02?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Roles", hasSubmenu: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ece166722d9582550b878eb9735046595297a8834acaf72bf2ab9aa565d09dbd?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Permissions" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b7ccc6d36ea9cbd0ecb12cba6516eea8084fa17b5b0e5fff30a7e6fb41a67760?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Customers", hasSubmenu: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4167d0b22877752767b0a670df3186dbe3dcaf8f0d87d6f8c227247cc0c734aa?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Warehouses", hasSubmenu: true }
];

const otherItems = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/230bc929bf66c27c87ea709172afa8a28fd0ce7c97cc8a5b17eca9e5ff266cce?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Coupons", hasSubmenu: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f588ed5d8b754c1cda6fcf745f83164a5c5562a17094035f3adf038ba7b291dc?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Reviews" }
];

const appItems = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a5ad3f5e376b9f7950dfc7ee596c429c890c9c4c3b7b40807c5150710bbccc58?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Chat" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/651c4b302b4a814209351067da81cc8340edfa7c0576e24d540b07da26d24359?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Email" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/bacea7c25c82b553c63bbd754a79efcdef966fed08986284ec1fced2966c5943?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Calendar" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d3bb913be9cf73c4e8e721ab074c64fa6ce51486ab590102d9198de1fd3d0ba?apiKey=5dee21b4f50742c9b5c16494a624cb30&", label: "Todo" }
];

function Sidebar() {
    return (
      <nav className="sidebar">
        <Logo />
        <div className="menuContainer">
          <MenuSection title="General" items={generalItems} />
          <MenuSection title="Users" items={userItems} />
          <MenuSection title="Other" items={otherItems} />
          <MenuSection title="Other Apps" items={appItems} />
        </div>
        <ToggleButton />
      </nav>
    );
  }
  
  export default Sidebar;