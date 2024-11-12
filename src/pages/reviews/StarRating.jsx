import React from 'react';

const StarRating = ({ rating }) => {
  return (
    <img 
      loading="lazy" 
      src={`http://b.io/ext_${rating}-`} 
      className="object-contain shrink-0 self-stretch my-auto aspect-[3.33] w-[100px]"
      alt={`${rating} star rating`}
    />
  );
};

export default StarRating;