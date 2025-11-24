"use client"

import { useState, useEffect } from "react"
import APIForm from "@/components/api-form"
import APIConfigCard from "@/components/api-config-card"
import type { APIConfig } from "@/mock/data"
import { useRouter } from "next/navigation"

export default function APIManagementPage() {
  const [apiConfigs, setApiConfigs] = useState<APIConfig[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null)
  const accounts = [{ id: "1" }, { id: "2" }, { id: "3" }] // Mock accounts data

  // Load saved APIs from localStorage on mount
  useEffect(() => {
    const savedAPIs = localStorage.getItem("apiConfigs")
    if (savedAPIs) {
      setApiConfigs(JSON.parse(savedAPIs))
    }
  }, [])

  // Save APIs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("apiConfigs", JSON.stringify(apiConfigs))
  }, [apiConfigs])

  const handleAddAPI = (newAPI: APIConfig) => {
    setIsLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      setApiConfigs((prev) => [...prev, newAPI])
      setIsLoading(false)
    }, 500)
  }

  const handleDeleteAPI = (id: string) => {
    if (confirm("Are you sure you want to delete this API configuration?")) {
      setApiConfigs((prev) => prev.filter((api) => api.id !== id))
    }
  }

  const handleEditAPI = (api: APIConfig) => {
    // For now, just log to console - can be extended with a modal
    console.log("Edit API:", api)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">API Management</h1>
          <p className="text-muted-foreground mt-2">Add and configure your trading APIs with loss limits</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <APIForm onSubmit={handleAddAPI} isLoading={isLoading} />
          </div>

          {/* Saved APIs Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Configured APIs ({apiConfigs.length})</h2>

              {apiConfigs.length === 0 ? (
                <div className="bg-card border border-border border-dashed rounded-lg p-12 text-center">
                  <p className="text-muted-foreground">No APIs configured yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Fill out the form on the left to add your first API
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {apiConfigs.map((api, index) => (
                    <APIConfigCard
                      key={api.id}
                      api={api}
                      onEdit={handleEditAPI}
                      onDelete={handleDeleteAPI}
                      accountId={accounts[index]?.id}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
