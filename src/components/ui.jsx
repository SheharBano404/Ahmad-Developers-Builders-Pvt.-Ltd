import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
export const ButtonLink = ({ to, children, variant = 'primary', className = '', ...r }) =>
  <Link to={to} className={`button button-${variant} ${className}`} {...r}>{children}</Link>
export const Brand = () => (
  <Link to="/" className="brand" aria-label="Ahmad Developers & Builders, home">
    <img src="/adb/adb-mark.png" alt="" width="62" height="40" />
    <span><strong>AHMAD DEVELOPERS</strong><small>& BUILDERS PVT. LTD.</small></span></Link>)
export const SectionHeading = ({ label, title, text, action }) => (
  <div className="section-head"><div>{label && <span className="eyebrow">{label}</span>}<h2>{title}</h2>{text && <p>{text}</p>}</div>{action}</div>)
// Image with the original "Image pending" placeholder when no file is set or the file fails to load.
import { useState } from 'react'
export function Asset({ src, alt = '', className = '', fit, eager }) {
  const [bad, setBad] = useState(false)
  if (!src || bad) return <span className={`preview-image ${className}`} role="img" aria-label="Image pending"><small>Image pending</small></span>
  return <img className={`asset-img ${fit === 'contain' ? 'contain' : 'cover'} ${className}`} src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} onError={() => setBad(true)} />
}
export const Breadcrumbs = ({ items }) => (
  <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link>
    {items.map(([label, to]) => <span key={label}><ChevronRight size={13} />{to ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}</span>)}</nav>)
export const PageHero = ({ label, title, text, children }) => (
  <section className="page-hero"><div className="wrap">{children}{label && <p className="eyebrow">{label}</p>}<h1>{title}</h1>{text && <p className="page-hero-text">{text}</p>}</div></section>)
export const EmptyState = ({ title, text }) => <div className="empty-state"><h3>{title}</h3><p>{text}</p></div>
