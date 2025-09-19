import './SummaryPage.scss'
import { Steps } from '../components/Steps.tsx'
import { Back } from '../components/Back.tsx'
import { useEffect, useState } from 'react'
import { Gl_family } from '../ui/icons/gl_family.tsx'

interface SelectedPlan {
  name: string
  finalPrice: string
  selectedOption: string
  userName: string
  userLastName: string
  userAge: number
}

interface UserFormData {
  documentType: string
  documentNumber: string
  cellphone: string
}

export default function SummaryPage() {
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null)
  const [userFormData, setUserFormData] = useState<UserFormData | null>(null)

  useEffect(() => {
    const storedPlan = localStorage.getItem('selectedPlan')
    const storedFormData = localStorage.getItem('userFormData')
    if (storedPlan) {
      setSelectedPlan(JSON.parse(storedPlan))
    }
    if (storedFormData) {
      setUserFormData(JSON.parse(storedFormData))
    }
  }, [])

  if (!selectedPlan || !userFormData) {
    return (
      <div className="summary-page">
        <Steps currentStep={2} />
        <Back href="/plans" />
        <div className="summary-loading">Cargando resumen...</div>
      </div>
    )
  }

  return (
    <main className="summary-page">
      <Steps currentStep={2} />
      <Back href="/plans" />
      <div className="summary-content">
        <h1 className="summary-title">Resumen del seguro</h1>
        <div className="summary-card">
          <div className="summary-section">
            <p className="summary-section__label">PRECIOS CALCULADOS PARA:</p>
            <div className="summary-user">
              <div className="summary-user__icon">
                <Gl_family />
              </div>
              <span className="summary-user__name">
                {selectedPlan.userName} {selectedPlan.userLastName}
              </span>
            </div>
          </div>
          <div className="summary-details">
            <div className="summary-field">
              <p className="summary-field__label">Responsable de pago</p>
              <p className="summary-field__value">
                {userFormData.documentType}: {userFormData.documentNumber}
              </p>
              <p className="summary-field__value">Celular: {userFormData.cellphone}</p>
            </div>
            <div className="summary-field">
              <p className="summary-field__label">Plan elegido</p>
              <p className="summary-field__value">{selectedPlan.name}</p>
              <p className="summary-field__value">
                Costo del Plan: ${selectedPlan.finalPrice} al mes
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
