import { useState } from 'react';
import PropTypes from 'prop-types';

const SettingsCard = ({ title, icon, children }) => (
  <section className="flex flex-col flex-1 shrink px-3 w-full basis-0 max-w-[1558px] min-w-[240px] max-md:max-w-full">
    <div className="flex flex-col w-full bg-white rounded-xl shadow-sm max-md:max-w-full mb-4">
      <header className="flex items-center px-6 pt-5 pb-5 w-full border-b border-solid border-b-slate-200 max-md:px-5 max-md:max-w-full">
        {icon && (
          <img src={icon} alt="" className="w-5 h-5 mr-2" />
        )}
        <h2 className="text-base font-semibold leading-4 text-slate-700">
          {title}
        </h2>
      </header>
      <div className="p-6">
        {children}
      </div>
    </div>
  </section>
);

const FormInput = ({ label, placeholder, value, onChange }) => (
  <div className="flex flex-col mb-4">
    <label className="text-sm text-slate-500 mb-1">
      {label}
    </label>
    <input
      className="p-2 border border-gray-300 rounded"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const FormSelect = ({ label, options, value, onChange }) => (
  <div className="flex flex-col mb-4">
    <label className="text-sm text-slate-500 mb-1">
      {label}
    </label>
    <select
      className="p-2 border border-gray-300 rounded"
      value={value}
      onChange={onChange}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const FormTextarea = ({ label, value, onChange }) => (
  <div className="flex flex-col mb-4">
    <label className="text-sm text-slate-500 mb-1">
      {label}
    </label>
    <textarea
      className="p-2 border border-gray-300 rounded"
      value={value}
      onChange={onChange}
    />
  </div>
);

const ToggleSwitch = ({ label, checked, onChange }) => (
  <div className="flex items-center mb-4">
    <label className="text-sm text-slate-500 mr-2">
      {label}
    </label>
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        checked={checked}
        onChange={onChange}
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
      />
      <label
        htmlFor="toggle"
        className={`toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${checked ? 'bg-orange-500' : ''}`}
      />
    </div>
    <span className="text-sm font-medium text-gray-900">
      {checked ? 'Yes' : 'No'}
    </span>
  </div>
);

const SettingsPage = () => {
  const [generalSettings, setGeneralSettings] = useState({
    metaTitle: '',
    metaTagKeyword: '',
    storeTheme: 'Default',
    layout: 'Default',
    description: '',
  });

  const [storeSettings, setStoreSettings] = useState({
    storeName: '',
    storeOwnerFullName: '',
    ownerPhoneNumber: '',
    ownerEmail: '',
    fullAddress: '',
    zipCode: '',
    city: 'Choose a city',
    country: 'Choose a country',
  });

  const [localizationSettings, setLocalizationSettings] = useState({
    country: 'Choose a country',
    language: 'English',
    currency: 'Us Dollar',
    lengthClass: 'Centimeter',
    weightClass: 'Kilogram',
  });

  const [categoriesSettings, setCategoriesSettings] = useState({
    categoryProductCount: true,
    defaultItemsPerPage: '000',
  });

  const [reviewsSettings, setReviewsSettings] = useState({
    allowReviews: true,
    allowGuestReviews: false,
  });

  const [vouchersSettings, setVouchersSettings] = useState({
    minimumVouchers: '1',
    maximumVouchers: '12',
  });

  const [taxSettings, setTaxSettings] = useState({
    pricesWithTax: true,
    defaultTaxRate: '18%',
  });

  const [customersSettings, setCustomersSettings] = useState({
    customersOnline: true,
    customersActivity: true,
    customerSearches: true,
    allowGuestCheckout: false,
    loginDisplayPrice: false,
    maxLoginAttempts: '1 hour',
  });

  const handleInputChange = (settingGroup, field, value) => {
    const setterFunction = {
      generalSettings: setGeneralSettings,
      storeSettings: setStoreSettings,
      localizationSettings: setLocalizationSettings,
      categoriesSettings: setCategoriesSettings,
      reviewsSettings: setReviewsSettings,
      vouchersSettings: setVouchersSettings,
      taxSettings: setTaxSettings,
      customersSettings: setCustomersSettings,
    }[settingGroup];

    setterFunction(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleToggleChange = (settingGroup, field) => {
    const setterFunction = {
      categoriesSettings: setCategoriesSettings,
      reviewsSettings: setReviewsSettings,
      taxSettings: setTaxSettings,
      customersSettings: setCustomersSettings,
    }[settingGroup];

    setterFunction(prevState => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <main className="flex flex-col px-10 pb-16 min-h-[1100px] max-md:px-5">
      <div className="flex flex-col self-center w-full max-w-[1558px] max-md:max-w-full">
        <SettingsCard title="General Settings" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/347c877ca30802f8f4dc1ea1a127b4d0b3a2ab9c84b22ca280d16d2be69d9bfe?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9">
          <div className="flex flex-col">
            <FormInput
              label="Meta Title"
              placeholder="Title"
              value={generalSettings.metaTitle}
              onChange={(e) => handleInputChange('generalSettings', 'metaTitle', e.target.value)}
            />
            <FormInput
              label="Meta Tag Keyword"
              placeholder="Enter word"
              value={generalSettings.metaTagKeyword}
              onChange={(e) => handleInputChange('generalSettings', 'metaTagKeyword', e.target.value)}
            />
            <FormSelect
              label="Store Themes"
              options={['Default']}
              value={generalSettings.storeTheme}
              onChange={(e) => handleInputChange('generalSettings', 'storeTheme', e.target.value)}
            />
            <FormSelect
              label="Layout"
              options={['Default']}
              value={generalSettings.layout}
              onChange={(e) => handleInputChange('generalSettings', 'layout', e.target.value)}
            />
            <FormTextarea
              label="Description"
              value={generalSettings.description}
              onChange={(e) => handleInputChange('generalSettings', 'description', e.target.value)}
            />
          </div>
        </SettingsCard>

        <SettingsCard title="Store Settings" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/4a261ced4d1df04ae813fb7f9f92e1c0ada85854aa27bade478350a4f050d021?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9">
          <div className="flex flex-col">
            <FormInput
              label="Store Name"
              placeholder="Enter name"
              value={storeSettings.storeName}
              onChange={(e) => handleInputChange('storeSettings', 'storeName', e.target.value)}
            />
            <FormInput
              label="Store Owner Full Name"
              placeholder="Full name"
              value={storeSettings.storeOwnerFullName}
              onChange={(e) => handleInputChange('storeSettings', 'storeOwnerFullName', e.target.value)}
            />
            <FormInput
              label="Owner Phone number"
              placeholder="Number"
              value={storeSettings.ownerPhoneNumber}
              onChange={(e) => handleInputChange('storeSettings', 'ownerPhoneNumber', e.target.value)}
            />
            <FormInput
              label="Owner Email"
              placeholder="Email"
              value={storeSettings.ownerEmail}
              onChange={(e) => handleInputChange('storeSettings', 'ownerEmail', e.target.value)}
            />
            <FormTextarea
              label="Full Address"
              value={storeSettings.fullAddress}
              onChange={(e) => handleInputChange('storeSettings', 'fullAddress', e.target.value)}
            />
            <FormInput
              label="Zip-Code"
              placeholder="zip-code"
              value={storeSettings.zipCode}
              onChange={(e) => handleInputChange('storeSettings', 'zipCode', e.target.value)}
            />
            <FormSelect
              label="City"
              options={['Choose a city']}
              value={storeSettings.city}
              onChange={(e) => handleInputChange('storeSettings', 'city', e.target.value)}
            />
            <FormSelect
              label="Country"
              options={['Choose a country']}
              value={storeSettings.country}
              onChange={(e) => handleInputChange('storeSettings', 'country', e.target.value)}
            />
          </div>
        </SettingsCard>

        <SettingsCard title="Localization Settings" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/f861f7556f128cf8e2a8215602826fb1014e9aec01f0dcced949fc54ff6c6d3d?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9">
          <div className="flex flex-col">
            <FormSelect
              label="Country"
              options={['Choose a country']}
              value={localizationSettings.country}
              onChange={(e) => handleInputChange('localizationSettings', 'country', e.target.value)}
            />
            <FormSelect
              label="Language"
              options={['English']}
              value={localizationSettings.language}
              onChange={(e) => handleInputChange('localizationSettings', 'language', e.target.value)}
            />
            <FormSelect
              label="Currency"
              options={['Us Dollar']}
              value={localizationSettings.currency}
              onChange={(e) => handleInputChange('localizationSettings', 'currency', e.target.value)}
            />
            <FormSelect
              label="Length Class"
              options={['Centimeter']}
              value={localizationSettings.lengthClass}
              onChange={(e) => handleInputChange('localizationSettings', 'lengthClass', e.target.value)}
            />
            <FormSelect
              label="Weight Class"
              options={['Kilogram']}
              value={localizationSettings.weightClass}
              onChange={(e) => handleInputChange('localizationSettings', 'weightClass', e.target.value)}
            />
          </div>
        </SettingsCard>

        <SettingsCard title="Categories Settings" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/4a261ced4d1df04ae813fb7f9f92e1c0ada85854aa27bade478350a4f050d021?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9">
          <div className="flex flex-col">
            <ToggleSwitch
              label="Category Product Count"
              checked={categoriesSettings.categoryProductCount}
              onChange={() => handleToggleChange('categoriesSettings', 'categoryProductCount')}
            />
            <FormInput
              label="Default Items Per Page"
              placeholder="000"
              value={categoriesSettings.defaultItemsPerPage}
              onChange={(e) => handleInputChange('categoriesSettings', 'defaultItemsPerPage', e.target.value)}
            />
          </div>
        </SettingsCard>

        <SettingsCard title="Reviews Settings" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/4a261ced4d1df04ae813fb7f9f92e1c0ada85854aa27bade478350a4f050d021?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9">
          <div className="flex flex-col">
            <ToggleSwitch
              label="Allow Reviews"
              checked={reviewsSettings.allowReviews}
              onChange={() => handleToggleChange('reviewsSettings', 'allowReviews')}
            />
            <ToggleSwitch
              label="Allow Guest Reviews"
              checked={reviewsSettings.allowGuestReviews}
              onChange={() => handleToggleChange('reviewsSettings', 'allowGuestReviews')}
            />
          </div>
        </SettingsCard>

        <SettingsCard title="Vouchers Settings" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/4a261ced4d1df04ae813fb7f9f92e1c0ada85854aa27bade478350a4f050d021?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9">
          <div className="flex flex-col">
            <FormInput
              label="Minimum Vouchers"
              placeholder="1"
              value={vouchersSettings.minimumVouchers}
              onChange={(e) => handleInputChange('vouchersSettings', 'minimumVouchers', e.target.value)}
            />
            <FormInput
              label="Maximum Vouchers"
              placeholder="12"
              value={vouchersSettings.maximumVouchers}
              onChange={(e) => handleInputChange('vouchersSettings', 'maximumVouchers', e.target.value)}
            />
          </div>
        </SettingsCard>

        <SettingsCard title="Tax Settings" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/4a261ced4d1df04ae813fb7f9f92e1c0ada85854aa27bade478350a4f050d021?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9">
          <div className="flex flex-col">
            <ToggleSwitch
              label="Prices with Tax"
              checked={taxSettings.pricesWithTax}
              onChange={() => handleToggleChange('taxSettings', 'pricesWithTax')}
            />
            <FormInput
              label="Default Tax Rate"
              placeholder="18%"
              value={taxSettings.defaultTaxRate}
              onChange={(e) => handleInputChange('taxSettings', 'defaultTaxRate', e.target.value)}
            />
          </div>
        </SettingsCard>

        <SettingsCard title="Customers Settings" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/4a261ced4d1df04ae813fb7f9f92e1c0ada85854aa27bade478350a4f050d021?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9">
          <div className="flex flex-col">
            <ToggleSwitch
              label="Customers Online"
              checked={customersSettings.customersOnline}
              onChange={() => handleToggleChange('customersSettings', 'customersOnline')}
            />
            <ToggleSwitch
              label="Customers Activity"
              checked={customersSettings.customersActivity}
              onChange={() => handleToggleChange('customersSettings', 'customersActivity')}
            />
            <ToggleSwitch
              label="Customer Searches"
              checked={customersSettings.customerSearches}
              onChange={() => handleToggleChange('customersSettings', 'customerSearches')}
            />
            <ToggleSwitch
              label="Allow Guest Checkout"
              checked={customersSettings.allowGuestCheckout}
              onChange={() => handleToggleChange('customersSettings', 'allowGuestCheckout')}
            />
            <ToggleSwitch
              label="Login Display Price"
              checked={customersSettings.loginDisplayPrice}
              onChange={() => handleToggleChange('customersSettings', 'loginDisplayPrice')}
            />
            <FormInput
              label="Max Login Attempts"
              placeholder="1 hour"
              value={customersSettings.maxLoginAttempts}
              onChange={(e) => handleInputChange('customersSettings', 'maxLoginAttempts', e.target.value)}
            />
          </div>
        </SettingsCard>
      </div>

      <div className="flex gap-4 justify-center mt-8">
        <button className="px-4 py-2 bg-red-400 text-white rounded-xl">
          Cancel
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-xl">
          Save Changes
        </button>
      </div>
    </main>
  );
};

export default SettingsPage;

SettingsCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  children: PropTypes.node.isRequired,
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

FormTextarea.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

