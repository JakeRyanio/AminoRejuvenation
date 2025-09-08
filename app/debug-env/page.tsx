"use client"

import React from "react"

export default function DebugEnvPage() {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  return (
    <div className="min-h-screen bg-[#201c1a] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Environment Variables Debug</h1>
        
        <div className="bg-[#2a2624] p-6 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Client-Side Environment Variables</h2>
          
          <div className="space-y-3">
            <div>
              <span className="text-gray-400">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:</span>
              <div className="font-mono text-sm mt-1 p-2 bg-[#201c1a] rounded">
                <span className="text-green-400">
                  {publishableKey ? `${publishableKey.substring(0, 15)}...` : "❌ NOT SET"}
                </span>
              </div>
            </div>
            
            <div>
              <span className="text-gray-400">Key Type:</span>
              <div className="font-mono text-sm mt-1 p-2 bg-[#201c1a] rounded">
                <span className="text-blue-400">
                  {publishableKey?.startsWith('pk_live_') ? '✅ LIVE KEY' : 
                   publishableKey?.startsWith('pk_test_') ? '⚠️ TEST KEY' : 
                   publishableKey === 'pk_test_placeholder' ? '❌ PLACEHOLDER' :
                   '❌ INVALID FORMAT'}
                </span>
              </div>
            </div>
            
            <div>
              <span className="text-gray-400">NEXT_PUBLIC_BASE_URL:</span>
              <div className="font-mono text-sm mt-1 p-2 bg-[#201c1a] rounded">
                <span className="text-green-400">
                  {baseUrl || "❌ NOT SET"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2a2624] p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Stripe Initialization Test</h2>
          
          <div className="space-y-3">
            <div>
              <span className="text-gray-400">Can Initialize Stripe:</span>
              <div className="font-mono text-sm mt-1 p-2 bg-[#201c1a] rounded">
                <span className={publishableKey && publishableKey !== "pk_test_placeholder" ? "text-green-400" : "text-red-400"}>
                  {publishableKey && publishableKey !== "pk_test_placeholder" ? "✅ YES" : "❌ NO"}
                </span>
              </div>
            </div>
            
            <div>
              <span className="text-gray-400">Reason:</span>
              <div className="font-mono text-sm mt-1 p-2 bg-[#201c1a] rounded">
                <span className="text-yellow-400">
                  {!publishableKey ? "Environment variable not set" :
                   publishableKey === "pk_test_placeholder" ? "Using placeholder value" :
                   "Should work"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
