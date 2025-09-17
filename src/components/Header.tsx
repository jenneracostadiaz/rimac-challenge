import { Link } from 'react-router-dom'
import './Header.scss'

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">Rimac</div>
      <nav className="header__nav">
        <Link to="/" className="header__link">
          Inicio
        </Link>
        <Link to="/plans" className="header__link">
          Planes
        </Link>
        <Link to="/summary" className="header__link">
          Resumen
        </Link>
      </nav>
    </header>
  )
}
