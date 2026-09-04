import React from 'react'
import { Link } from 'react-router-dom'
import { Eye, Award, Users, Heart, MapPin, Phone, Clock, ArrowRight } from 'lucide-react'
import { BOUTIQUES } from '../data/mock'
import './AProposPage.css'

const VALEURS = [
  { icon: Eye,    titre: 'Expertise', desc: 'Plus de 10 ans d\'expérience dans l\'optique au Bénin, avec des opticiens diplômés et formés aux dernières techniques.' },
  { icon: Award,  titre: 'Qualité',   desc: 'Nous sélectionnons rigoureusement nos montures et verres parmi les meilleures marques internationales.' },
  { icon: Users,  titre: 'Service',   desc: 'Un accompagnement personnalisé pour chaque client, de l\'examen de vue au choix de la monture idéale.' },
  { icon: Heart,  titre: 'Confiance', desc: 'Nous construisons une relation durable avec nos clients, fondée sur la transparence et le respect.' },
]

export default function AProposPage() {
  return (
    <main className="apropos-page">
      {/* Hero */}
      <section className="apropos-hero">
        <div className="apropos-hero__bg" />
        <div className="container apropos-hero__content">
          <p className="section-subtitle" style={{color:'var(--em-green-500)'}}>Notre histoire</p>
          <h1 className="section-title" style={{color:'white'}}>Qui sommes-nous ?</h1>
          <p style={{color:'rgba(255,255,255,0.75)', marginTop:'0.75rem', maxWidth:500}}>
            Éméraude Optique, votre partenaire visuel au cœur du Bénin depuis plus d'une décennie.
          </p>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="apropos-story">
        <div className="container apropos-story__inner">
          <div className="apropos-story__img-wrap">
            <img
              src="https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=700&q=80"
              alt="Éméraude Optique boutique"
              className="apropos-story__img"
            />
            <div className="apropos-story__img-badge">
              <span className="apropos-story__img-badge-num">10+</span>
              <span>années d'expertise</span>
            </div>
          </div>
          <div className="apropos-story__text">
            <p className="section-subtitle">Notre histoire</p>
            <h2 className="section-title">Nés de la passion <br />pour la vision</h2>
            <p className="apropos-story__desc">
              Éméraude Optique est née de la conviction qu'une bonne vision est un droit fondamental,
              pas un luxe. Fondée à Cotonou, notre enseigne a grandi pour couvrir les trois principales
              villes du Bénin avec des boutiques à Sainte Rita, Avakpa et Wanssirou.
            </p>
            <p className="apropos-story__desc">
              Notre équipe d'opticiens qualifiés vous guide à chaque étape : examen de vue, 
              conseil personnalisé, choix de monture et suivi après-vente. Chaque paire de lunettes
              est un projet sur-mesure que nous réalisons avec soin.
            </p>
            <Link to="/contact" className="btn-primary" style={{marginTop:'1.5rem', display:'inline-flex'}}>
              Prendre rendez-vous <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="apropos-valeurs">
        <div className="container">
          <div style={{textAlign:'center', marginBottom:'3rem'}}>
            <p className="section-subtitle">Ce qui nous guide</p>
            <h2 className="section-title">Nos valeurs</h2>
          </div>
          <div className="apropos-valeurs__grid">
            {VALEURS.map((v, i) => (
              <div key={i} className="valeur-card">
                <div className="valeur-card__icon">
                  <v.icon size={26} />
                </div>
                <h3 className="valeur-card__title">{v.titre}</h3>
                <p className="valeur-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boutiques */}
      <section className="apropos-boutiques">
        <div className="container">
          <div style={{textAlign:'center', marginBottom:'3rem'}}>
            <p className="section-subtitle">Nos adresses</p>
            <h2 className="section-title">3 boutiques, 1 mission</h2>
          </div>
          <div className="apropos-boutiques__grid">
            {BOUTIQUES.map(b => (
              <div key={b.id} className="apropos-boutique">
                <img src={b.image} alt={b.ville} className="apropos-boutique__img" loading="lazy" />
                <div className="apropos-boutique__body">
                  <h3 className="apropos-boutique__titre">{b.ville} — {b.quartier}</h3>
                  <ul className="apropos-boutique__info">
                    <li><MapPin size={13} />{b.adresse}</li>
                    <li><Phone size={13} /><a href={`tel:${b.tel.replace(/\s/g,'')}`}>{b.tel}</a></li>
                    <li><Clock size={13} />{b.horaires}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}