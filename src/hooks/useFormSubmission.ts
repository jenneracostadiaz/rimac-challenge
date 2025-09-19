interface FormData {
  documentType: string
  documentNumber: string
  cellphone: string
  privacyPolicy: boolean
  commercialPolicy: boolean
}

export const useFormSubmission = () => {
  const submitForm = (formData: FormData) => {
    // Save form data to localStorage
    localStorage.setItem(
      'userFormData',
      JSON.stringify({
        documentType: formData.documentType,
        documentNumber: formData.documentNumber,
        cellphone: formData.cellphone,
      })
    )

    // Redirect to plans page
    window.location.assign('/plans')
  }

  return {
    submitForm,
  }
}
