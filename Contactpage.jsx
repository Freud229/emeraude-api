import React, { useState } from 'react'
import { Phone, Mail, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react'
import { BOUTIQUES } from '../data/mock'
import './ContactPage.css'

export default function ContactPage() {
  const [form, setForm] = useState({ nom: '', email: '', tel: '', boutique: '', sujet: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    // Ici : appel EmailJS ou API Laravel
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  return (
    <main className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero__bg" />
        <div className="container contact-hero__content">
          <p className="section-subtitle" style={{color:'var(--em-green-500)'}}>Nous écrire</p>
          <h1 className="section-title" style={{color:'white'}}>Contactez-nous</h1>
          <p style={{color:'rgba(255,255,255,0.75)', marginTop:'0.75rem', maxWidth:500}}>
            Une question, un rendez-vous, un conseil ? Nous sommes là pour vous aider.
          </p>
        </div>
      </section>

      <section className="contact-body container">
        {/* Infos */}
        <div className="contact-info">
          <h2 className="contact-info__title">Nos coordonnées</h2>

          <div className="contact-info__items">
            <div className="contact-info__item">
              <div className="contact-info__icon"><Phone size={20} /></div>
              <div>
                <p className="contact-info__label">Téléphone</p>
                <a href="tel:+2290161985354" className="contact-info__value">+229 01 61 98 53 54</a>
              </div>
            </div>
            <div className="contact-info__item">
              <div className="contact-info__icon"><Mail size={20} /></div>
              <div>
                <p className="contact-info__label">Email</p>
                <a href="mailto:emeraudeoptiqueas@gmail.com" className="contact-info__value">
                  emeraudeoptiqueas@gmail.com
                </a>
              </div>
            </div>
            <div className="contact-info__item">
              <div className="contact-info__icon"><Clock size={20} /></div>
              <div>
                <p className="contact-info__label">Horaires</p>
                <p className="contact-info__value">Lun – Sam : 8h00 – 19h00</p>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/2290161985354"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-whatsapp"
          >
            <MessageCircle size={20} />
            Écrire sur WhatsApp
          </a>

          <div className="contact-boutiques">
            <p className="contact-boutiques__title">Nos boutiques</p>
            {BOUTIQUES.map(b => (
              <div key={b.id} className="contact-boutique">
                <MapPin size={14} />
                <div>
                  <strong>{b.ville}</strong> — {b.quartier}
                  <span className="contact-boutique__adresse">{b.adresse}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulaire */}
        <div className="contact-form-wrap">
          {sent ? (
            <div className="contact-success">
              <CheckCircle size={52} className="contact-success__icon" />
              <h3>Message envoyé !</h3>
              <p>Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.</p>
              <button className="btn-primary" onClick={() => setSent(false)}>
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2 className="contact-form__title">Envoyer un message</h2>

              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="nom">Nom complet *</label>
                  <input
                    id="nom" name="nom" type="text" required
                    value={form.nom} onChange={handleChange}
                    placeholder="Votre nom et prénom"
                  />
                </div>
                <div className="contact-form__field">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email" name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="tel">Téléphone</label>
                  <input
                    id="tel" name="tel" type="tel"
                    value={form.tel} onChange={handleChange}
                    placeholder="+229 ..."
                  />
                </div>
                <div className="contact-form__field">
                  <label htmlFor="boutique">Boutique concernée</label>
                  <select id="boutique" name="boutique" value={form.boutique} onChange={handleChange}>
                    <option value="">Toutes les boutiques</option>
                    {BOUTIQUES.map(b => (
                      <option key={b.id} value={b.ville}>{b.ville} — {b.quartier}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="contact-form__field">
                <label htmlFor="sujet">Sujet *</label>
                <input
                  id="sujet" name="sujet" type="text" required
                  value={form.sujet} onChange={handleChange}
                  placeholder="Objet de votre message"
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message" name="message" required rows={5}
                  value={form.message} onChange={handleChange}
                  placeholder="Décrivez votre demande en détail..."
                />
              </div>

              <button type="submit" className="btn-primary contact-form__submit" disabled={loading}>
                {loading ? (
                  <><span className="contact-form__spinner" /> Envoi en cours…</>
                ) : (
                  <><Send size={16} /> Envoyer le message</>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}