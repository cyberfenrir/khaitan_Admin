import React from 'react';
import StarRating from './StarRating';
import ReviewerInfo from './ReviewerInfo';

const ReviewCard = ({ review, reviewer }) => {
  return (
    <div className="flex flex-col grow px-3 min-h-[381px]">
      <div className="flex overflow-hidden flex-col w-full bg-white rounded-xl shadow-sm">
        <div className="flex flex-col flex-1 px-6 pt-6 pb-8 w-full text-base leading-6 text-slate-700 max-md:px-5">
          <h3 className="pb-px w-full font-bold">
            Reviewed in {review.location} on {review.date}
          </h3>
          <p className="mt-3 w-full text-sm leading-5 text-slate-500">
            "{review.content}"
          </p>
          <div className="flex gap-3 items-center mt-3 w-full">
            <StarRating rating={review.rating} />
            <span className="self-stretch pb-px my-auto">{review.quality}</span>
          </div>
        </div>
        <ReviewerInfo reviewer={reviewer} />
      </div>
    </div>
  );
};

export default ReviewCard;