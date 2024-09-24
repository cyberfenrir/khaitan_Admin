import SidebarSection from "./SidebarSection";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  const generalItems = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6056ea96397ce8a87cd9ad65acf9b932d5f607fb9c97778ecc11fba5824d8f4?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Dashboard",
      active: true,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a9c0867bae45bb5de35ab10eb1686d81e812ce4bdb9d7f9345cce20f52e79b2c?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Products",
      hasDropdown: true,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/bc99a2986348c987a547e002a91360420c13fde7805912706dc2fbae1ab5ca86?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Category",
      hasDropdown: true,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/20dd6c26e7dd19044b570cf0b6d6bde18b46bf04cab041bf47321ddbdeef5f14?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Inventory",
      hasDropdown: true,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b2f306f81ac29963661117d7f6013eadebb769438e55bed3e92e4287dc8a6a6f?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Orders",
      hasDropdown: true,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2f74c6897afcd42394768736ccb3ae66005ddd6c0364645cf0ebc5be37d9e62f?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Purchases",
      hasDropdown: true,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/dc6b1e7371ed9d394e7101ba9f0eb8e4bf2a1593e204b8e2cc565b2aff0f52a2?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Deals",
      hasDropdown: true,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/fa0c46e04caedb5e8157c5ca6a2a242a52a4d70e591bf608fcee30e1d6276ff3?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Invoices",
      hasDropdown: true,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4ae3b5aea917468abc59df7c634c4669bab67974afa87e3aa8901f767206dbf4?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Settings",
    },
  ];

  const userItems = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f588ed5d8b754c1cda6fcf745f83164a5c5562a17094035f3adf038ba7b291dc?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Profile",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ac91384c85c1b6d971846e939c12a005e06ec9dc4aa05d2cffadb7a3e8b1df02?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Roles",
      hasDropdown: true,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ece166722d9582550b878eb9735046595297a8834acaf72bf2ab9aa565d09dbd?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Permissions",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b7ccc6d36ea9cbd0ecb12cba6516eea8084fa17b5b0e5fff30a7e6fb41a67760?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Customers",
      hasDropdown: true,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4167d0b22877752767b0a670df3186dbe3dcaf8f0d87d6f8c227247cc0c734aa?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Warehouses",
      hasDropdown: true,
    },
  ];

  const otherItems = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/230bc929bf66c27c87ea709172afa8a28fd0ce7c97cc8a5b17eca9e5ff266cce?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Coupons",
      hasDropdown: true,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f588ed5d8b754c1cda6fcf745f83164a5c5562a17094035f3adf038ba7b291dc?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Reviews",
    },
  ];

  const otherAppsItems = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a5ad3f5e376b9f7950dfc7ee596c429c890c9c4c3b7b40807c5150710bbccc58?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Chat",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/651c4b302b4a814209351067da81cc8340edfa7c0576e24d540b07da26d24359?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Email",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/bacea7c25c82b553c63bbd754a79efcdef966fed08986284ec1fced2966c5943?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Calendar",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d3bb913be9cf73c4e8e721ab074c64fa6ce51486ab590102d9198de1fd3d0ba?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30",
      text: "Todo",
    },
  ];

  return (
    <aside className="flex overflow-hidden absolute left-0 -bottom-0.5 z-0 flex-col pb-6 max-w-full bg-gray-800 shadow-sm h-[1613px] min-h-[1613px] min-w-[280px] w-[280px]">
      <div className="flex overflow-hidden z-0 flex-col px-6 w-full max-md:px-5">
        <div className="flex flex-col justify-center items-start pt-10 pb-9 w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d108dad5572bdc79c9e276bbf823e6d213fc41eb8ef37e928546336290771bc4?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30"
            alt="Company logo"
            className="object-contain max-w-full aspect-[5.85] w-[117px]"
          />
        </div>
      </div>
      <nav className="flex z-0 flex-col w-full">
        <SidebarSection title="General">
          {generalItems.map((item, index) => (
            <SidebarItem key={index} {...item} />
          ))}
        </SidebarSection>
        <SidebarSection title="Users">
          {userItems.map((item, index) => (
            <SidebarItem key={index} {...item} />
          ))}
        </SidebarSection>
        <SidebarSection title="Other">
          {otherItems.map((item, index) => (
            <SidebarItem key={index} {...item} />
          ))}
        </SidebarSection>
        <SidebarSection title="Other Apps">
          {otherAppsItems.map((item, index) => (
            <SidebarItem key={index} {...item} />
          ))}
        </SidebarSection>
      </nav>
      <button className="flex absolute right-3 top-8 z-0 justify-center items-center p-2 w-9 rounded-2xl min-h-[36px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/133d38d3cf02679fa4d4b23cf7ea80e5a67b9e927c81c9fc2e05e8a1b96f77a2?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30"
          alt="Toggle sidebar"
          className="object-contain self-stretch my-auto aspect-square w-[22px]"
        />
      </button>
    </aside>
  );
}

export default Sidebar;