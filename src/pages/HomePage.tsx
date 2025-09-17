import { type ChangeEvent, type FormEvent, useState } from 'react'
import './HomePage.scss'

function HomePage() {
  const [formData, setFormData] = useState({
    documentType: 'DNI',
    documentNumber: '',
    cellphone: '',
    privacyPolicy: false,
    commercialPolicy: false,
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <main className="landing" role="main">
      <div className="landing__container">
        <section className="landing__hero_mobile" aria-labelledby="hero-mobile-title">
          <div className="landing__content_mobile">
            <div className="landing__badge">
              <span className="landing__badge-text">Seguro Salud Flexible</span>
            </div>

            <h1 id="hero-mobile-title" className="landing__title_mobile">
              Creado para ti y tu familia
            </h1>
          </div>
          <div className="landing__hero_mobile__image">
            <img
              src="/family-hero.png"
              alt="Familia feliz: madre, padre e hijo sonriendo juntos en casa, representando la protección familiar que ofrece el seguro de salud"
              className="landing__hero_mobile__image-img_mobile"
              width="886"
              height="590"
              loading="eager"
            />
          </div>
        </section>
        <section className="landing__hero" aria-labelledby="hero-title">
          <div className="landing__content">
            <div className="landing__badge">
              <span className="landing__badge-text">Seguro Salud Flexible</span>
            </div>

            <h1 id="hero-title" className="landing__title">
              Creado para ti y tu familia
            </h1>

            <p className="landing__description">
              Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100%
              online.
            </p>

            <form className="landing__form" onSubmit={handleSubmit} noValidate>
              <div className="landing__form-row">
                <div className="landing__form-group">
                  <label htmlFor="documentType" className="visually-hidden">
                    Tipo de documento
                  </label>
                  <select
                    id="documentType"
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleInputChange}
                    className="landing__select"
                    aria-describedby="documentType-desc"
                  >
                    <option value="DNI">DNI</option>
                    <option value="CE">CE</option>
                    <option value="RUC">RUC</option>
                  </select>
                </div>

                <div className="landing__form-group landing__form-group--flex">
                  <label htmlFor="documentNumber" className="visually-hidden">
                    Número de documento
                  </label>
                  <input
                    type="text"
                    id="documentNumber"
                    name="documentNumber"
                    placeholder="Nro. de documento"
                    value={formData.documentNumber}
                    onChange={handleInputChange}
                    className="landing__input"
                    required
                    aria-describedby="documentNumber-desc"
                    maxLength={8}
                  />
                  <span id="documentNumber-desc" className="visually-hidden">
                    Ingrese su número de documento de identidad
                  </span>
                </div>
              </div>

              <div className="landing__form-group">
                <label htmlFor="cellphone" className="visually-hidden">
                  Número de celular
                </label>
                <input
                  type="tel"
                  id="cellphone"
                  name="cellphone"
                  placeholder="Celular"
                  value={formData.cellphone}
                  onChange={handleInputChange}
                  className="landing__input"
                  required
                  aria-describedby="cellphone-desc"
                />
                <span id="cellphone-desc" className="visually-hidden">
                  Ingrese su número de celular
                </span>
              </div>

              <div className="landing__form-policies">
                <div className="landing__checkbox-group">
                  <input
                    type="checkbox"
                    id="privacyPolicy"
                    name="privacyPolicy"
                    checked={formData.privacyPolicy}
                    onChange={handleInputChange}
                    className="landing__checkbox"
                    required
                  />
                  <label htmlFor="privacyPolicy" className="landing__checkbox-label">
                    Acepto la Política de Privacidad
                  </label>
                </div>

                <div className="landing__checkbox-group">
                  <input
                    type="checkbox"
                    id="commercialPolicy"
                    name="commercialPolicy"
                    checked={formData.commercialPolicy}
                    onChange={handleInputChange}
                    className="landing__checkbox"
                    required
                  />
                  <label htmlFor="commercialPolicy" className="landing__checkbox-label">
                    Acepto la Política Comunicaciones Comerciales
                  </label>
                </div>

                <p className="landing__terms">
                  Aplican{' '}
                  <a href="/terminos" className="landing__link">
                    Términos y Condiciones
                  </a>
                  .
                </p>
              </div>

              <button
                type="submit"
                className="landing__submit-btn"
                disabled={!formData.privacyPolicy || !formData.commercialPolicy}
                aria-describedby="submit-desc"
              >
                Cotiza aquí
              </button>
              <span id="submit-desc" className="visually-hidden">
                Enviar formulario para obtener cotización
              </span>
            </form>
          </div>

          <div className="landing__image">
            <img
              src="/family-hero.png"
              alt="Familia feliz: madre, padre e hijo sonriendo juntos en casa, representando la protección familiar que ofrece el seguro de salud"
              className="landing__hero-img"
              width="886"
              height="590"
              loading="eager"
            />
          </div>
        </section>
      </div>
    </main>
  )
}

export default HomePage
