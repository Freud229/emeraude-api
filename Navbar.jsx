import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Eye } from 'lucide-react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Accueil', to: '/' },
  { label: 'Catalogue', to: '/catalogue' },
  { label: 'À propos', to: '/apropos' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const isHome = location.pathname === '/'

  return (
    <header className={`navbar ${scrolled || !isHome ? 'navbar--solid' : 'navbar--glass'} ${menuOpen ? 'navbar--open' : ''}`}>
      <div className="navbar__inner container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-icon">
            <Eye size={22} strokeWidth={2} />
          </div>
          <div className="navbar__logo-text">
            <span className="navbar__logo-main">Éméraude</span>
            <span className="navbar__logo-sub">OPTIQUE</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__nav">
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar__link ${location.pathname === link.to ? 'navbar__link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="navbar__actions">
          <button
            className="navbar__cta"
            onClick={() => navigate('/contact')}
          >
            Prendre RDV
          </button>
          <button
            className="navbar__burger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        {NAV_LINKS.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`navbar__mobile-link ${location.pathname === link.to ? 'navbar__mobile-link--active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
        <button className="navbar__cta navbar__cta--mobile" onClick={() => navigate('/contact')}>
          Prendre RDV
        </button>
      </div>
    </header>
  )
}