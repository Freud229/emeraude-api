import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Filter, X, ZoomIn } from 'lucide-react'
import { CATALOGUES } from '../data/mock'
import './CataloguePage.css'

/* ── Lightbox ── */
function Lightbox({ photo, onClose }) {
  useEffect(() => {
    const handleKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose}><X size={24} /></button>
      <div className="lightbox__inner" onClick={e => e.stopPropagation()}>
        <img src={photo.src} alt={photo.texte} className="lightbox__img" />
        <div className="lightbox__info">
          <span className="lightbox__type">{photo.type}</span>
          <p className="lightbox__caption">{photo.texte}</p>
        </div>
      </div>
    </div>
  )
}

export default function CataloguePage() {
  const location = useLocation()
  const [activeId, setActiveId] = useState(CATALOGUES[0]?.id)
  const [lightboxPhoto, setLightboxPhoto] = useState(null)

  useEffect(() => {
    const hash = location.hash
    if (hash) {
      const id = parseInt(hash.replace('#cat-', ''))
      if (id) setActiveId(id)
    }
  }, [location])

  const activeCat = CATALOGUES.find(c => c.id === activeId)

  return (
    <main className="catalogue-page">
      {/* Page hero */}
      <section className="catalogue-page__hero">
        <div className="catalogue-page__hero-bg" />
        <div className="container catalogue-page__hero-content">
          <p className="section-subtitle" style={{color:'var(--em-green-500)'}}>Nos collections</p>
          <h1 className="section-title" style={{color:'white'}}>Catalogue Éméraude</h1>
          <p style={{color:'rgba(255,255,255,0.75)', marginTop:'0.75rem', maxWidth:500}}>
            Explorez nos collections de lunettes de vue, solaires, lentilles et accessoires.
          </p>
        </div>
      </section>

      <div className="catalogue-page__body container">
        {/* Sidebar catalogues */}
        <aside className="catalogue-page__sidebar">
          <h2 className="catalogue-page__sidebar-title">Catalogues</h2>
          <ul className="catalogue-page__sidebar-list">
            {CATALOGUES.map(cat => (
              <li key={cat.id}>
                <button
                  className={`catalogue-page__tab ${activeId === cat.id ? 'catalogue-page__tab--active' : ''}`}
                  onClick={() => setActiveId(cat.id)}
                  id={`cat-${cat.id}`}
                >
                  <span className="catalogue-page__tab-name">{cat.nom}</span>
                  <span className="catalogue-page__tab-count">{cat.photos.length}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <div className="catalogue-page__main">
          {activeCat && (
            <>
              <div className="catalogue-page__cat-header">
                <div>
                  <h2 className="catalogue-page__cat-title">{activeCat.nom}</h2>
                  <p className="catalogue-page__cat-desc">{activeCat.description}</p>
                </div>
                <span className="catalogue-page__cat-badge">
                  <Filter size={14} /> {activeCat.photos.length} modèles
                </span>
              </div>

              <div className="catalogue-page__grid">
                {activeCat.photos.map((photo, i) => (
                  <div
                    key={photo.id}
                    className="photo-card"
                    style={{ animationDelay: `${i * 0.06}s` }}
                    onClick={() => setLightboxPhoto(photo)}
                  >
                    <div className="photo-card__img-wrap">
                      <img src={photo.src} alt={photo.texte} className="photo-card__img" loading="lazy" />
                      <div className="photo-card__overlay">
                        <ZoomIn size={22} className="photo-card__zoom" />
                      </div>
                      <span className="photo-card__type">{photo.type}</span>
                    </div>
                    {photo.texte && (
                      <p className="photo-card__caption">{photo.texte}</p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {lightboxPhoto && (
        <Lightbox photo={lightboxPhoto} onClose={() => setLightboxPhoto(null)} />
      )}
    </main>
  )
}