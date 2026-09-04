import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Pause, ChevronLeft, ChevronRight, MapPin, Phone, Clock } from 'lucide-react'
import { CATALOGUES, BOUTIQUES, STATS, VIDEOS_ACCUEIL } from '../data/mock'
import './HomePage.css'

/* ── Hero Section ── */
function Hero() {
  const [currentWord, setCurrentWord] = useState(0)
  const words = ['élégance.', 'clarté.', 'style.', 'confiance.']

  useEffect(() => {
    const t = setInterval(() => setCurrentWord(w => (w + 1) % words.length), 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="hero">
      <div className="hero__bg">
        <img
          src="https://images.unsplash.com/photo-1483118714900-540cf339fd46?w=1600&q=85"
          alt="Éméraude Optique"
          className="hero__img"
        />
        <div className="hero__overlay" />
      </div>

      <div className="hero__content container">
        <p className="hero__eyebrow animate-fade-up">Votre opticien de confiance au Bénin</p>
        <h1 className="hero__title animate-fade-up delay-100">
          Voir le monde<br />
          avec <span className="hero__word">{words[currentWord]}</span>
        </h1>
        <p className="hero__desc animate-fade-up delay-200">
          Éméraude Optique, 3 boutiques à Cotonou, Porto-Novo et Parakou.<br />
          Lunettes de vue, solaires, lentilles et accessoires de qualité.
        </p>
        <div className="hero__actions animate-fade-up delay-300">
          <Link to="/catalogue" className="btn-primary">
            Voir le catalogue <ArrowRight size={16} />
          </Link>
          <Link to="/contact" className="btn-outline hero__btn-outline">
            Nous contacter
          </Link>
        </div>
      </div>

      {/* Boutiques scroll */}
      <div className="hero__badges animate-fade-up delay-400">
        {BOUTIQUES.map(b => (
          <div key={b.id} className="hero__badge">
            <MapPin size={14} />
            <span>{b.ville} — {b.quartier}</span>
          </div>
        ))}
      </div>

      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span>Découvrir</span>
      </div>
    </section>
  )
}

/* ── Stats Section ── */
function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stats-section__inner container">
        {STATS.map((s, i) => (
          <div key={i} className="stats-section__item">
            <span className="stats-section__value">{s.valeur}</span>
            <span className="stats-section__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Videos Section ── */
function VideosSection() {
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(true)
  const videoRef = useRef(null)
  const videos = VIDEOS_ACCUEIL.filter(v => v.visible)

  const handleEnded = () => {
    if (videos.length > 1) {
      setCurrent(c => (c + 1) % videos.length)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      playing ? videoRef.current.pause() : videoRef.current.play()
      setPlaying(p => !p)
    }
  }

  if (videos.length === 0) return null

  return (
    <section className="videos-section">
      <div className="container">
        <div className="videos-section__header">
          <p className="section-subtitle">En images</p>
          <h2 className="section-title">Découvrez nos collections</h2>
        </div>

        <div className="videos-section__player">
          <video
            ref={videoRef}
            key={videos[current]?.src}
            src={videos[current]?.src}
            autoPlay
            muted
            playsInline
            onEnded={handleEnded}
            className="videos-section__video"
          />
          <div className="videos-section__controls">
            <button onClick={togglePlay} className="videos-section__btn">
              {playing ? <Pause size={18} /> : <Play size={18} />}
            </button>
            {videos.length > 1 && (
              <>
                <button onClick={() => setCurrent(c => (c - 1 + videos.length) % videos.length)} className="videos-section__btn">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={() => setCurrent(c => (c + 1) % videos.length)} className="videos-section__btn">
                  <ChevronRight size={18} />
                </button>
                <span className="videos-section__counter">
                  {current + 1} / {videos.length}
                </span>
              </>
            )}
          </div>
          <div className="videos-section__title-overlay">
            {videos[current]?.titre}
          </div>
        </div>

        {videos.length > 1 && (
          <div className="videos-section__dots">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`videos-section__dot ${i === current ? 'videos-section__dot--active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ── Catalogue Preview ── */
function CataloguePreview() {
  return (
    <section className="cat-preview">
      <div className="container">
        <div className="cat-preview__header">
          <div>
            <p className="section-subtitle">Nos collections</p>
            <h2 className="section-title">Un catalogue pour chaque regard</h2>
          </div>
          <Link to="/catalogue" className="btn-outline">
            Tout voir <ArrowRight size={16} />
          </Link>
        </div>

        <div className="cat-preview__grid">
          {CATALOGUES.map((cat, i) => (
            <Link to={`/catalogue#cat-${cat.id}`} key={cat.id} className="cat-card">
              <div className="cat-card__img-wrap">
                <img
                  src={cat.photos[0]?.src}
                  alt={cat.nom}
                  className="cat-card__img"
                  loading="lazy"
                />
                <div className="cat-card__overlay" />
                <span className="cat-card__count">{cat.photos.length} modèles</span>
              </div>
              <div className="cat-card__body">
                <h3 className="cat-card__title">{cat.nom}</h3>
                <p className="cat-card__desc">{cat.description.substring(0, 80)}…</p>
                <span className="cat-card__link">
                  Voir la collection <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Boutiques Section ── */
function BoutiquesSection() {
  return (
    <section className="boutiques-section">
      <div className="container">
        <div className="boutiques-section__header">
          <p className="section-subtitle">Nous trouver</p>
          <h2 className="section-title">Nos 3 boutiques</h2>
          <p className="boutiques-section__intro">
            Éméraude Optique est présent dans les trois plus grandes villes du Bénin.
            Venez nous rendre visite, nos équipes vous accueillent avec le sourire.
          </p>
        </div>

        <div className="boutiques-section__grid">
          {BOUTIQUES.map((b, i) => (
            <div key={b.id} className="boutique-card">
              <div className="boutique-card__img-wrap">
                <img src={b.image} alt={b.ville} className="boutique-card__img" loading="lazy" />
                <div className="boutique-card__badge">{b.ville}</div>
              </div>
              <div className="boutique-card__body">
                <h3 className="boutique-card__ville">{b.ville}</h3>
                <p className="boutique-card__quartier">{b.quartier}</p>
                <ul className="boutique-card__info">
                  <li><MapPin size={14} /><span>{b.adresse}</span></li>
                  <li><Phone size={14} /><a href={`tel:${b.tel.replace(/\s/g,'')}`}>{b.tel}</a></li>
                  <li><Clock size={14} /><span>{b.horaires}</span></li>
                </ul>
                <a
                  href={`https://wa.me/2290161985354?text=Bonjour, je souhaite un renseignement pour la boutique de ${b.ville}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="boutique-card__cta"
                >
                  Contacter cette boutique
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CTA Banner ── */
function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="container cta-banner__inner">
        <div>
          <h2 className="cta-banner__title">Prêt à choisir vos prochaines lunettes ?</h2>
          <p className="cta-banner__sub">Prenez rendez-vous ou venez directement dans l'une de nos boutiques.</p>
        </div>
        <div className="cta-banner__actions">
          <Link to="/contact" className="btn-primary">
            Prendre rendez-vous <ArrowRight size={16} />
          </Link>
          <Link to="/catalogue" className="cta-banner__outline">
            Voir le catalogue
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── Page ── */
export default function HomePage() {
  return (
    <main className="home">
      <Hero />
      <StatsSection />
      <VideosSection />
      <CataloguePreview />
      <BoutiquesSection />
      <CTABanner />
    </main>
  )
}