import { Steps } from '../components/Steps.tsx'
import { Back } from '../components/Back.tsx'

export default function SummaryPage() {
  return (
    <div className="summary-page">
      <Steps currentStep={2} />

      <Back href="/plans" />

      <h1 className="summary-page__title">Resumen</h1>
      <p className="summary-page__text">
        Esta es la página de resumen. Aquí se mostrará un resumen de la información relevante.
      </p>
    </div>
  )
}
