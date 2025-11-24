"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Account } from "@/mock/data"

interface APIDetailHeaderProps {
  account: Account
  onBack: () => void
}

export default function APIDetailHeader({ account, onBack }: APIDetailHeaderProps) {
  const totalPnL = account.positions.reduce((sum, pos) => sum + pos.pnl, 0)
  const totalSize = account.positions.length

  return (
    <Card className="p-6 mb-6">
      <Button variant="outline" size="sm" onClick={onBack} className="mb-4 bg-transparent">
        ← Back to APIs
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">API Name</p>
          <h1 className="text-2xl font-bold text-foreground">{account.name}</h1>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Wallet Balance</p>
          <p className="text-2xl font-bold text-foreground">${account.walletBalance.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">USDT</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Today's P&L</p>
          <p className={`text-2xl font-bold ${account.todayProfit >= 0 ? "text-green-500" : "text-red-500"}`}>
            {account.todayProfit >= 0 ? "+" : ""}
            {account.todayProfit.toFixed(2)}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Total P&L</p>
          <p className={`text-2xl font-bold ${totalPnL >= 0 ? "text-green-500" : "text-red-500"}`}>
            {totalPnL >= 0 ? "+" : ""}
            {totalPnL.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Daily Loss Limit</p>
          <p className="font-semibold text-foreground">${account.dailyLossLimit}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Overall Loss Limit</p>
          <p className="font-semibold text-foreground">${account.overallLossLimit}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Current Day Loss</p>
          <p className={`font-semibold ${account.currentDayLoss >= 0 ? "text-green-500" : "text-red-500"}`}>
            {account.currentDayLoss >= 0 ? "+" : ""}
            {account.currentDayLoss.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Open Positions</p>
          <p className="font-semibold text-foreground">{totalSize}</p>
        </div>
      </div>
    </Card>
  )
}
