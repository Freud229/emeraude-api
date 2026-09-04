import React from 'react'
import { Link } from 'react-router-dom'
import { Eye, Phone, MapPin, Mail, MessageCircle } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__top container">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo">
            <div className="footer__logo-icon"><Eye size={20} /></div>
            <div>
              <div className="footer__logo-main">Éméraude Optique</div>
              <div className="footer__logo-sub">Voir le monde autrement</div>
            </div>
          </div>
          <p className="footer__tagline">
            Votre opticien de confiance au Bénin depuis plus de 10 ans. 
            Qualité, expertise et service personnalisé dans 3 boutiques.
          </p>
          <a
            href="https://wa.me/2290161985354"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__whatsapp"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </div>

        {/* Navigation */}
        <div className="footer__col">
          <h4 className="footer__heading">Navigation</h4>
          <ul className="footer__links">
            {[
              { to: '/', label: 'Accueil' },
              { to: '/catalogue', label: 'Catalogue' },
              { to: '/apropos', label: 'À propos' },
              { to: '/contact', label: 'Contact' },
              { to: '/admin', label: 'Espace Admin' },
            ].map(l => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Boutiques */}
        <div className="footer__col">
          <h4 className="footer__heading">Nos boutiques</h4>
          <ul className="footer__locations">
            {[
              { ville: 'Cotonou', q: 'Sainte Rita' },
              { ville: 'Porto-Novo', q: 'Avakpa' },
              { ville: 'Parakou', q: 'Wanssirou' },
            ].map(b => (
              <li key={b.ville}>
                <MapPin size={14} />
                <span><strong>{b.ville}</strong> — {b.q}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h4 className="footer__heading">Contact</h4>
          <ul className="footer__contact-list">
            <li>
              <Phone size={14} />
              <a href="tel:+2290161985354">+229 01 61 98 53 54</a>
            </li>
            <li>
              <Mail size={14} />
              <a href="mailto:emeraudeoptiqueas@gmail.com">emeraudeoptiqueas@gmail.com</a>
            </li>
          </ul>
          <p className="footer__hours">Lun – Ven : 8h00 – 19h00 | Sam : 9h00 - 13h</p>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>© {year} Éméraude Optique — Tous droits réservés</p>
        <p className="footer__credit">Conçu par <i>Freud HOUINATO Tel: 0168014145</i></p>
      </div>
    </footer>
  )
}