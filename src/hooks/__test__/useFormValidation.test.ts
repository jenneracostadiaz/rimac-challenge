import { renderHook, act } from '@testing-library/react'
import { useFormValidation } from '../useFormValidation'

describe('useFormValidation', () => {
  const baseFormData = {
    documentType: 'DNI',
    documentNumber: '12345678',
    cellphone: '987654321',
    privacyPolicy: true,
    commercialPolicy: true,
  }

  it('validates DNI: exactly 8 digits', () => {
    const { result } = renderHook(() => useFormValidation())
    const formData = { ...baseFormData, documentType: 'DNI', documentNumber: '1234567' }
    act(() => {
      expect(result.current.validateForm(formData)).toBe(false)
    })
    expect(result.current.error).toContain('DNI')
  })

  it('validates CE: exactly 9 alphanumeric characters', () => {
    const { result } = renderHook(() => useFormValidation())
    const formData = { ...baseFormData, documentType: 'CE', documentNumber: 'abc12345' }
    act(() => {
      expect(result.current.validateForm(formData)).toBe(false)
    })
    expect(result.current.error).toContain('CE')
  })

  it('validates RUC: exactly 11 digits', () => {
    const { result } = renderHook(() => useFormValidation())
    const formData = { ...baseFormData, documentType: 'RUC', documentNumber: '1234567890' }
    act(() => {
      expect(result.current.validateForm(formData)).toBe(false)
    })
    expect(result.current.error).toContain('RUC')
  })

  it('validates required: document number is required', () => {
    const { result } = renderHook(() => useFormValidation())
    const formData = { ...baseFormData, documentNumber: '' }
    act(() => {
      expect(result.current.validateForm(formData)).toBe(false)
    })
    expect(result.current.error).toContain('documento')
  })

  it('validates required: cellphone number is required', () => {
    const { result } = renderHook(() => useFormValidation())
    const formData = { ...baseFormData, cellphone: '' }
    act(() => {
      expect(result.current.validateForm(formData)).toBe(false)
    })
    expect(result.current.error).toContain('celular')
  })

  it('validates cellphone: must be exactly 9 digits', () => {
    const { result } = renderHook(() => useFormValidation())
    const formData = { ...baseFormData, cellphone: '12345678' }
    act(() => {
      expect(result.current.validateForm(formData)).toBe(false)
    })
    expect(result.current.error).toContain('celular')
  })

  it('validates privacy policy must be accepted', () => {
    const { result } = renderHook(() => useFormValidation())
    const formData = { ...baseFormData, privacyPolicy: false }
    act(() => {
      expect(result.current.validateForm(formData)).toBe(false)
    })
    expect(result.current.error).toContain('Privacidad')
  })

  it('validates commercial policy must be accepted', () => {
    const { result } = renderHook(() => useFormValidation())
    const formData = { ...baseFormData, commercialPolicy: false }
    act(() => {
      expect(result.current.validateForm(formData)).toBe(false)
    })
    expect(result.current.error).toContain('Comunicaciones')
  })

  it('returns true for valid DNI data', () => {
    const { result } = renderHook(() => useFormValidation())
    act(() => {
      expect(result.current.validateForm(baseFormData)).toBe(true)
    })
    expect(result.current.error).toBeNull()
  })

  it('returns true for valid CE data', () => {
    const { result } = renderHook(() => useFormValidation())
    const formData = { ...baseFormData, documentType: 'CE', documentNumber: 'abc123456' }
    act(() => {
      expect(result.current.validateForm(formData)).toBe(true)
    })
    expect(result.current.error).toBeNull()
  })

  it('returns true for valid RUC data', () => {
    const { result } = renderHook(() => useFormValidation())
    const formData = { ...baseFormData, documentType: 'RUC', documentNumber: '12345678901' }
    act(() => {
      expect(result.current.validateForm(formData)).toBe(true)
    })
    expect(result.current.error).toBeNull()
  })

  it('displays multiple errors together', () => {
    const { result } = renderHook(() => useFormValidation())
    const formData = {
      documentType: 'DNI',
      documentNumber: '',
      cellphone: '',
      privacyPolicy: false,
      commercialPolicy: false,
    }
    act(() => {
      expect(result.current.validateForm(formData)).toBe(false)
    })
    expect(result.current.error).toContain('documento')
    expect(result.current.error).toContain('celular')
    expect(result.current.error).toContain('Privacidad')
    expect(result.current.error).toContain('Comunicaciones')
  })

  it('clears error with clearError', () => {
    const { result } = renderHook(() => useFormValidation())
    const formData = { ...baseFormData, documentNumber: '' }
    act(() => {
      result.current.validateForm(formData)
    })
    expect(result.current.error).not.toBeNull()
    act(() => {
      result.current.clearError()
    })
    expect(result.current.error).toBeNull()
  })
})
