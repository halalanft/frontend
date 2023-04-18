import { DashboardLayout } from '@/components/layout'
import {
  AttributesSection,
  FeatureSection,
  MyPurchasesSection,
  NFTDetailSection,
  OverviewSection,
} from '@/components/pages/dashboard/index'

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-4 md:col-span-4 rounded-md bg-slate-100 p-4">
        <MyPurchasesSection />
      </div>
      <div className="col-span-4 md:col-span-1 rounded-md bg-slate-100 p-4">
        <FeatureSection />
      </div>
      <div className="col-span-4 md:col-span-3 rounded-md bg-slate-100 p-4">
        <NFTDetailSection />
      </div>
      <div className="col-span-4 md:col-span-1 rounded-md bg-slate-100 p-4">
        <AttributesSection />
      </div>
      <div className="col-span-4 md:col-span-3 rounded-md bg-slate-100 p-4">
        <OverviewSection />
      </div>
    </div>
  )
}

DashboardPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
