import React, { useState, useRef } from 'react'
import { LayoutDashboard, FolderOpen, Image, Video, Plus, Trash2, Eye, EyeOff,
         Upload, X, Edit2, Check, LogOut, AlertTriangle, ChevronDown } from 'lucide-react'
import { CATALOGUES as INIT_CATS, VIDEOS_ACCUEIL as INIT_VIDS } from '../data/mock'
import './AdminPage.css'

/* ───── Authentification simple ───── */
function AdminLogin({ onLogin }) {
  const [user, setUser] = useState('')
  const [pwd, setPwd]   = useState('')
  const [err, setErr]   = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (user === 'admin' && pwd === 'emeraude2024') {
      onLogin()
    } else {
      setErr('Identifiants incorrects.')
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__logo">
          <Eye size={28} />
        </div>
        <h1 className="admin-login__title">Espace Admin</h1>
        <p className="admin-login__sub">Éméraude Optique</p>
        <form onSubmit={handleSubmit} className="admin-login__form">
          {err && <p className="admin-login__err"><AlertTriangle size={14} />{err}</p>}
          <div className="admin-form-field">
            <label>Identifiant</label>
            <input type="text" value={user} onChange={e => setUser(e.target.value)} required placeholder="admin" />
          </div>
          <div className="admin-form-field">
            <label>Mot de passe</label>
            <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} required placeholder="••••••••" />
          </div>
          <button type="submit" className="admin-login__btn">Se connecter</button>
        </form>
      </div>
    </div>
  )
}

/* ───── Sidebar ───── */
const MENU = [
  { id: 'dashboard',  label: 'Tableau de bord', icon: LayoutDashboard },
  { id: 'catalogues', label: 'Catalogues',       icon: FolderOpen },
  { id: 'photos',     label: 'Photos',           icon: Image },
  { id: 'videos',     label: 'Vidéos',           icon: Video },
]

function Sidebar({ active, onChange, onLogout }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__logo">
        <Eye size={22} />
        <span>Admin</span>
      </div>
      <nav className="admin-sidebar__nav">
        {MENU.map(m => (
          <button
            key={m.id}
            className={`admin-sidebar__link ${active === m.id ? 'admin-sidebar__link--active' : ''}`}
            onClick={() => onChange(m.id)}
          >
            <m.icon size={18} />
            {m.label}
          </button>
        ))}
      </nav>
      <button className="admin-sidebar__logout" onClick={onLogout}>
        <LogOut size={16} /> Déconnexion
      </button>
    </aside>
  )
}

