import { useSearchParams } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useSEO } from '../utils/useSEO'
import { COMPANY } from '../config'
import { PageHero, Breadcrumbs } from '../components/ui'
import Enquiry from '../components/Enquiry'
import { waLink, generalMessage } from '../utils/whatsapp'
export default function Contact() {
  useSEO('Contact Us', 'Contact Ahmad Developers & Builders for property, project and construction enquiries.')
  const [q] = useSearchParams()
  return <>
    <PageHero label="Get in touch" title="Contact ADB" text="Tell us what you are looking for and our team will get back to you."><Breadcrumbs items={[['Contact Us']]} /></PageHero>
    <section className="wrap section compact"><div className="contact-layout">
      <div className="contact-main"><h2>Send an enquiry</h2><Enquiry key={q.get('subject') || ''} subject={q.get('subject') || ''} /></div>
      <aside className="contact-panel" id="office"><span className="eyebrow">Company details</span><h2>Ahmad Developers & Builders</h2>
        <div className="contact-details">
          <div><MapPin size={18} /><span>{COMPANY.address}</span></div>
          <div><Mail size={18} /><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></div>
          {COMPANY.phone && <div><Phone size={18} /><a href={`tel:${COMPANY.phone.replaceAll(' ', '')}`}>{COMPANY.phone}</a></div>}</div>
        <a className="button button-primary" href={waLink(generalMessage())} target="_blank" rel="noreferrer">Chat on WhatsApp</a></aside>
    </div></section></>
}
