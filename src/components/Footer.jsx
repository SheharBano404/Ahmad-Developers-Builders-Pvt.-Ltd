import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Clock, ChevronRight, ArrowUpRight } from 'lucide-react'
import { Brand } from './ui'
import { COMPANY } from '../config'
import { projects } from '../data/projects'
import { generalMessage, waLink } from '../utils/whatsapp'

const exploreLinks = [['Properties', '/properties'], ['Projects', '/projects'], ['Services', '/services'], ['About Us', '/about'], ['Insights', '/insights'], ['Contact', '/contact']]
const companyLinks = [
  ['Our Team', '/about#team'],
  ['CEO Message', '/about#leadership'],
  ['Vision & Mission', '/about#vision-mission'],
  ['Core Values', '/about#core-values'],
  ['The ADB Approach', '/#approach'],
  ['Sheikhupura Office', '/contact#office'],
]
const phoneHref = `tel:${COMPANY.phone.replaceAll(' ', '')}`
const facebookSearch = 'https://www.facebook.com/search/pages/?q=Ahmad%20Developers%20Sheikhupura'
const facebookLabel = COMPANY.facebook ? 'Ahmad Developers on Facebook' : 'Find us on Facebook'
const socials = [
  ['@ahmad_developers on Instagram', '@ahmad_developers', COMPANY.instagram, <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>],
  [facebookLabel, COMPANY.facebook ? 'Ahmad Developers' : facebookLabel, COMPANY.facebook || facebookSearch, <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 22v-9h3l.5-3H14V8c0-.9.3-1.5 1.6-1.5H18V3.8c-.4-.1-1.4-.3-2.6-.3C12.8 3.5 11 5 11 8v2H8v3h3v9z" /></svg>],
  [`WhatsApp ${COMPANY.phone}`, COMPANY.phone, waLink(generalMessage()), <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5.1 17.8 4 21l3.5-1a8.5 8.5 0 1 0-2.4-2.2Z" /><path d="M9.2 8.3c-.8 0-1.2.7-1.2 1.5 0 2.7 3.7 6.2 6.3 6.2.9 0 1.7-.6 1.7-1.4l-2.2-1.2-.9.8a5.6 5.6 0 0 1-3-3l.6-.9-.9-2Z" /></svg>],
]

function FooterLinks({ title, links }) {
  return <div className="footer-links"><h2>{title}</h2>
    <ul>{links.map(([label, to]) => <li key={to}><Link to={to}><ChevronRight size={13} aria-hidden="true" />{label}</Link></li>)}</ul>
  </div>
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Brand />
          <p className="footer-tagline">Construction, development and real estate in Pakistan.</p>
          <div className="footer-office">
            <address><MapPin size={16} aria-hidden="true" /><span><strong>Sheikhupura office</strong>{COMPANY.address}</span></address>
            <p><Clock size={16} aria-hidden="true" /><span><strong>Working hours</strong>Sat–Thu · 8 am–8 pm<br />Fri · Closed<br /><a href={phoneHref}>Call to confirm before visiting</a></span></p>
          </div>
          <Link to="/about" className="footer-profile">Company profile <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
        <div className="footer-navigation">
          <FooterLinks title="Explore" links={exploreLinks} />
          <FooterLinks title="Our projects" links={projects.map((p) => [p.name, `/projects/${p.id}`])} />
          <FooterLinks title="Company" links={companyLinks} />
        </div>
        <div className="footer-contact"><h2>Get in touch</h2>
          <a className="footer-contact-row" href={`mailto:${COMPANY.email}`}><span className="footer-icon" aria-hidden="true"><Mail /></span><span>{COMPANY.email}</span></a>
          <a className="footer-contact-row" href={phoneHref}><span className="footer-icon" aria-hidden="true"><Phone /></span><span>{COMPANY.phone}</span></a>
          {socials.map(([label, text, href, icon]) => <a key={label} className="footer-contact-row" href={href} aria-label={label} target="_blank" rel="noreferrer">
            <span className="footer-icon" aria-hidden="true">{icon}</span><span>{text}</span>
          </a>)}
        </div>
      </div>
      <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} {COMPANY.name}</span></div>
    </footer>)
}
