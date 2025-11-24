import { Card } from "@/components/ui/card"
import type { WalletData } from "@/mock/data"

interface WalletCardProps {
  wallet: WalletData
}

export default function WalletCard({ wallet }: WalletCardProps) {
  return (
    <Card className="p-8 max-w-md">
      <h2 className="text-2xl font-bold text-foreground mb-6">MetaMask Wallet</h2>

      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Wallet Address</p>
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm font-mono text-foreground break-all">{wallet.address}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">ETH Balance</p>
          <p className="text-3xl font-bold text-foreground">{wallet.balanceETH} ETH</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">USD Value</p>
          <p className="text-3xl font-bold text-primary">
            ${wallet.balanceUSD.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </Card>
  )
}
