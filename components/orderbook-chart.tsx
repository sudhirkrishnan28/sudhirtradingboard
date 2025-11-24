"use client"

import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from "recharts"
import { Card } from "@/components/ui/card"
import type { OrderbookData } from "@/mock/data"

interface OrderbookChartProps {
  data: OrderbookData
}

export default function OrderbookChart({ data }: OrderbookChartProps) {
  // Prepare chart data - combine bids and asks for visualization
  const chartData = [
    ...data.bids
      .sort((a, b) => b.price - a.price)
      .slice(0, 5)
      .reverse()
      .map((bid) => ({
        price: bid.price,
        bid: bid.quantity,
        ask: 0,
        type: "bid",
      })),
    ...data.asks
      .sort((a, b) => a.price - b.price)
      .slice(0, 5)
      .map((ask) => ({
        price: ask.price,
        bid: 0,
        ask: ask.quantity,
        type: "ask",
      })),
  ]

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">{data.symbol} Orderbook</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="price" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-card)",
              border: "1px solid var(--color-border)",
            }}
          />
          <Legend />
          <Bar dataKey="bid" fill="var(--color-green-500)" name="Buy Orders (Bids)" />
          <Bar dataKey="ask" fill="var(--color-red-500)" name="Sell Orders (Asks)" />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-xs text-muted-foreground mb-2">Total Bid Volume</p>
          <p className="text-lg font-bold text-foreground">
            {data.bids.reduce((sum, b) => sum + b.quantity, 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-xs text-muted-foreground mb-2">Total Ask Volume</p>
          <p className="text-lg font-bold text-foreground">
            {data.asks.reduce((sum, a) => sum + a.quantity, 0).toFixed(2)}
          </p>
        </div>
      </div>
    </Card>
  )
}
