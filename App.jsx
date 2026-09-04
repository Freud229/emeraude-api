import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar   from './components/Navbar'
import Footer   from './components/Footer'
import HomePage     from './pages/HomePage'
import CataloguePage from './pages/CataloguePage'
import AProposPage  from './pages/AProposPage'
import ContactPage  from './pages/ContactPage'
import AdminPage    from './pages/AdminPage'

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    )
  }

  return (
    <Layout>
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/catalogue" element={<CataloguePage />} />
        <Route path="/apropos"   element={<AProposPage />} />
        <Route path="/contact"   element={<ContactPage />} />
      </Routes>
    </Layout>
  )
}