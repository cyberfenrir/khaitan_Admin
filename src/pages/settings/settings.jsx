import { useState } from 'react';

const SettingsCard = ({ title, icon, children }) => (
  <section className="flex flex-col flex-1 shrink px-3 w-full basis-0 max-w-[1558px] min-w-[240px] max-md:max-w-full">
    <div className="flex flex-col w-full bg-white rounded-xl shadow-sm max-md:max-w-full mb-4">
      <header className="flex flex-col px-6 pt-5 pb-5 w-full border-b border-solid border-b-slate-200 max-md:px-5 max-md:max-w-full mb-4">
        <h2 className="flex flex-wrap gap-1.5 items-center w-full max-md:max-w-full">
          {icon && (
            <img src={icon} alt="" className="flex flex-col self-stretch my-auto w-5 aspect-square mb-4" />
          )}
          <span className="self-stretch my-auto text-base font-semibold leading-4 text-slate-700 mb-4">
            {title}
          </span>
        </h2>
      </header>
      {children}
    </div>
  </section>
);

const FormInput = ({ label, placeholder, value, onChange }) => (
  <div className="flex flex-col flex-1 grow shrink-0 px-3 basis-0 min-h-[90px] w-fit max-md:max-w-full">
    <div className="flex flex-col py-1 w-full max-md:max-w-full mb-4">
      <label className="self-start leading-5 h-[21px] text-sm text-slate-500">
        {label}
      </label>
      <input
        className="flex overflow-hidden flex-col px-4 pt-2.5 pb-3 mt-3 whitespace-nowrap bg-white rounded-lg border border-solid border-zinc-200 max-md:max-w-full"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

const FormSelect = ({ label, options, value, onChange }) => (
  <div className="flex flex-col flex-1 grow shrink-0 px-3 basis-0 min-h-[90px] w-fit max-md:max-w-full">
    <div className="flex flex-col w-full max-md:max-w-full mb-4">
      <label className="text-sm leading-5 text-slate-500 mb-4">
        {label}
      </label>
      <div className="flex overflow-hidden relative flex-col justify-center mt-1.5 w-full max-md:max-w-full">
        <select
          className="flex overflow-hidden z-0 justify-center items-start px-4 py-2.5 w-full text-sm leading-5 whitespace-nowrap bg-white rounded-lg border border-solid border-zinc-200 text-slate-500 max-md:max-w-full"
          value={value}
          onChange={onChange}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="flex absolute right-3 z-0 flex-col w-5 left-[699px] top-[3px]">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/45c087cc29171619515d8a9d3a9e54d27246acf5087ce89133ee86012928486a?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9" alt="" className="object-contain w-full aspect-[0.67]" />
        </div>
      </div>
    </div>
  </div>
);

const FormTextarea = ({ label, value, onChange }) => (
  <div className="flex flex-col px-3 text-sm leading-5 whitespace-nowrap min-h-[129px] text-slate-500 max-md:max-w-full">
    <div className="flex flex-col pt-2 w-full max-md:max-w-full mb-4">
      <label htmlFor={label.toLowerCase().replace(/\s+/g, '-')} className="self-start h-[21px]">
        {label}
      </label>
      <textarea
        id={label.toLowerCase().replace(/\s+/g, '-')}
        className="flex shrink-0 mt-2 bg-gray-50 rounded-lg border border-solid border-zinc-200 h-[100px] max-md:max-w-full"
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

const ToggleSwitch = ({ label, checked, onChange }) => (
  <div className="flex flex-col flex-1 grow shrink-0 px-3 basis-0 min-h-[90px] w-fit max-md:max-w-full">
    <div className="flex flex-col gap-4 py-0 pr-3.5 pl-3 w-full border-r border-solid border-r-slate-200 max-w-[1510px] min-h-[58px]">
      <div className="w-full text-sm leading-5 text-slate-500 mb-4">{label}</div>
      <div className="flex gap-3 items-center mt-4 w-full mb-4">
        <label className="flex items-center cursor-pointer mb-4">
          <input
            type="checkbox"
            className="sr-only mb-4"
            checked={checked}
            onChange={onChange}
          />
          <div className={`flex w-10 h-6 bg-gray-300 rounded-full p-1 transition-colors duration-300 ease-in-out ${checked ? 'bg-orange-500' : ''}`}>
            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${checked ? 'translate-x-4' : ''}`} />
          </div>
          <span className="ml-3 text-sm font-medium text-gray-900 mb-4">
            {checked ? 'Yes' : 'No'}
          </span>
        </label>
      </div>
    </div>
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
    <main className="flex relative flex-col px-10 pb-16 min-h-[1100px] max-md:px-5">
      <div className="flex z-0 flex-col self-center w-full max-w-[1558px] max-md:max-w-full">
        <SettingsCard title="General Settings" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/347c877ca30802f8f4dc1ea1a127b4d0b3a2ab9c84b22ca280d16d2be69d9bfe?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9">
          <div className="flex flex-col flex-1 justify-center px-3 py-6 w-full max-md:max-w-full mb-4">
            <div className="flex flex-col w-full max-md:max-w-full mb-4">
              <div className="flex flex-wrap text-sm text-slate-500 mb-4">
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
              </div>
              <div className="flex flex-wrap mb-4">
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
              </div>
              <FormTextarea
                label="Description"
                value={generalSettings.description}
                onChange={(e) => handleInputChange('generalSettings', 'description', e.target.value)}
              />
            </div>
          </div>
        </SettingsCard>

        <SettingsCard title="Store Settings" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/4a261ced4d1df04ae813fb7f9f92e1c0ada85854aa27bade478350a4f050d021?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9">
          <div className="flex flex-col flex-1 justify-center px-3 py-6 w-full max-md:max-w-full mb-4">
            <div className="flex flex-col w-full max-md:max-w-full mb-4">
              <div className="flex flex-wrap text-sm text-slate-500 mb-4">
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
              </div>
              <div className="flex flex-wrap text-sm text-slate-500 mb-4">
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
              </div>
              <FormTextarea
                label="Full Address"
                value={storeSettings.fullAddress}
                onChange={(e) => handleInputChange('storeSettings', 'fullAddress', e.target.value)}
              />
              <div className="flex flex-wrap mb-4">
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
            </div>
          </div>
        </SettingsCard>

        <SettingsCard title="Localization Settings" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/f861f7556f128cf8e2a8215602826fb1014e9aec01f0dcced949fc54ff6c6d3d?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9">
          <div className="flex flex-col flex-1 justify-center px-3 py-6 w-full max-md:max-w-full mb-4">
            <div className="flex flex-col w-full max-md:max-w-full mb-4">
              <div className="flex flex-wrap mb-4">
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
              </div>
              <div className="flex flex-wrap mb-4">
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
              </div>
              <div className="flex flex-col px-3 max-w-full min-h-[66px] w-[755px]">
                <FormSelect
                  label="Weight Class"
                  options={['Kilogram']}
                  value={localizationSettings.weightClass}
                  onChange={(e) => handleInputChange('localizationSettings', 'weightClass', e.target.value)}
                />
              </div>
            </div>
          </div>
        </SettingsCard>

        <SettingsCard title="Categories Settings" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/4a261ced4d1df04ae813fb7f9f92e1c0ada85854aa27bade478350a4f050d021?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9">
          <div className="flex flex-col flex-1 p-6 w-full max-md:px-5 mb-4">
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
          <div className="flex flex-col flex-1 p-6 w-full max-md:px-5 mb-4">
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
          <div className="flex flex-col flex-1 p-6 w-full text-sm leading-5 text-slate-500 max-md:px-5 mb-4">
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
          <div className="flex flex-col flex-1 p-6 w-full max-md:px-5 mb-4">
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
          <div className="flex flex-col flex-1 px-3 pb-6 w-full max-md:max-w-full mb-4">
            <div className="flex flex-wrap justify-between w-full max-md:max-w-full mb-4">
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
            </div>
            <FormInput
              label="Max Login Attempts"
              placeholder="1 hour"
              value={customersSettings.maxLoginAttempts}
              onChange={(e) => handleInputChange('customersSettings', 'maxLoginAttempts', e.target.value)}
            />
          </div>
        </SettingsCard>
      </div>

      <div className="flex flex-wrap gap-1 items-center w-full text-sm leading-5 text-center text-white max-md:max-w-full mb-4">
        <button className="self-stretch px-4 py-2.5 my-auto whitespace-nowrap bg-red-400 rounded-xl border border-red-400 border-solid">
          Cancel
        </button>
        <button className="self-stretch px-4 py-2.5 my-auto bg-green-500 rounded-xl border border-green-500 border-solid">
          Save Change
        </button>
      </div>
    </main>
  );
};

export default SettingsPage;
import PropTypes from 'prop-types';

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
