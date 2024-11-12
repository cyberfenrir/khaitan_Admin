function OrderTimeline() {
  const timelineEvents = [
    {
      title: 'The packing has been started',
      description: 'Confirmed by Gaston Lapierre',
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/09bc3f0ee3334ed08c46c5312d0da519543ab7687e40405c25eab32fdff36602?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9',
      date: 'April 23, 2024, 09:40 am'
    },
    {
      title: 'The Invoice has been sent to the customer',
      description: 'Invoice email was sent to hello@dundermuffilin.com',
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/09bc3f0ee3334ed08c46c5312d0da519543ab7687e40405c25eab32fdff36602?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9',
      date: 'April 23, 2024, 09:40 am',
      action: { text: 'Resend Invoice', type: 'secondary' }
    },
    {
      title: 'The Invoice has been created',
      description: 'Invoice created by Gaston Lapierre',
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/be8338242bab38608f5c0c228882bb175bf8648b8abd67e4d412a638d8b3a86b?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9',
      date: 'April 23, 2024, 09:40 am',
      action: { text: 'Download Invoice', type: 'primary' }
    },
    {
      title: 'Order Payment',
      description: 'Using Master Card',
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a4fe869c4a7b4b5e2e8e4c6e0a7e7100e4394492c96ca5d8f7fc3d25c6f28be2?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9',
      date: 'April 23, 2024, 09:40 am',
      status: { text: 'Paid', type: 'success' }
    },
    {
      title: '4 Order conform by Gaston Lapierre',
      description: '',
      icon: '',
      date: 'April 23, 2024, 09:40 am',
      tags: ['Order 1', 'Order 2', 'Order 3', 'Order 4']
    }
  ];

  return (
    <section className="flex flex-col p-6 bg-white rounded-xl shadow-sm">
      <h2 className="pb-4 text-lg font-semibold text-slate-700 border-b border-slate-200">
        Order Timeline
      </h2>
      
      <div className="flex gap-12 mt-8">
        {/* Timeline Left Column - Icons and Line */}
        <div className="relative hidden md:block">
          {/* Initial circle */}
          <div className="flex justify-center items-center w-10 h-10 rounded-2xl bg-slate-100">
            <div className="w-4 h-4 rounded-lg" />
          </div>
          
          {/* Vertical line */}
          <div className="absolute left-1/2 top-10 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />
          
          {/* Timeline icons */}
          <div className="relative">
            {timelineEvents.map((event, index) => (
              <div 
                key={index}
                className="flex justify-center items-center w-10 h-10 rounded-2xl bg-slate-100 mt-24"
              >
                {event.icon && (
                  <img 
                    src={event.icon} 
                    alt="" 
                    className="w-5 h-5 object-contain"
                    loading="lazy"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Content */}
        <div className="flex-1">
          <div className="flex flex-col space-y-24">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex justify-between items-start gap-8">
                {/* Event Content */}
                <div className="flex-1">
                  <h3 className="text-base font-medium text-slate-700">
                    {event.title}
                  </h3>
                  
                  {event.description && (
                    <p className="mt-3 text-sm text-slate-500">
                      {event.description}
                    </p>
                  )}
                  
                  {event.action && (
                    <button 
                      className={`mt-4 px-6 py-2.5 text-sm rounded-xl border ${
                        event.action.type === 'primary'
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'bg-slate-100 text-zinc-700 border-slate-100'
                      }`}
                    >
                      {event.action.text}
                    </button>
                  )}
                  
                  {event.status && (
                    <div className="flex items-center gap-3 mt-4">
                      <span className="text-sm text-slate-700">Status:</span>
                      <span className="px-3 py-1.5 text-sm font-medium text-green-500 bg-emerald-100 rounded">
                        {event.status.text}
                      </span>
                    </div>
                  )}
                  
                  {event.tags && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {event.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-3 py-1.5 text-sm text-slate-700 bg-slate-100 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Date */}
                <div className="text-sm text-slate-500 whitespace-nowrap">
                  {event.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderTimeline;