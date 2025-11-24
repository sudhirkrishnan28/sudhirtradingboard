import { Card } from "@/components/ui/card"
import type { Account } from "@/mock/data"

interface PositionCardProps {
  account: Account
}

export default function PositionCard({ account }: PositionCardProps) {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{account.name}</h3>
        <p className="text-sm text-muted-foreground">Balance: ${account.walletBalance.toLocaleString()}</p>
      </div>

      <div className="space-y-3">
        {account.positions.length > 0 ? (
          account.positions.map((pos) => (
            <div key={pos.symbol} className="border border-border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-base font-bold text-foreground">{pos.symbol}</p>
                  <p className="text-xs text-muted-foreground">Size: {pos.size}</p>
                </div>
                <span
                  className={`text-sm font-bold px-2 py-1 rounded ${
                    pos.pnl >= 0 ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                  }`}
                >
                  {pos.pnl >= 0 ? "+" : ""}
                  {pos.pnl.toFixed(2)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Entry Price</p>
                  <p className="font-semibold text-foreground">${pos.entry.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Mark Price</p>
                  <p className="font-semibold text-foreground">${pos.mark.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground italic text-center py-8">No open positions</p>
        )}
      </div>
    </Card>
  )
}
