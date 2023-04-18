import { MintingHeader } from '../header'
import { UserDashboardSider } from '../dashboard-sider'

export default function DashboardLayout({ children }) {
  return (
    <div className="block min-h-screen min-w-full overflow-x-hidden">
      <MintingHeader />
      <main className="grid grid-cols-2 lg:grid-cols-12 p-4 gap-4">
        <div className="bg-slate-100 col-span-4 lg:col-span-2 p-4 rounded-md">
          <UserDashboardSider />
        </div>
        <div className="col-span-4 lg:col-span-10">{children}</div>
      </main>
    </div>
  )
}
