import './PlansPage.scss'
import { ArrowLeft } from '../ui/icons/arrow-left.tsx'
import { IcProtectionLight } from '../ui/icons/IcProtectionLight.tsx'
import { IcAddUserLight } from '../ui/icons/IcAddUserLight.tsx'
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import 'swiper/css'
import { useNavigate } from 'react-router-dom'

interface Plan {
  name: string
  price: number
  description: string[]
  age: number
}

interface User {
  name: string
  lastName: string
  birthDay: string
}

export default function PlansPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [userLoading, setUserLoading] = useState(true)
  const [userError, setUserError] = useState<string | null>(null)
  const navigate = useNavigate()

  const getAge = (birthDay: string) => {
    const [day, month, year] = birthDay.split('-').map(Number)
    const today = new Date()
    let age = today.getFullYear() - year
    if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) {
      age--
    }
    return age
  }

  useEffect(() => {
    setUserLoading(true)
    fetch('https://rimac-front-end-challenge.netlify.app/api/user.json')
      .then((res) => {
        if (!res.ok) throw new Error('Error fetching user')
        return res.json()
      })
      .then((data) => {
        setUser(data)
        setUserError(null)
      })
      .catch(() => {
        setUserError('No se pudieron cargar los datos del usuario.')
      })
      .finally(() => setUserLoading(false))
  }, [])

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

  const shouldShowPlans = selectedOption && user && !userLoading && !userError

  const userAge = user ? getAge(user.birthDay) : null
  const filteredPlans = userAge !== null ? plans.filter((plan) => userAge <= plan.age) : []

  const getPlanPrice = (plan: Plan) => {
    if (selectedOption === 'forSomeoneElse') {
      return (plan.price * 0.95).toFixed(2)
    }
    return plan.price.toFixed(2)
  }

  const handleSelectPlan = (plan: Plan) => {
    const selectedPlan = {
      ...plan,
      finalPrice: getPlanPrice(plan),
      selectedOption,
      userName: user?.name,
      userLastName: user?.lastName,
      userAge,
    }
    localStorage.setItem('selectedPlan', JSON.stringify(selectedPlan))
    navigate('/summary')
  }

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
          {user ? user.name : '...'}{' '}
          <span className="plans-title__question">¿Para quién deseas cotizar?</span>
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
            onClick={() => setSelectedOption('forMe')}
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
            onClick={() => setSelectedOption('forSomeoneElse')}
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
        {(loading || userLoading) && <div className="plans-list__loading">Cargando planes...</div>}
        {(error || userError) && <div className="plans-list__error">{error || userError}</div>}
        <div className="plans-list__swiper">
          {shouldShowPlans && !loading && !error && !userLoading && !userError && (
            <Swiper
              spaceBetween={16}
              slidesPerView={1.1}
              breakpoints={{
                768: { slidesPerView: 3.12, spaceBetween: 32 },
              }}
              aria-label="Planes disponibles"
            >
              {filteredPlans.map((plan, idx) => (
                <SwiperSlide key={plan.name}>
                  <article
                    className={`plan-card${idx === 1 ? ' plan-card--recommended' : ''}`}
                    tabIndex={0}
                    aria-label={plan.name}
                  >
                    {idx === 1 && <div className="plan-card__recommended">Plan recomendado</div>}
                    <div className="plan-card__icon">
                      <img src="#" alt="" />
                    </div>
                    <h2 className="plan-card__title">{plan.name}</h2>
                    <div className="plan-card__price">
                      <span className="plan-card__price-label">Costo del plan</span>
                      <span className="plan-card__price-value">${getPlanPrice(plan)} al mes</span>
                      {selectedOption === 'forSomeoneElse' && (
                        <span className="plan-card__discount">(5% dscto.)</span>
                      )}
                    </div>
                    <ul className="plan-card__features">
                      {plan.description.map((desc: string, i: number) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                    <button className="plan-card__select" onClick={() => handleSelectPlan(plan)}>
                      Seleccionar Plan
                    </button>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
    </main>
  )
}
