import PropTypes from 'prop-types';


export default function StatsCard({ title, value, unit, icon, trend }) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col justify-center w-full bg-white rounded-xl shadow-sm">
        <div className="flex flex-col flex-1 justify-center p-6 w-full max-md:px-5">
          <div className="flex gap-10 justify-between items-center w-full">
            <div className="flex flex-col self-stretch my-auto">
              <h4 className="self-stretch w-full text-base font-semibold leading-none text-slate-700">
                {title}
              </h4>
              <div className="flex gap-2.5 py-2 mt-3 text-slate-500">
                <span className="text-2xl">{value}</span>
                {unit && <span className="text-xs">({unit})</span>}
                {trend && (
                  <div className="flex gap-px justify-center px-1.5 py-1 bg-red-100 rounded">
                    <img src={trend.icon} alt="" className="w-3 h-3" />
                    <span className="text-xs font-bold leading-none text-center text-red-400">
                      {trend.value}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col self-stretch my-auto w-14">
              <div className="flex flex-col justify-center items-center w-14 h-14 rounded-xl bg-orange-500 bg-opacity-10 min-h-[56px]">
                <div className="flex flex-1 justify-center items-center p-3 size-full">
                  <img src={icon} alt="" className="object-contain w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string,
  icon: PropTypes.string.isRequired,
  trend: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }),
};