"use client"
import { useRouter } from "next/navigation"
import { accounts, orderbookData } from "@/mock/data"
import APIDetailHeader from "@/components/api-detail-header"
import APIPositionsTable from "@/components/api-positions-table"
import OrderbookChart from "@/components/orderbook-chart"

interface APIDetailPageProps {
  params: {
    id: string
  }
}

export default function APIDetailPage({ params }: APIDetailPageProps) {
  const router = useRouter()
  const account = accounts.find((acc) => acc.id === params.id)

  if (!account) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">API Not Found</h1>
          <button onClick={() => router.push("/api-management")} className="text-primary hover:underline">
            Go back to API Management
          </button>
        </div>
      </main>
    )
  }

  const firstSymbol = account.positions[0]?.symbol || "BTCUSDT"
  const selectedOrderbook = orderbookData[firstSymbol as keyof typeof orderbookData] || orderbookData.BTCUSDT

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <APIDetailHeader account={account} onBack={() => router.push("/api-management")} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <APIPositionsTable positions={account.positions} />
          </div>

          <div>
            <OrderbookChart data={selectedOrderbook} />
          </div>
        </div>

        {/* Additional Orderbooks for other positions */}
        {account.positions.length > 1 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Other Orderbooks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {account.positions.slice(1).map((pos) => {
                const orderbook = orderbookData[pos.symbol as keyof typeof orderbookData]
                return orderbook ? <OrderbookChart key={pos.symbol} data={orderbook} /> : null
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
