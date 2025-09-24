// Application constants
export const APP_CONFIG = {
  name: 'Amino Rejuvenation',
  description: 'Premium research peptides for scientific applications',
  url: 'https://aminorejuvenation.com',
  email: 'aminorejuvenation@gmail.com',
  phone: '+1-XXX-XXX-XXXX',
} as const

// Cart configuration
export const CART_CONFIG = {
  maxItems: 50,
  debounceDelay: 100,
  popupTimeout: 3000,
} as const

// Form validation
export const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  minPasswordLength: 8,
  maxTextLength: 1000,
} as const

// API endpoints
export const API_ENDPOINTS = {
  sendOrder: '/api/send-order',
  webhook: process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL,
} as const

// Product configuration
export const PRODUCT_CONFIG = {
  maxQuantity: 10,
  minPrice: 0.01,
  maxPrice: 10000,
  defaultImage: '/placeholder.svg',
} as const

// UI configuration
export const UI_CONFIG = {
  animationDuration: 200,
  debounceDelay: 300,
  maxSearchResults: 50,
} as const

// Storage keys
export const STORAGE_KEYS = {
  userReviews: 'userReviews',
  cartItems: 'cartItems',
  userPreferences: 'userPreferences',
} as const

// Error messages
export const ERROR_MESSAGES = {
  invalidEmail: 'Please enter a valid email address',
  invalidPhone: 'Please enter a valid phone number',
  requiredField: 'This field is required',
  minLength: 'Must be at least {min} characters',
  maxLength: 'Must be no more than {max} characters',
  invalidQuantity: 'Quantity must be between 1 and 10',
  networkError: 'Network error. Please try again.',
  serverError: 'Server error. Please try again later.',
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  itemAdded: 'Item added to cart',
  orderPlaced: 'Order placed successfully',
  reviewSubmitted: 'Review submitted successfully',
  emailSent: 'Email sent successfully',
} as const
