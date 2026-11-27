import { useEffect, useState, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Brand } from './ui'
import { ContactButton } from './ContactTools'
const nav = [['Home', '/'], ['Properties', '/properties'], ['Projects', '/projects'], ['Services', '/services'], ['About Us', '/about'], ['Insights', '/insights'], ['Contact', '/contact']]
export default function Header() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false), [openPath, setOpenPath] = useState(null), btn = useRef(null)
  const open = openPath === pathname
  useEffect(() => {
    const sp = document.getElementById('public-scrollport'); if (!sp) return
    const f = () => setScrolled(sp.scrollTop > 55)
    const w = () => document.documentElement.style.setProperty('--public-scrollbar-width', `${sp.offsetWidth - sp.clientWidth}px`)
    f(); w(); sp.addEventListener('scroll', f, { passive: true })
    const ro = new ResizeObserver(w); ro.observe(sp)
    return () => { sp.removeEventListener('scroll', f); ro.disconnect() }
  }, [])
  useEffect(() => {
    if (!open) return
    const k = (e) => { if (e.key === 'Escape') { setOpenPath(null); btn.current?.focus() } }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [open])
  const items = (close) => nav.map(([l, h]) => <NavLink key={h} to={h} end={h === '/'} onClick={close}>{l}</NavLink>)
  return (
    <header className={`site-header ${pathname === '/' && !scrolled && !open ? 'header-overlay' : 'header-solid'}`}>
      <div className="header-inner wrap">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">{items()}</nav>
        <div className="header-actions">
          <div className="header-advisor"><ContactButton kind="advisor" /></div>
          <button ref={btn} type="button" className="icon-button menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpenPath(open ? null : pathname)}>{open ? <X size={25} /> : <Menu size={25} />}</button>
        </div>
      </div>
      {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
        {items(() => setOpenPath(null))}
        <ContactButton kind="advisor" beforeOpen={() => setOpenPath(null)} /></nav>}
    </header>)
}
