function StatCard({ title, value, icon }) {
  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 max-md:px-5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-semibold leading-4 text-slate-700">
                {title}
              </h2>
              <div className="mt-3 text-2xl leading-8 text-slate-500">
                {value}
              </div>
            </div>
            <div className="w-14 h-14 rounded-xl bg-orange-500 bg-opacity-10 flex justify-center items-center">
              <img
                src={icon}
                alt=""
                className="w-8 h-8 object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;