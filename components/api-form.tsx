"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { APIConfig } from "@/mock/data"

interface APIFormProps {
  onSubmit: (apiConfig: APIConfig) => void
  isLoading?: boolean
}

export default function APIForm({ onSubmit, isLoading = false }: APIFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    apiKey: "",
    apiSecret: "",
    dailyLossLimit: 500,
    overallLossLimit: 2000,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) : value,
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "API name is required"
    if (!formData.apiKey.trim()) newErrors.apiKey = "API key is required"
    if (!formData.apiSecret.trim()) newErrors.apiSecret = "API secret is required"
    if (formData.dailyLossLimit <= 0) newErrors.dailyLossLimit = "Daily loss limit must be greater than 0"
    if (formData.overallLossLimit <= 0) newErrors.overallLossLimit = "Overall loss limit must be greater than 0"
    if (formData.overallLossLimit < formData.dailyLossLimit) {
      newErrors.overallLossLimit = "Overall loss limit must be greater than daily loss limit"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const newAPI: APIConfig = {
      id: `api-${Date.now()}`,
      name: formData.name,
      apiKey: formData.apiKey,
      apiSecret: formData.apiSecret,
      dailyLossLimit: formData.dailyLossLimit,
      overallLossLimit: formData.overallLossLimit,
      status: "active",
      createdAt: new Date(),
    }

    onSubmit(newAPI)

    // Reset form
    setFormData({
      name: "",
      apiKey: "",
      apiSecret: "",
      dailyLossLimit: 500,
      overallLossLimit: 2000,
    })
    setErrors({})
  }

  return (
    <Card className="p-8 max-w-2xl">
      <h2 className="text-2xl font-bold text-foreground mb-6">Add New API</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* API Name */}
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            API Name *
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="e.g., Bybit Account 1"
            value={formData.name}
            onChange={handleChange}
            className="mt-2"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* API Key */}
        <div>
          <Label htmlFor="apiKey" className="text-sm font-medium text-foreground">
            API Key *
          </Label>
          <Input
            id="apiKey"
            name="apiKey"
            type="password"
            placeholder="Enter your API key"
            value={formData.apiKey}
            onChange={handleChange}
            className="mt-2"
          />
          {errors.apiKey && <p className="text-red-500 text-sm mt-1">{errors.apiKey}</p>}
        </div>

        {/* API Secret */}
        <div>
          <Label htmlFor="apiSecret" className="text-sm font-medium text-foreground">
            API Secret *
          </Label>
          <Input
            id="apiSecret"
            name="apiSecret"
            type="password"
            placeholder="Enter your API secret"
            value={formData.apiSecret}
            onChange={handleChange}
            className="mt-2"
          />
          {errors.apiSecret && <p className="text-red-500 text-sm mt-1">{errors.apiSecret}</p>}
        </div>

        {/* Daily Loss Limit */}
        <div>
          <Label htmlFor="dailyLossLimit" className="text-sm font-medium text-foreground">
            Daily Loss Limit (USDT) *
          </Label>
          <Input
            id="dailyLossLimit"
            name="dailyLossLimit"
            type="number"
            placeholder="500"
            value={formData.dailyLossLimit}
            onChange={handleChange}
            className="mt-2"
            min="0"
            step="100"
          />
          {errors.dailyLossLimit && <p className="text-red-500 text-sm mt-1">{errors.dailyLossLimit}</p>}
          <p className="text-xs text-muted-foreground mt-1">Maximum loss allowed per day</p>
        </div>

        {/* Overall Loss Limit */}
        <div>
          <Label htmlFor="overallLossLimit" className="text-sm font-medium text-foreground">
            Overall Loss Limit (USDT) *
          </Label>
          <Input
            id="overallLossLimit"
            name="overallLossLimit"
            type="number"
            placeholder="2000"
            value={formData.overallLossLimit}
            onChange={handleChange}
            className="mt-2"
            min="0"
            step="100"
          />
          {errors.overallLossLimit && <p className="text-red-500 text-sm mt-1">{errors.overallLossLimit}</p>}
          <p className="text-xs text-muted-foreground mt-1">Maximum overall loss allowed for this API</p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? "Adding API..." : "Add API"}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          * All fields are required. Your API credentials are encrypted and stored securely.
        </p>
      </form>
    </Card>
  )
}
