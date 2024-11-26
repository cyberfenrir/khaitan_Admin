function PaymentInfo() {
  return (
    <section className="flex flex-col pb-7 mt-6 w-full bg-white rounded-xl shadow-sm">
      <h2 className="px-6 pt-5 pb-5 text-base font-semibold leading-4 border-b border-solid border-b-slate-200 text-slate-700">
        Payment Information
      </h2>
      <div className="flex flex-col items-start px-6 mt-6 w-full">
        <div className="flex gap-5 justify-between self-stretch w-full">
          <div className="flex justify-center items-center p-1.5 w-12 h-12 rounded-2xl bg-slate-100 min-h-[48px]">
            <div className="flex overflow-hidden flex-col self-stretch my-auto w-9 min-h-[36px]">
              <div className="flex overflow-hidden flex-col justify-center items-center w-full min-h-[36px]">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/0342d68c97013b499a9671bb44945568ca9db91694410ca0bb4d989dbe4028dc?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9" alt="Mastercard logo" className="object-contain w-full aspect-square" />
              </div>
            </div>
          </div>
          <div className="flex flex-col my-auto text-sm leading-5 text-slate-700">
            <div className="flex gap-5 justify-between items-start">
              <div>Master Card</div>
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/dbdcf7ae1da0af6f2ebe6f590ec6b096c47961e7f5fdfb6cc8b017a63fc1be78?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9" alt="" className="object-contain shrink-0 aspect-square w-[22px]" />
            </div>
            <div className="self-start h-[21px]">xxxx xxxx xxxx 7812</div>
          </div>
        </div>
        <div className="flex gap-1 mt-8">
          <div className="grow text-sm leading-5 h-[21px] text-slate-700">Transaction ID : </div>
          <div className="text-sm leading-5 text-slate-500">#IDN768139059</div>
        </div>
        <div className="flex gap-1.5 mt-5">
          <div className="grow text-sm leading-5 h-[21px] text-slate-700">Card Holder Name : </div>
          <div className="text-sm leading-5 text-slate-500">Gaston Lapierre</div>
        </div>
      </div>
    </section>
  );
}

export default PaymentInfo;