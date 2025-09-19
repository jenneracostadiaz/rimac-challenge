import { type ChangeEvent, useState } from 'react'

interface FormData {
  documentType: string
  documentNumber: string
  cellphone: string
  privacyPolicy: boolean
  commercialPolicy: boolean
}

const initialFormData: FormData = {
  documentType: 'DNI',
  documentNumber: '',
  cellphone: '',
  privacyPolicy: true,
  commercialPolicy: true,
}

export const useForm = (initialData: FormData = initialFormData) => {
  const [formData, setFormData] = useState<FormData>(initialData)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const resetForm = () => {
    setFormData(initialData)
  }

  return {
    formData,
    handleInputChange,
    resetForm,
    setFormData,
  }
}
