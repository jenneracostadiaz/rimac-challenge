import { ArrowLeft } from '../ui/icons/arrow-left.tsx'
import './Back.scss'

interface PlansBackProps {
  href: string
  label?: string
  className?: string
}

export function Back({ href, label = 'Volver', className = '' }: PlansBackProps) {
  return (
    <div className={`back desktop ${className}`.trim()}>
      <a href={href} className="back__btn" aria-label={label}>
        <ArrowLeft />
        {label}
      </a>
    </div>
  )
}
