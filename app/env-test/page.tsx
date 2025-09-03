"use client"

import React, { useState, useEffect } from "react"

export default function EnvTestPage() {
  const [envInfo, setEnvInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkEnv = async () => {
      try {
        const response = await fetch('/api/test-env')
        const data = await response.json()
        setEnvInfo(data)
      } catch (error) {
        console.error('Error fetching env info:', error)
        setEnvInfo({ error: 'Failed to fetch environment info' })
      } finally {
        setLoading(false)
      }
    }

    checkEnv()
  }, [])

  return (
    <div className="min-h-screen bg-[#201c1a] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <h1 className="text-2xl font-medium text-[#ebe7e4] mb-4">Environment Test</h1>
        
        {loading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d2c6b8] mx-auto mb-4"></div>
        ) : (
          <div className="text-left space-y-2 text-sm">
            <div className="p-4 bg-[#2a2624] rounded-md">
              <h2 className="font-medium text-[#ebe7e4] mb-2">Server Environment Variables:</h2>
              <pre className="text-[#beb2a4] text-xs overflow-auto">
                {JSON.stringify(envInfo, null, 2)}
              </pre>
            </div>
            
            <div className="p-4 bg-[#2a2624] rounded-md">
              <h2 className="font-medium text-[#ebe7e4] mb-2">Client Environment Variables:</h2>
              <div className="text-[#beb2a4] text-xs">
                <div>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'SET' : 'NOT SET'}</div>
                <div>NEXT_PUBLIC_BASE_URL: {process.env.NEXT_PUBLIC_BASE_URL || 'NOT SET'}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 