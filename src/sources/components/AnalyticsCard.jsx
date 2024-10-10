// import React from 'react';
import PropTypes from 'prop-types';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
// import { Link } from 'react-router-dom';

const AnalyticsCard = ({
  icon: Icon,
  title,
  value,
  percentageChange,
  isLoading,
  colorScheme = 'blue'
}) => {
  const colorVariants = {
    blue: {
      bgLight: 'bg-blue-50',
      bgDark: 'bg-blue-500',
      textDark: 'text-blue-700',
      hoverDark: 'hover:bg-blue-600'
    },
    green: {
      bgLight: 'bg-green-50',
      bgDark: 'bg-green-500',
      textDark: 'text-green-700',
      hoverDark: 'hover:bg-green-600'
    },
    purple: {
      bgLight: 'bg-purple-50',
      bgDark: 'bg-purple-500',
      textDark: 'text-purple-700',
      hoverDark: 'hover:bg-purple-600'
    },
    orange: {
      bgLight: 'bg-orange-50',
      bgDark: 'bg-orange-500',
      textDark: 'text-orange-700',
      hoverDark: 'hover:bg-orange-600'
    }
  };

  const colors = colorVariants[colorScheme];

  return (
    <div className={`rounded-lg shadow-lg p-6 ${colors.bgLight}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${colors.bgDark} text-white`}>
          <Icon className="h-6 w-6" />
        </div>
        {/* <Link 
          to={detailsPath}
          className={`flex items-center ${colors.textDark} text-sm font-medium hover:underline`}
        >
          View More
          <ExternalLink className="h-4 w-4 ml-1" />
        </Link> */}
      </div>
      
      <h3 className={`text-lg font-semibold mb-2 ${colors.textDark}`}>{title}</h3>
      
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
      ) : (
        <>
          <div className="text-3xl font-bold mb-2">{value}</div>
          <div className="flex items-center">
            {percentageChange > 0 ? (
              <ArrowUpIcon className="h-5 w-5 text-green-500 mr-1" />
            ) : (
              <ArrowDownIcon className="h-5 w-5 text-red-500 mr-1" />
            )}
            <span className={percentageChange > 0 ? 'text-green-500' : 'text-red-500'}>
              {Math.abs(percentageChange)}% 
            </span>
            <span className="text-gray-500 ml-1">from last period</span>
          </div>
        </>
      )}
    </div>
  );
};

AnalyticsCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  percentageChange: PropTypes.number,
  isLoading: PropTypes.bool,
  detailsPath: PropTypes.string.isRequired,
  colorScheme: PropTypes.oneOf(['blue', 'green', 'purple', 'orange'])
};

export default AnalyticsCard;