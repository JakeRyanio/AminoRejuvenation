"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"

interface Review {
  id: string
  name: string
  role: string
  content: string
  rating: number
  date: string
}

export function Testimonials() {
  const [userReviews, setUserReviews] = useState<Review[]>([])

  // Default testimonials - research-compliant language
  const defaultTestimonials = [
    {
      id: "1",
      name: "Kathy",
      role: "Virginia",
      content: "You cannot find a higher quality peptide at a better price. The packaging and documentation are excellent.",
      rating: 5,
      date: "2024-01-15",
    },
    {
      id: "2", 
      name: "Mike",
      role: "Texas",
      content: "Fast shipping and excellent customer service. The quality of these research materials is outstanding.",
      rating: 5,
      date: "2024-02-20",
    },
    {
      id: "3",
      name: "Sarah", 
      role: "California",
      content: "I've been ordering from Precision Peptides for months now and the consistency is amazing. Highly recommend!",
      rating: 5,
      date: "2024-03-10",
    },
    {
      id: "4",
      name: "David",
      role: "Florida",
      content: "Best prices I've found anywhere. The quality is top-notch and delivery is always on time.",
      rating: 5,
      date: "2024-03-15",
    },
    {
      id: "5",
      name: "Jennifer",
      role: "New York",
      content: "Great quality products and the customer support team is incredibly helpful. Will definitely order again.",
      rating: 5,
      date: "2024-03-20",
    },
  ]

  useEffect(() => {
    // Load user reviews from localStorage
    const storedReviews = localStorage.getItem("userReviews")
    if (storedReviews) {
      try {
        const reviews = JSON.parse(storedReviews)
        setUserReviews(reviews)
      } catch (error) {
        console.error("Error loading user reviews:", error)
      }
    }
  }, [])

  // Combine default and user reviews
  const allReviews = [...defaultTestimonials, ...userReviews]

  return (
    <section className="py-20 content-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-medium mb-4 text-[#ebe7e4]">Our Clients Come First</h2>
          <p className="text-xl text-[#beb2a4] font-light">
            See what our valued customers are saying about their experience
          </p>
        </div>

        {/* Scrolling Reviews Banner */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of reviews */}
            {allReviews.map((review, index) => (
              <div
                key={`first-${review.id}`}
                className="flex-shrink-0 w-80 mx-4 elegant-card p-6 bg-gradient-to-br from-emerald-200/10 to-emerald-300/20 border border-emerald-300/20"
              >
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-emerald-300 fill-current" />
                  ))}
                </div>

                <p className="text-[#beb2a4] mb-4 italic leading-relaxed text-sm">
                  "{review.content}"
                </p>

                <div>
                  <p className="font-medium text-[#ebe7e4] text-sm">{review.name}</p>
                  <p className="text-emerald-300 text-xs">{review.role}</p>
                </div>
              </div>
            ))}

            {/* Duplicate set for seamless scrolling */}
            {allReviews.map((review, index) => (
              <div
                key={`second-${review.id}`}
                className="flex-shrink-0 w-80 mx-4 elegant-card p-6 bg-gradient-to-br from-sky-200/10 to-sky-300/20 border border-sky-300/20"
              >
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-sky-300 fill-current" />
                  ))}
                </div>

                <p className="text-[#beb2a4] mb-4 italic leading-relaxed text-sm">
                  "{review.content}"
                </p>

                <div>
                  <p className="font-medium text-[#ebe7e4] text-sm">{review.name}</p>
                  <p className="text-sky-300 text-xs">{review.role}</p>
                </div>
              </div>
            ))}

            {/* Third set for variety */}
            {allReviews.map((review, index) => (
              <div
                key={`third-${review.id}`}
                className="flex-shrink-0 w-80 mx-4 elegant-card p-6 bg-gradient-to-br from-purple-200/10 to-purple-300/20 border border-purple-300/20"
              >
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-purple-300 fill-current" />
                  ))}
                </div>

                <p className="text-[#beb2a4] mb-4 italic leading-relaxed text-sm">
                  "{review.content}"
                </p>

                <div>
                  <p className="font-medium text-[#ebe7e4] text-sm">{review.name}</p>
                  <p className="text-purple-300 text-xs">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
