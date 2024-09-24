//import React from "react";
import PropTypes from 'prop-types';

function SidebarItem({ icon, text, active, hasDropdown }) {
  return (
    <div
      className={`flex flex-col justify-center py-px w-full ${
        active
          ? "border-orange-500 border-solid border-l-[3px] border-l-orange-500"
          : ""
      }`}
    >
      <div className="flex relative gap-3 items-center py-2.5 pr-6 pl-7 w-full max-md:px-5">
        <div className="flex z-0 justify-center items-center self-stretch my-auto w-[22px]">
          <div className="flex flex-col self-stretch my-auto w-[22px]">
            <img
              loading="lazy"
              src={icon}
              alt=""
              className="object-contain w-full aspect-square"
            />
          </div>
        </div>
        <div
          className={`self-stretch my-auto text-base leading-none ${
            active ? "text-white" : "text-gray-400"
          } whitespace-nowrap`}
        >
          {text}
        </div>
        {hasDropdown && (
          <div className="flex absolute bottom-3 z-0 flex-col self-start right-[25px] w-[19px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/04b70dedfdb417888214a31557a54e6533880157c567970a82f64da8cfe97045?placeholderIfAbsent=true&apiKey=5dee21b4f50742c9b5c16494a624cb30"
              alt=""
              className="object-contain aspect-[1.06] w-[19px]"
            />
          </div>
        )}
      </div>
    </div>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  hasDropdown: PropTypes.bool
};

SidebarItem.defaultProps = {
  active: false,
  hasDropdown: false
};

export default SidebarItem;