function MapView() {
  return (
    <section className="flex flex-col px-6 pt-6 pb-8 mt-6 w-full bg-white rounded-xl shadow-sm">
      <div className="flex overflow-hidden flex-col justify-center w-full rounded-xl min-h-[418px]">
        <div className="flex flex-col flex-1 w-full bg-zinc-500">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/95a33b236bf4ff143f44b951bf72b0be3f5dedbb84a1e70ddb3f4525a9ea21d4?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9" alt="Map view" className="object-contain flex-1 max-w-full aspect-[0.76] w-[318px]" />
        </div>
      </div>
    </section>
  );
}

export default MapView;