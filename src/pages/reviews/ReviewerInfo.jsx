import React from 'react';

const ReviewerInfo = ({ reviewer }) => {
  return (
    <div className="flex flex-col pt-6 w-full">
      <div className="flex relative flex-col items-start px-6 pt-14 pb-5 w-full bg-orange-500 max-md:px-5">
        <div className="flex z-0 flex-col self-stretch w-full text-white">
          <h4 className="w-full text-lg font-semibold leading-5">{reviewer.name}</h4>
          <p className="mt-1.5 w-full text-sm leading-5">{reviewer.title}</p>
        </div>
        <div className="flex absolute left-6 -top-9 z-0 flex-col justify-center right-[269px] w-[72px]">
          <img 
            loading="lazy" 
            src={reviewer.avatarSrc} 
            className="object-contain w-full aspect-square"
            alt={`${reviewer.name}'s avatar`}
          />
        </div>
        <div className="flex absolute right-6 -top-7 z-0 flex-col justify-center w-14 left-[285px]">
          <img 
            loading="lazy" 
            src={reviewer.badgeSrc} 
            className="object-contain w-full aspect-square"
            alt="Reviewer badge"
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewerInfo;