import { ArrowLeft } from '../ui/icons/arrow-left.tsx'
import './Steps.scss'

interface PlansStepsProps {
  currentStep: number // 1 or 2
  className?: string
}

export function Steps({ currentStep, className = '' }: PlansStepsProps) {
  return (
    <nav className={`steps desktop ${className}`.trim()} aria-label="Progreso de cotización">
      <ol className="steps__list">
        <li
          className={`steps__item${currentStep === 1 ? ' steps__item--active' : ''}`}
          aria-current={currentStep === 1 ? 'step' : undefined}
        >
          <span
            className={currentStep === 1 ? 'steps__item--active__circle' : 'steps__item__circle'}
          >
            1
          </span>
          <span>Planes y coberturas</span>
        </li>
        <li>
          <span className="steps__item__dashed"></span>
        </li>
        <li
          className={`steps__item${currentStep === 2 ? ' steps__item--active' : ''}`}
          aria-current={currentStep === 2 ? 'step' : undefined}
        >
          <span
            className={currentStep === 2 ? 'steps__item--active__circle' : 'steps__item__circle'}
          >
            2
          </span>
          <span>Resumen</span>
        </li>
      </ol>
    </nav>
  )
}

export function StepsMobile({ currentStep, className = '' }: PlansStepsProps) {
  return (
    <nav className={`steps mobile ${className}`.trim()} aria-label="Progreso de cotización">
      <a href="/">
        <ArrowLeft />
      </a>
      <span className="steps__step mobile" aria-label={`Paso ${currentStep} de 2`}>
        Paso {currentStep} de 2
      </span>
      <span className="steps__progress-bar mobile" aria-hidden="true"></span>
    </nav>
  )
}
