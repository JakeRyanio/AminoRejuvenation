"use client"

import { useEffect } from 'react'

export function SafariAutofillFix() {
  useEffect(() => {
    // Detect Safari on mobile
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    
    if (isSafari && isMobile) {
      // NUCLEAR OPTION: Force override Safari autofill styling
      const style = document.createElement('style')
      style.textContent = `
        input, select, textarea {
          background-color: #E1EDEC !important;
          color: #3A423B !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          appearance: none !important;
        }
        
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          background-color: #E1EDEC !important;
          color: #3A423B !important;
          -webkit-box-shadow: 0 0 0 1000px #E1EDEC inset !important;
          -webkit-text-fill-color: #3A423B !important;
          background-image: none !important;
          transition: background-color 5000s ease-in-out 0s !important;
        }
        
        input[type="text"],
        input[type="email"],
        input[type="tel"],
        input[type="password"],
        input[type="search"],
        input[type="url"],
        input[type="number"] {
          background-color: #E1EDEC !important;
          color: #3A423B !important;
        }
      `
      document.head.appendChild(style)

      // Force re-apply styles continuously
      const forceStyle = () => {
        const inputs = document.querySelectorAll('input, select, textarea')
        inputs.forEach((input) => {
          const element = input as HTMLElement
          element.style.backgroundColor = '#E1EDEC'
          element.style.color = '#3A423B'
          element.style.setProperty('-webkit-box-shadow', '0 0 0 1000px #E1EDEC inset', 'important')
          element.style.setProperty('-webkit-text-fill-color', '#3A423B', 'important')
        })
      }

      // Apply immediately
      forceStyle()

      // Apply on focus/blur
      const inputs = document.querySelectorAll('input, select, textarea')
      inputs.forEach((input) => {
        const element = input as HTMLElement
        element.addEventListener('focus', forceStyle)
        element.addEventListener('blur', forceStyle)
        element.addEventListener('input', forceStyle)
        element.addEventListener('change', forceStyle)
      })

      // Apply every 100ms to override Safari
      const interval = setInterval(forceStyle, 100)

      // Cleanup
      return () => {
        clearInterval(interval)
      }
    }
  }, [])

  return null
}
