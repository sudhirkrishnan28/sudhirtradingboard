"use client"

import { metamask } from "@/mock/data"
import WalletCard from "@/components/wallet-card"

export default function WalletPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Wallet</h1>
          <p className="text-muted-foreground mt-2">View your connected wallet information</p>
        </div>

        <WalletCard wallet={metamask} />
      </div>
    </main>
  )
}
