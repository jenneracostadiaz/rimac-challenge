import './PlansPage.scss'
import { IcProtectionLight } from '../ui/icons/IcProtectionLight.tsx'
import { IcAddUserLight } from '../ui/icons/IcAddUserLight.tsx'
import { IcHomeLight } from '../ui/icons/IcHomeLight.tsx'
import { IcHospitalLight } from '../ui/icons/IcHospitalLight.tsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Steps, StepsMobile } from '../components/Steps.tsx'
import { Back } from '../components/Back.tsx'
import { useUser } from '../hooks/useUser.ts'
import { usePlans } from '../hooks/usePlans.ts'
import { usePlanSelection } from '../hooks/usePlanSelection.ts'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import 'swiper/css'

export default function PlansPage() {
  const { user, userLoading, userError } = useUser()
  const { plans, loading, error } = usePlans()
  const { selectedOption, setSelectedOption, getPlanPrice, handleSelectPlan, getFilteredPlans } =
    usePlanSelection(user)

  const shouldShowPlans = selectedOption && user && !userLoading && !userError
  const filteredPlans = getFilteredPlans(plans)
  const hasAnyError = error || userError

  return (
    <main className="plans-main" aria-labelledby="plans-title">
      <Steps currentStep={1} />
      <Back href="/" />
      <StepsMobile currentStep={1} />
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
        {hasAnyError && <div className="plans-list__error">{error || userError}</div>}
        <div className="plans-list__swiper">
          {shouldShowPlans && !loading && !hasAnyError && (
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
                    <div className="plan-card__header">
                      <h2 className="plan-card__title">{plan.name}</h2>
                      <div className="plan-card__icon">
                        {plan.name === 'Plan en Casa y Clínica' ? (
                          <IcHospitalLight />
                        ) : (
                          <IcHomeLight />
                        )}
                      </div>
                    </div>
                    <div className="plan-card__price">
                      <span className="plan-card__price-label">Costo del plan</span>
                      {selectedOption === 'forSomeoneElse' && (
                        <span className="plan-card__price-discount">
                          <s>${plan.price.toFixed(2)} antes</s>
                        </span>
                      )}
                      <span className="plan-card__price-value">${getPlanPrice(plan)} al mes</span>
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
