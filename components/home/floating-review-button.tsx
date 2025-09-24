"use client"

import { useState } from "react"
import { MessageSquare, X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Review } from "@/lib/types"

export function FloatingReviewButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, you'd send this to your backend
      // For now, we'll store it in localStorage
      const newReview: Review = {
        id: Date.now().toString(),
        name: formData.name,
        role: formData.role,
        content: formData.content,
        rating: formData.rating,
        date: new Date().toISOString(),
      }

      // Get existing reviews from localStorage
      const existingReviews = JSON.parse(localStorage.getItem("userReviews") || "[]")
      const updatedReviews = [...existingReviews, newReview]
      localStorage.setItem("userReviews", JSON.stringify(updatedReviews))

      // Reset form and close modal
      setFormData({ name: "", role: "", content: "", rating: 5 })
      setIsOpen(false)
      
      // Show success message
      alert("Thank you for your review! It will be displayed on our website.")
    } catch (error) {
      console.error("Error submitting review:", error)
      alert("There was an error submitting your review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Review Button - Positioned above testimonials */}
      <div className="py-12 bg-[#201c1a]">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <Button
              onClick={() => setIsOpen(true)}
              className="bg-gradient-to-r from-[#d2c6b8] to-[#beb2a4] hover:from-[#beb2a4] hover:to-[#a89a8c] text-[#201c1a] font-medium rounded-2xl px-8 py-4 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border-2 border-[#ebe7e4]/20 text-lg"
            >
              <MessageSquare className="h-6 w-6 mr-3" />
              <span className="font-semibold">Share Your Experience</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          
          <div className="relative bg-[#201c1a] border border-[#403c3a] rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium text-[#ebe7e4]">Share Your Experience</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-[#beb2a4] hover:text-[#ebe7e4]"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-[#ebe7e4]">Your Name *</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="elegant-input"
                  placeholder="Your first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-[#ebe7e4]">Location *</label>
                <Input
                  required
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="elegant-input"
                  placeholder="e.g., California, Texas, New York"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-[#ebe7e4]">Rating *</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      className={`p-1 transition-colors ${
                        star <= formData.rating ? "text-yellow-400" : "text-[#403c3a]"
                      }`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-[#ebe7e4]">Your Review *</label>
                <div className="mb-2 p-3 bg-amber-900/20 border border-amber-500/30 rounded-md">
                  <p className="text-amber-300 text-xs">
                    <strong>Note:</strong> Please focus on quality, pricing, shipping, and overall experience. 
                    Reviews are for research purposes only.
                  </p>
                </div>
                <Textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="elegant-input"
                  placeholder="Share your experience with our products, quality, pricing, shipping, etc..."
                  rows={4}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 border-[#403c3a] text-[#ebe7e4] hover:bg-[#403c3a]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#d2c6b8] hover:bg-[#beb2a4] text-[#201c1a] font-medium"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
} 