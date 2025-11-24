import { Card } from "@/components/ui/card"
import type { Account } from "@/mock/data"

interface AccountCardProps {
  account: Account
}

export default function AccountCard({ account }: AccountCardProps) {
  const isProfitable = account.todayProfit >= 0

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{account.name}</h3>
          <p className="text-sm text-muted-foreground">Wallet Balance</p>
        </div>
        <span
          className={`text-sm font-bold px-3 py-1 rounded-full ${
            isProfitable ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
          }`}
        >
          {isProfitable ? "+" : ""}
          {account.todayProfit.toFixed(2)} USDT
        </span>
      </div>

      <div className="mb-4">
        <p className="text-2xl font-bold text-foreground">${account.walletBalance.toLocaleString()}</p>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-foreground mb-3">Positions ({account.positions.length})</h4>
        {account.positions.length > 0 ? (
          account.positions.map((pos) => (
            <div key={pos.symbol} className="flex justify-between text-sm pb-2 border-b border-border last:border-0">
              <div>
                <p className="font-medium text-foreground">{pos.symbol}</p>
                <p className="text-xs text-muted-foreground">Size: {pos.size}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">{pos.mark.toFixed(2)}</p>
                <p className={`text-xs font-semibold ${pos.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {pos.pnl >= 0 ? "+" : ""}
                  {pos.pnl.toFixed(2)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-muted-foreground italic">No open positions</p>
        )}
      </div>
    </Card>
  )
}
