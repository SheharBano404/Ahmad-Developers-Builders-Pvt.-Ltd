import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ContactTools from './components/ContactTools'
import ScrollReveal from './components/ScrollReveal'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Services from './pages/Services'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import Insights from './pages/Insights'
import InsightDetail from './pages/InsightDetail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
function HashScroll() {
  const { hash, pathname } = useLocation()
  useEffect(() => { if (hash) setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 60) }, [hash, pathname])
  return null
}
export default function App() {
  return (
    <ContactTools>
      <div className="public-scrollport" id="public-scrollport">
        <a href="#main" className="skip-link">Skip to content</a>
        <Header /><HashScroll /><ScrollReveal />
        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} /><Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} /><Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/properties" element={<Properties />} /><Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/insights" element={<Insights />} /><Route path="/insights/:slug" element={<InsightDetail />} />
            <Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ContactTools>)
}
