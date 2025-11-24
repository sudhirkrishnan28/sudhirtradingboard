"use client"

import { accounts } from "@/mock/data"
import PositionCard from "@/components/position-card"

export default function PositionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Open Positions</h1>
          <p className="text-muted-foreground mt-2">Manage your active trading positions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {accounts.map((account) => (
            <PositionCard key={account.id} account={account} />
          ))}
        </div>
      </div>
    </main>
  )
}
