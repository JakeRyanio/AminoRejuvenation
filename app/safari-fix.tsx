"use client"

import { useEffect } from 'react'

export function SafariAutofillFix() {
  useEffect(() => {
    // Detect Safari on mobile
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    
    if (isSafari && isMobile) {
      // ULTIMATE DESTROYER: Force override Safari autofill styling
      const style = document.createElement('style')
      style.textContent = `
        * {
          -webkit-tap-highlight-color: transparent !important;
        }
        
        input, select, textarea {
          background-color: #E1EDEC !important;
          color: #3A423B !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          appearance: none !important;
          -webkit-tap-highlight-color: transparent !important;
          -webkit-user-select: text !important;
          -webkit-box-shadow: 0 0 0 1000px #E1EDEC inset !important;
          -webkit-text-fill-color: #3A423B !important;
          background-image: none !important;
          transition: none !important;
        }
        
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active,
        input:-webkit-autofill:focus-visible,
        input:-webkit-autofill:focus-within {
          background-color: #E1EDEC !important;
          color: #3A423B !important;
          -webkit-box-shadow: 0 0 0 1000px #E1EDEC inset !important;
          -webkit-text-fill-color: #3A423B !important;
          background-image: none !important;
          transition: none !important;
          -webkit-animation: none !important;
          animation: none !important;
        }
        
        input[type="text"],
        input[type="email"],
        input[type="tel"],
        input[type="password"],
        input[type="search"],
        input[type="url"],
        input[type="number"],
        input[type="date"],
        input[type="time"] {
          background-color: #E1EDEC !important;
          color: #3A423B !important;
          -webkit-box-shadow: 0 0 0 1000px #E1EDEC inset !important;
          -webkit-text-fill-color: #3A423B !important;
        }
      `
      document.head.appendChild(style)

      // NUCLEAR FORCE: Apply styles every 50ms
      const forceStyle = () => {
        const inputs = document.querySelectorAll('input, select, textarea')
        inputs.forEach((input) => {
          const element = input as HTMLElement
          element.style.setProperty('background-color', '#E1EDEC', 'important')
          element.style.setProperty('color', '#3A423B', 'important')
          element.style.setProperty('-webkit-box-shadow', '0 0 0 1000px #E1EDEC inset', 'important')
          element.style.setProperty('-webkit-text-fill-color', '#3A423B', 'important')
          element.style.setProperty('background-image', 'none', 'important')
          element.style.setProperty('transition', 'none', 'important')
          element.style.setProperty('-webkit-animation', 'none', 'important')
          element.style.setProperty('animation', 'none', 'important')
        })
      }

      // Apply immediately
      forceStyle()

      // Apply on ALL events
      const inputs = document.querySelectorAll('input, select, textarea')
      inputs.forEach((input) => {
        const element = input as HTMLElement
        element.addEventListener('focus', forceStyle)
        element.addEventListener('blur', forceStyle)
        element.addEventListener('input', forceStyle)
        element.addEventListener('change', forceStyle)
        element.addEventListener('keydown', forceStyle)
        element.addEventListener('keyup', forceStyle)
        element.addEventListener('touchstart', forceStyle)
        element.addEventListener('touchend', forceStyle)
        element.addEventListener('click', forceStyle)
      })

      // Apply every 50ms to completely override Safari
      const interval = setInterval(forceStyle, 50)

      // Also use MutationObserver to catch dynamically added inputs
      const observer = new MutationObserver(() => {
        forceStyle()
      })
      observer.observe(document.body, { childList: true, subtree: true })

      // Cleanup
      return () => {
        clearInterval(interval)
        observer.disconnect()
      }
    }
  }, [])

  return null
}
