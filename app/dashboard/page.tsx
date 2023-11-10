import { Card } from "@/app/ui/dashboard/cards"
import RevenueChart from "@/app/ui/dashboard/revenue-chart"
import LatestInvoices from "@/app/ui/dashboard/latest-invoices"
import { lusitana } from "@/app/ui/fonts"
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "@/app/lib/data"

export default async function Page() {
  // 아래 3개의 요청은 일명 "request waterfalls" 이 되면서 성능저하가 일어나는 코드 패턴이다.
  // 다음 챕터에서 이를 개선해본다.
  const revenue = await fetchRevenue() // revenue를 콘솔로그로 찍어보면 클라이언트가 아닌 서버(vscode 콘솔)에 찍힘
  const latestInvoices = await fetchLatestInvoices()
  const { numberOfInvoices, numberOfCustomers, totalPaidInvoices, totalPendingInvoices } =
    await fetchCardData()

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card title="Total Customers" value={numberOfCustomers} type="customers" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  )
}
