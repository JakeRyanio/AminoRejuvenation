import { useState, useCallback } from 'react'
import { validateEmail, validatePhone } from '@/lib/utils'
import { VALIDATION, ERROR_MESSAGES } from '@/lib/constants'

interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => boolean
  message?: string
}

interface ValidationRules {
  [key: string]: ValidationRule
}

interface FormErrors {
  [key: string]: string
}

export function useFormValidation(rules: ValidationRules) {
  const [errors, setErrors] = useState<FormErrors>({})

  const validateField = useCallback((name: string, value: string): string => {
    const rule = rules[name]
    if (!rule) return ''

    // Required validation
    if (rule.required && (!value || value.trim() === '')) {
      return rule.message || ERROR_MESSAGES.requiredField
    }

    // Skip other validations if field is empty and not required
    if (!value || value.trim() === '') return ''

    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      return rule.message || ERROR_MESSAGES.minLength.replace('{min}', rule.minLength.toString())
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return rule.message || ERROR_MESSAGES.maxLength.replace('{max}', rule.maxLength.toString())
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message || 'Invalid format'
    }

    // Custom validation
    if (rule.custom && !rule.custom(value)) {
      return rule.message || 'Invalid value'
    }

    return ''
  }, [rules])

  const validateForm = useCallback((data: Record<string, string>): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    Object.keys(rules).forEach(field => {
      const error = validateField(field, data[field] || '')
      if (error) {
        newErrors[field] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [rules, validateField])

  const validateSingleField = useCallback((name: string, value: string) => {
    const error = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
    return !error
  }, [validateField])

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  const clearFieldError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  return {
    errors,
    validateForm,
    validateSingleField,
    clearErrors,
    clearFieldError,
  }
}

// Common validation rules
export const commonValidationRules: ValidationRules = {
  email: {
    required: true,
    pattern: VALIDATION.email,
    message: ERROR_MESSAGES.invalidEmail,
  },
  phone: {
    required: true,
    pattern: VALIDATION.phone,
    message: ERROR_MESSAGES.invalidPhone,
  },
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  address: {
    required: true,
    minLength: 5,
    maxLength: 100,
  },
  city: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  state: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  zipCode: {
    required: true,
    pattern: /^\d{5}(-\d{4})?$/,
    message: 'Please enter a valid ZIP code',
  },
  country: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
}
