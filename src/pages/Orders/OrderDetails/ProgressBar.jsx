

function ProgressBar() {
  const steps = [
    { label: 'Order Confirming', status: 'completed' },
    { label: 'Payment Pending', status: 'completed' },
    { label: 'Processing', status: 'in-progress' },
    { label: 'Shipping', status: 'pending' },
    { label: 'Delivered', status: 'pending' }
  ];

  return (
    <div className="flex flex-wrap gap-3 mt-2.5">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col px-3 pt-6 min-h-[67px]">
          <div className="flex overflow-hidden justify-center w-full rounded-xl bg-slate-100 min-h-[10px]">
            <div 
              className={`flex flex-1 shrink w-full min-h-[10px] ${
                step.status === 'completed' ? 'bg-green-500' :
                step.status === 'in-progress' ? 'bg-amber-400' : ''
              }`}
              style={{ width: step.status === 'in-progress' ? '120px' : '100%' }}
            />
          </div>
          <div className="mt-3 text-sm leading-5 text-slate-500">{step.label}</div>
        </div>
      ))}
    </div>
  );
}

export default ProgressBar;