"use client"

import { useEffect } from 'react'

export function SafariAutofillFix() {
  useEffect(() => {
    // Detect Safari on mobile
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    
    if (isSafari && isMobile) {
      // Force override Safari autofill styling
      const style = document.createElement('style')
      style.textContent = `
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px rgb(225 237 236) inset !important;
          -webkit-text-fill-color: rgb(58 66 59) !important;
          background-color: rgb(225 237 236) !important;
          background-image: none !important;
          color: rgb(58 66 59) !important;
          transition: background-color 5000s ease-in-out 0s !important;
        }
        
        input, select, textarea {
          background-color: rgb(225 237 236) !important;
          color: rgb(58 66 59) !important;
        }
      `
      document.head.appendChild(style)

      // Force re-apply styles on input focus/blur
      const inputs = document.querySelectorAll('input, select, textarea')
      inputs.forEach((input) => {
        const element = input as HTMLElement
        element.addEventListener('focus', () => {
          element.style.backgroundColor = 'rgb(225 237 236)'
          element.style.color = 'rgb(58 66 59)'
        })
        element.addEventListener('blur', () => {
          element.style.backgroundColor = 'rgb(225 237 236)'
          element.style.color = 'rgb(58 66 59)'
        })
      })
    }
  }, [])

  return null
}
