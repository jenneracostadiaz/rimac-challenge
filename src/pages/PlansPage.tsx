import './PlansPage.scss'
import { ArrowLeft } from '../ui/icons/arrow-left.tsx'

export default function PlansPage() {
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
        <ArrowLeft />
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
          <label className="plans-option" tabIndex={0} aria-checked="false" role="radio">
            <div className="plans-option__icon">
              <img src="#" alt="" />
            </div>
            <div className="plans-option__info">
              <span className="plans-option__title">Para mí</span>
              <span className="plans-option__desc">
                Cotiza tu seguro de salud y agrega familiares si así lo deseas.
              </span>
            </div>
            <span className="plans-option__check"></span>
          </label>
          <label className="plans-option" tabIndex={0} aria-checked="false" role="radio">
            <div className="plans-option__icon">
              <img src="#" alt="" />
            </div>
            <div className="plans-option__info">
              <span className="plans-option__title">Para alguien más</span>
              <span className="plans-option__desc">
                Realiza una cotización para uno de tus familiares o cualquier persona.
              </span>
            </div>
            <span className="plans-option__check"></span>
          </label>
        </div>
      </section>
      <section className="plans-list" aria-label="Planes disponibles">
        <div className="plans-list__grid">
          <article className="plan-card" tabIndex={0} aria-label="Plan en Casa">
            <div className="plan-card__icon">
              <img src="#" alt="" />
            </div>
            <h2 className="plan-card__title">Plan en Casa</h2>
            <div className="plan-card__price">
              <span className="plan-card__price-label">Costo del plan</span>
              <span className="plan-card__price-value">$39 al mes</span>
            </div>
            <ul className="plan-card__features">
              <li>Médico general a domicilio por S/20 y medicinas cubiertas al 100%.</li>
              <li>
                Videoconsulta y orientación telefónica al 100% en medicina general + pediatría.
              </li>
              <li>Indemnización de S/300 en caso de hospitalización por más de un día.</li>
            </ul>
            <button className="plan-card__select">Seleccionar Plan</button>
          </article>
          <article
            className="plan-card plan-card--recommended"
            tabIndex={0}
            aria-label="Plan en Casa y Clínica"
          >
            <div className="plan-card__recommended">Plan recomendado</div>
            <div className="plan-card__icon">
              <img src="#" alt="" />
            </div>
            <h2 className="plan-card__title">Plan en Casa y Clínica</h2>
            <div className="plan-card__price">
              <span className="plan-card__price-label">Costo del plan</span>
              <span className="plan-card__price-value">$99 al mes</span>
            </div>
            <ul className="plan-card__features">
              <li>Consultas en clínica para cualquier especialidad.</li>
              <li>Medicinas y exámenes derivados cubiertos al 80%.</li>
              <li>Atención médica en más de 200 clínicas del país.</li>
            </ul>
            <button className="plan-card__select">Seleccionar Plan</button>
          </article>
          <article className="plan-card" tabIndex={0} aria-label="Plan en Casa + Chequeo">
            <div className="plan-card__icon">
              <img src="#" alt="" />
            </div>
            <h2 className="plan-card__title">Plan en Casa + Chequeo</h2>
            <div className="plan-card__price">
              <span className="plan-card__price-label">Costo del plan</span>
              <span className="plan-card__price-value">$49 al mes</span>
            </div>
            <ul className="plan-card__features">
              <li>Un Chequeo preventivo general de manera presencial o virtual.</li>
              <li>Acceso a Vacunas en el Programa del MINSA en centros privados.</li>
              <li>Incluye todos los beneficios del Plan en Casa.</li>
            </ul>
            <button className="plan-card__select">Seleccionar Plan</button>
          </article>
        </div>
      </section>
    </main>
  )
}
