import { useState } from 'react'

interface FormData {
  documentType: string
  documentNumber: string
  cellphone: string
  privacyPolicy: boolean
  commercialPolicy: boolean
}

export const useFormValidation = () => {
  const [error, setError] = useState<string | null>(null)

  const validateForm = (formData: FormData): boolean => {
    const errors: string[] = []

    // Required field validations
    if (!formData.documentNumber.trim()) {
      errors.push('El número de documento es obligatorio.')
    }
    if (!formData.cellphone.trim()) {
      errors.push('El número de celular es obligatorio.')
    }

    // Document type specific validations
    if (formData.documentType === 'DNI' && !/^\d{8}$/.test(formData.documentNumber)) {
      errors.push('El número de DNI debe tener 8 dígitos.')
    }
    if (formData.documentType === 'CE' && !/^[A-Za-z0-9]{9}$/.test(formData.documentNumber)) {
      errors.push('El número de CE debe tener 9 caracteres alfanuméricos.')
    }
    if (formData.documentType === 'RUC' && !/^\d{11}$/.test(formData.documentNumber)) {
      errors.push('El número de RUC debe tener 11 dígitos.')
    }

    // Cellphone validation
    if (!/^\d{9}$/.test(formData.cellphone)) {
      errors.push('El número de celular debe tener 9 dígitos.')
    }

    // Policy validations
    if (!formData.privacyPolicy) {
      errors.push('Debe aceptar la Política de Privacidad.')
    }
    if (!formData.commercialPolicy) {
      errors.push('Debe aceptar la Política de Comunicaciones Comerciales.')
    }

    if (errors.length > 0) {
      setError(errors.join(' '))
      return false
    }

    setError(null)
    return true
  }

  const clearError = () => {
    setError(null)
  }

  return {
    error,
    validateForm,
    clearError,
  }
}
