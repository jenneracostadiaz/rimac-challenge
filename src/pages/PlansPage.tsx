import './PlansPage.scss'
import { ArrowLeft } from '../ui/icons/arrow-left.tsx'
import { IcProtectionLight } from '../ui/icons/IcProtectionLight.tsx'
import { IcAddUserLight } from '../ui/icons/IcAddUserLight.tsx'
import { useState, useEffect } from 'react'

interface Plan {
  name: string
  price: number
  description: string[]
}

export default function PlansPage() {
  const [selectedOption, setSelectedOption] = useState('forMe')
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleOptionChange = (option: string) => {
    setSelectedOption(option)
  }

  useEffect(() => {
    setLoading(true)
    fetch('https://rimac-front-end-challenge.netlify.app/api/plans.json')
      .then((res) => {
        if (!res.ok) throw new Error('Error fetching plans')
        return res.json()
      })
      .then((data) => {
        setPlans(data.list)
        setError(null)
      })
      .catch(() => {
        setError('No se pudieron cargar los planes. Intenta nuevamente.')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="plans-main" aria-labelledby="plans-title">
      <nav className="plans-steps desktop" aria-label="Progreso de cotización">
        <ol className="plans-steps__list">
          <li className="plans-steps__item plans-steps__item--active" aria-current="step">
            <span className="plans-steps__item--active__circle">1</span>
            <span>Planes y coberturas</span>
          </li>
          <li className="plans-steps__item">
            <span className="plans-steps__item__circle">2</span>
            <span>Resumen</span>
          </li>
        </ol>
      </nav>
      <div className="plans-back desktop">
        <a href="/" className="plans-back__btn" aria-label="Volver">
          <ArrowLeft />
          Volver
        </a>
      </div>
      <nav className="plans-steps mobile" aria-label="Progreso de cotización">
        <a href="/">
          <ArrowLeft />
        </a>
        <span className="plans-steps__step mobile" aria-label="Paso 1 de 2">
          Paso 1 de 2
        </span>
        <span className="plans-steps__progress-bar mobile" aria-hidden="true"></span>
      </nav>
      <section className="plans-header" aria-labelledby="plans-title">
        <h1 id="plans-title" className="plans-header__title">
          Rocío <span className="plans-title__question">¿Para quién deseas cotizar?</span>
        </h1>
        <p className="plans-header__subtitle">
          Selecciona la opción que se ajuste más a tus necesidades.
        </p>
        <div className="plans-options" role="radiogroup" aria-label="Opciones de cotización">
          <label
            className="plans-option"
            tabIndex={0}
            aria-checked={selectedOption === 'forMe'}
            role="radio"
            onClick={() => handleOptionChange('forMe')}
          >
            <span className="plans-option__check"></span>
            <div className="plans-option__info">
              <div className="plans-option__icon">
                <IcProtectionLight />
              </div>
              <h3 className="plans-option__title">Para mí</h3>
            </div>
            <p className="plans-option__desc">
              Cotiza tu seguro de salud y agrega familiares si así lo deseas.
            </p>
          </label>
          <label
            className="plans-option"
            tabIndex={0}
            aria-checked={selectedOption === 'forSomeoneElse'}
            role="radio"
            onClick={() => handleOptionChange('forSomeoneElse')}
          >
            <span className="plans-option__check"></span>
            <div className="plans-option__info">
              <div className="plans-option__icon">
                <IcAddUserLight />
              </div>
              <h3 className="plans-option__title">Para alguien más</h3>
            </div>
            <p className="plans-option__desc">
              Realiza una cotización para uno de tus familiares o cualquier persona.
            </p>
          </label>
        </div>
      </section>
      <section className="plans-list" aria-label="Planes disponibles">
        {loading && <div className="plans-list__loading">Cargando planes...</div>}
        {error && <div className="plans-list__error">{error}</div>}
        <div className="plans-list__grid">
          {!loading &&
            !error &&
            plans.map((plan, idx) => (
              <article
                key={plan.name}
                className={`plan-card${idx === 1 ? ' plan-card--recommended' : ''}`}
                tabIndex={0}
                aria-label={plan.name}
              >
                {idx === 2 && <div className="plan-card__recommended">Plan recomendado</div>}
                <div className="plan-card__icon">
                  <img src="#" alt="" />
                </div>
                <h2 className="plan-card__title">{plan.name}</h2>
                <div className="plan-card__price">
                  <span className="plan-card__price-label">Costo del plan</span>
                  <span className="plan-card__price-value">${plan.price} al mes</span>
                </div>
                <ul className="plan-card__features">
                  {plan.description.map((desc: string, i: number) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
                <button className="plan-card__select">Seleccionar Plan</button>
              </article>
            ))}
        </div>
      </section>
    </main>
  )
}
