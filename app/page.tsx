"use client"

import { useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { accounts, profitGraph } from "@/mock/data"
import AccountCard from "@/components/account-card"

export default function HomePage() {
  const totalProfit = useMemo(() => {
    return accounts.reduce((sum, acc) => sum + acc.todayProfit, 0)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Total Profit Section */}
        <div className="mb-8">
          <div className="bg-card border border-border rounded-lg p-8">
            <p className="text-sm text-muted-foreground mb-2">Total Profit Today</p>
            <div className="flex items-baseline gap-2">
              <h1 className="text-5xl font-bold text-foreground">
                {totalProfit >= 0 ? "+" : ""}
                {totalProfit.toFixed(2)}
              </h1>
              <span className="text-lg text-muted-foreground">USDT</span>
            </div>
            <span
              className={`text-sm font-semibold mt-2 inline-block px-3 py-1 rounded-full ${
                totalProfit >= 0 ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
              }`}
            >
              {totalProfit >= 0 ? "📈 Profitable" : "📉 Loss"}
            </span>
          </div>
        </div>

        {/* Profit Graph */}
        <div className="mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Profit Chart (24h)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={profitGraph}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="time" stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
                <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "var(--color-foreground)" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-primary)", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Accounts Grid */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Profit Per API</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