/* ───── Dashboard ───── */
function Dashboard({ cats, videos }) {
  const totalPhotos = cats.reduce((s, c) => s + c.photos.length, 0)
  const stats = [
    { label: 'Catalogues', val: cats.length,            color: 'var(--em-green-600)' },
    { label: 'Photos',     val: totalPhotos,             color: 'var(--em-green-700)' },
    { label: 'Vidéos',     val: videos.length,           color: 'var(--em-green-800)' },
    { label: 'Vidéos actives', val: videos.filter(v=>v.visible).length, color: 'var(--em-green-500)' },
  ]
  return (
    <div className="admin-section">
      <h2 className="admin-section__title">Tableau de bord</h2>
      <div className="dashboard-stats">
        {stats.map((s,i) => (
          <div key={i} className="dashboard-stat" style={{'--clr': s.color}}>
            <span className="dashboard-stat__val">{s.val}</span>
            <span className="dashboard-stat__label">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <h3>Catalogues récents</h3>
          <ul className="dashboard-list">
            {cats.map(c => (
              <li key={c.id}><FolderOpen size={14} /><span>{c.nom}</span><em>{c.photos.length} photos</em></li>
            ))}
          </ul>
        </div>
        <div className="dashboard-panel">
          <h3>Vidéos à l'accueil</h3>
          <ul className="dashboard-list">
            {videos.map(v => (
              <li key={v.id}>
                <Video size={14} />
                <span>{v.titre}</span>
                <em style={{color: v.visible ? 'var(--em-green-600)':'var(--em-gray-500)'}}>
                  {v.visible ? 'Visible' : 'Masquée'}
                </em>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ───── Gestion Catalogues ───── */
function GestionCatalogues({ cats, setCats }) {
  const [form, setForm]     = useState({ nom: '', description: '' })
  const [editId, setEditId] = useState(null)
  const [confirm, setConfirm] = useState(null)

  const handleSave = () => {
    if (!form.nom.trim()) return
    if (editId) {
      setCats(c => c.map(x => x.id === editId ? { ...x, ...form } : x))
      setEditId(null)
    } else {
      setCats(c => [...c, { id: Date.now(), photos: [], ...form }])
    }
    setForm({ nom: '', description: '' })
  }

  const startEdit = cat => {
    setEditId(cat.id)
    setForm({ nom: cat.nom, description: cat.description })
  }

  const handleDelete = id => {
    setCats(c => c.filter(x => x.id !== id))
    setConfirm(null)
  }

  return (
    <div className="admin-section">
      <h2 className="admin-section__title">Gestion des catalogues</h2>

      {/* Formulaire */}
      <div className="admin-card">
        <h3 className="admin-card__title">{editId ? 'Modifier le catalogue' : 'Créer un catalogue'}</h3>
        <div className="admin-form-row">
          <div className="admin-form-field">
            <label>Nom du catalogue *</label>
            <input type="text" value={form.nom} onChange={e => setForm(f=>({...f, nom:e.target.value}))} placeholder="Ex : Lunettes Soleil" />
          </div>
        </div>
        <div className="admin-form-field">
          <label>Texte de bas de catalogue</label>
          <textarea rows={3} value={form.description} onChange={e => setForm(f=>({...f, description:e.target.value}))} placeholder="Description affichée en bas du catalogue…" />
        </div>
        <div className="admin-form-actions">
          {editId && <button className="admin-btn admin-btn--ghost" onClick={() => { setEditId(null); setForm({ nom:'', description:'' }) }}>Annuler</button>}
          <button className="admin-btn admin-btn--primary" onClick={handleSave}>
            {editId ? <><Check size={15}/> Enregistrer</> : <><Plus size={15}/> Créer</>}
          </button>
        </div>
      </div>

      {/* Liste */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Catalogue</th>
              <th>Texte bas de page</th>
              <th>Photos</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cats.map(cat => (
              <tr key={cat.id}>
                <td><strong>{cat.nom}</strong></td>
                <td className="admin-table__desc">{cat.description || <em style={{color:'var(--em-gray-500)'}}>—</em>}</td>
                <td><span className="admin-badge">{cat.photos.length}</span></td>
                <td>
                  <div className="admin-table__actions">
                    <button className="admin-icon-btn" onClick={() => startEdit(cat)} title="Modifier"><Edit2 size={15}/></button>
                    <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => setConfirm(cat.id)} title="Supprimer"><Trash2 size={15}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirm */}
      {confirm && (
        <div className="admin-confirm-overlay">
          <div className="admin-confirm">
            <AlertTriangle size={32} color="var(--em-red, #EF4444)" />
            <p>Supprimer ce catalogue et toutes ses photos ?</p>
            <div className="admin-confirm__actions">
              <button className="admin-btn admin-btn--ghost" onClick={() => setConfirm(null)}>Annuler</button>
              <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(confirm)}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ───── Gestion Photos ───── */
const TYPES_LUNETTE = ['Vue', 'Soleil', 'Lentille', 'Accessoire']

function GestionPhotos({ cats, setCats }) {
  const [catId, setCatId]   = useState(cats[0]?.id || '')
  const [form, setForm]     = useState({ type: 'Vue', texte: '', preview: null, file: null })
  const [confirm, setConfirm] = useState(null)
  const fileRef = useRef()

  const activeCat = cats.find(c => c.id === Number(catId) || c.id === catId)

  const handleFile = e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setForm(f => ({ ...f, file, preview: ev.target.result }))
    reader.readAsDataURL(file)
  }

  const handleImport = () => {
    if (!catId || !form.preview) return
    const newPhoto = {
      id: Date.now(),
      src: form.preview,
      texte: form.texte,
      type: form.type,
    }
    setCats(c => c.map(x => x.id === activeCat.id
      ? { ...x, photos: [...x.photos, newPhoto] }
      : x
    ))
    setForm({ type: 'Vue', texte: '', preview: null, file: null })
    fileRef.current.value = ''
  }

  const handleDelete = photoId => {
    setCats(c => c.map(x => x.id === activeCat.id
      ? { ...x, photos: x.photos.filter(p => p.id !== photoId) }
      : x
    ))
    setConfirm(null)
  }

  return (
    <div className="admin-section">
      <h2 className="admin-section__title">Gestion des photos</h2>

      {/* Import */}
      <div className="admin-card">
        <h3 className="admin-card__title">Importer une photo</h3>
        <div className="admin-form-row">
          <div className="admin-form-field">
            <label>Catalogue *</label>
            <select value={catId} onChange={e => setCatId(e.target.value)}>
              {cats.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
            </select>
          </div>
          <div className="admin-form-field">
            <label>Type de lunette *</label>
            <select value={form.type} onChange={e => setForm(f=>({...f, type:e.target.value}))}>
              {TYPES_LUNETTE.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="admin-form-field">
          <label>Texte accompagnant la photo</label>
          <input type="text" value={form.texte} onChange={e => setForm(f=>({...f, texte:e.target.value}))} placeholder="Description de la photo…" />
        </div>
        <div className="admin-form-field">
          <label>Fichier image *</label>
          <div className="admin-file-drop" onClick={() => fileRef.current.click()}>
            {form.preview ? (
              <div className="admin-file-preview">
                <img src={form.preview} alt="preview" />
                <button className="admin-file-clear" onClick={e => { e.stopPropagation(); setForm(f=>({...f, preview:null, file:null})); fileRef.current.value='' }}>
                  <X size={16}/>
                </button>
              </div>
            ) : (
              <>
                <Upload size={28} />
                <p>Cliquer pour choisir une image</p>
                <span>JPG, PNG, WEBP — max 5 Mo</span>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{display:'none'}} onChange={handleFile} />
        </div>
        <div className="admin-form-actions">
          <button
            className="admin-btn admin-btn--primary"
            onClick={handleImport}
            disabled={!form.preview || !catId}
          >
            <Upload size={15}/> Importer la photo
          </button>
        </div>
      </div>

      {/* Galerie par catalogue */}
      <div className="admin-card">
        <h3 className="admin-card__title">Photos du catalogue</h3>
        <div className="admin-form-field" style={{maxWidth:300, marginBottom:'1.5rem'}}>
          <label>Filtrer par catalogue</label>
          <select value={catId} onChange={e => setCatId(e.target.value)}>
            {cats.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
          </select>
        </div>
        {activeCat?.photos.length === 0 ? (
          <p className="admin-empty">Aucune photo dans ce catalogue.</p>
        ) : (
          <div className="admin-photos-grid">
            {activeCat?.photos.map(p => (
              <div key={p.id} className="admin-photo-card">
                <div className="admin-photo-card__img-wrap">
                  <img src={p.src} alt={p.texte} />
                  <span className="admin-photo-card__type">{p.type}</span>
                </div>
                <p className="admin-photo-card__caption">{p.texte || <em>Sans texte</em>}</p>
                <button
                  className="admin-photo-card__del"
                  onClick={() => setConfirm(p.id)}
                  title="Supprimer"
                >
                  <Trash2 size={14}/>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {confirm && (
        <div className="admin-confirm-overlay">
          <div className="admin-confirm">
            <AlertTriangle size={32} color="#EF4444" />
            <p>Supprimer cette photo définitivement ?</p>
            <div className="admin-confirm__actions">
              <button className="admin-btn admin-btn--ghost" onClick={() => setConfirm(null)}>Annuler</button>
              <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(confirm)}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ───── Gestion Vidéos ───── */
function GestionVideos({ videos, setVideos }) {
  const [form, setForm]     = useState({ titre: '', preview: null, file: null, src: '' })
  const [confirm, setConfirm] = useState(null)
  const fileRef = useRef()

  const handleFile = e => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setForm(f => ({ ...f, file, preview: url, src: url }))
  }

  const handleImport = () => {
    if (!form.titre.trim() || !form.src) return
    setVideos(v => [...v, { id: Date.now(), titre: form.titre, src: form.src, visible: true }])
    setForm({ titre: '', preview: null, file: null, src: '' })
    fileRef.current.value = ''
  }

  const toggleVisible = id => setVideos(v => v.map(x => x.id === id ? { ...x, visible: !x.visible } : x))
  const handleDelete  = id => { setVideos(v => v.filter(x => x.id !== id)); setConfirm(null) }

  return (
    <div className="admin-section">
      <h2 className="admin-section__title">Gestion des vidéos</h2>

      <div className="admin-card">
        <h3 className="admin-card__title">Importer une vidéo</h3>
        <p className="admin-card__hint">Les vidéos importées s'affichent à l'accueil et se jouent les unes après les autres.</p>
        <div className="admin-form-field">
          <label>Titre de la vidéo *</label>
          <input type="text" value={form.titre} onChange={e => setForm(f=>({...f, titre:e.target.value}))} placeholder="Titre de la vidéo…" />
        </div>
        <div className="admin-form-field">
          <label>Fichier vidéo *</label>
          <div className="admin-file-drop" onClick={() => fileRef.current.click()}>
            {form.preview ? (
              <div className="admin-file-preview admin-file-preview--video">
                <video src={form.preview} controls style={{width:'100%', maxHeight:180, borderRadius:4}} />
                <button className="admin-file-clear" onClick={e => { e.stopPropagation(); setForm(f=>({...f, preview:null, file:null, src:''})); fileRef.current.value='' }}>
                  <X size={16}/>
                </button>
              </div>
            ) : (
              <>
                <Upload size={28} />
                <p>Cliquer pour choisir une vidéo</p>
                <span>MP4, WebM — max 100 Mo</span>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept="video/*" style={{display:'none'}} onChange={handleFile} />
        </div>
        <div className="admin-form-actions">
          <button className="admin-btn admin-btn--primary" onClick={handleImport} disabled={!form.titre || !form.src}>
            <Upload size={15}/> Importer la vidéo
          </button>
        </div>
      </div>

      {/* Liste vidéos */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Statut accueil</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map(v => (
              <tr key={v.id}>
                <td><strong>{v.titre}</strong></td>
                <td>
                  <span className={`admin-badge ${v.visible ? 'admin-badge--green' : 'admin-badge--gray'}`}>
                    {v.visible ? 'Visible' : 'Masquée'}
                  </span>
                </td>
                <td>
                  <div className="admin-table__actions">
                    <button
                      className="admin-icon-btn"
                      onClick={() => toggleVisible(v.id)}
                      title={v.visible ? "Retirer de l'accueil" : "Afficher à l'accueil"}
                    >
                      {v.visible ? <EyeOff size={15}/> : <Eye size={15}/>}
                    </button>
                    <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => setConfirm(v.id)} title="Supprimer">
                      <Trash2 size={15}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {confirm && (
        <div className="admin-confirm-overlay">
          <div className="admin-confirm">
            <AlertTriangle size={32} color="#EF4444" />
            <p>Supprimer cette vidéo définitivement du site ?</p>
            <div className="admin-confirm__actions">
              <button className="admin-btn admin-btn--ghost" onClick={() => setConfirm(null)}>Annuler</button>
              <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(confirm)}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ───── Page principale Admin ───── */
export default function AdminPage() {
  const [auth, setAuth]     = useState(false)
  const [page, setPage]     = useState('dashboard')
  const [cats, setCats]     = useState(INIT_CATS)
  const [videos, setVideos] = useState(INIT_VIDS)

  if (!auth) return <AdminLogin onLogin={() => setAuth(true)} />

  return (
    <div className="admin-shell">
      <Sidebar active={page} onChange={setPage} onLogout={() => setAuth(false)} />
      <div className="admin-main">
        <div className="admin-topbar">
          <h1 className="admin-topbar__title">
            {MENU.find(m => m.id === page)?.label}
          </h1>
          <div className="admin-topbar__user">
            <div className="admin-topbar__avatar">A</div>
            <span>Administrateur</span>
          </div>
        </div>
        <div className="admin-content">
          {page === 'dashboard'  && <Dashboard cats={cats} videos={videos} />}
          {page === 'catalogues' && <GestionCatalogues cats={cats} setCats={setCats} />}
          {page === 'photos'     && <GestionPhotos cats={cats} setCats={setCats} />}
          {page === 'videos'     && <GestionVideos videos={videos} setVideos={setVideos} />}
        </div>
      </div>
    </div>
  )
}