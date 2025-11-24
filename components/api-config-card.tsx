"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { APIConfig } from "@/mock/data"

interface APIConfigCardProps {
  api: APIConfig
  onEdit?: (api: APIConfig) => void
  onDelete?: (id: string) => void
  accountId?: string
}

export default function APIConfigCard({ api, onEdit, onDelete, accountId }: APIConfigCardProps) {
  const router = useRouter()

  const handleViewDetails = () => {
    if (accountId) {
      router.push(`/api-detail/${accountId}`)
    }
  }

  return (
    <Card
      className="p-6 hover:shadow-lg transition-shadow cursor-pointer hover:bg-muted/50"
      onClick={handleViewDetails}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{api.name}</h3>
          <p className="text-xs text-muted-foreground mt-1">Created: {api.createdAt.toLocaleDateString()}</p>
        </div>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${
            api.status === "active" ? "bg-green-500/20 text-green-500" : "bg-gray-500/20 text-gray-500"
          }`}
        >
          {api.status === "active" ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="space-y-3 mb-4 pb-4 border-b border-border">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Daily Loss Limit</p>
            <p className="text-lg font-bold text-foreground">${api.dailyLossLimit.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Overall Loss Limit</p>
            <p className="text-lg font-bold text-foreground">${api.overallLossLimit.toLocaleString()}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">API Key</p>
          <p className="text-sm font-mono text-foreground">{api.apiKey.substring(0, 8)}••••••••••••••••</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button size="sm" onClick={handleViewDetails} className="flex-1">
          View Details
        </Button>
        {onEdit && (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onEdit(api)
            }}
            className="flex-1"
          >
            Edit
          </Button>
        )}
        {onDelete && (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(api.id)
            }}
            className="flex-1 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            Delete
          </Button>
        )}
      </div>
    </Card>
  )
}
