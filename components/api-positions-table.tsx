"use client"

import { Card } from "@/components/ui/card"
import type { Position } from "@/mock/data"

interface APIPositionsTableProps {
  positions: Position[]
}

export default function APIPositionsTable({ positions }: APIPositionsTableProps) {
  if (positions.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">No open positions</p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">Open Positions ({positions.length})</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Symbol</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Size</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Entry Price</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Mark Price</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">P&L</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">P&L %</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((pos) => {
              const pnlPercent = ((pos.mark - pos.entry) / pos.entry) * 100
              return (
                <tr key={pos.symbol} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-foreground">{pos.symbol}</span>
                  </td>
                  <td className="text-right py-3 px-4 text-foreground">{pos.size}</td>
                  <td className="text-right py-3 px-4 text-foreground">${pos.entry.toFixed(2)}</td>
                  <td className="text-right py-3 px-4 text-foreground">${pos.mark.toFixed(2)}</td>
                  <td
                    className={`text-right py-3 px-4 font-semibold ${pos.pnl >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {pos.pnl >= 0 ? "+" : ""}
                    {pos.pnl.toFixed(2)}
                  </td>
                  <td
                    className={`text-right py-3 px-4 font-semibold ${
                      pnlPercent >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {pnlPercent >= 0 ? "+" : ""}
                    {pnlPercent.toFixed(2)}%
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
