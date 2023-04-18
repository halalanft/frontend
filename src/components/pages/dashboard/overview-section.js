export default function OverviewSection() {
  const dataOverview = [
    { title: 'Income', label: '/Day' },
    { title: 'To Claim', label: '223' },
    { title: 'Total Ever Claimed', label: '500' },
  ]
  return (
    <div>
      <div>
        <h2 className="mb-3 text-xl font-semibold text-[#393E4B]">Overview</h2>
      </div>
      <div className="mb-8 space-y-4">
        {dataOverview.map((item, index) => (
          <div
            key={index}
            className="mx-auto flex items-center space-x-4 rounded-xl bg-white p-3 shadow-lg"
          >
            <div className="flex flex-auto items-center justify-between">
              <p className="text-lg font-bold text-slate-500">{item.title}</p>

              <p className=" text-slate-500">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
      <button block className="bg-[#363755]">
        Go to My Rewards
      </button>
    </div>
  )
}
