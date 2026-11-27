import { useParams } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { useSEO } from '../utils/useSEO'
import { projects } from '../data/projects'
import { properties } from '../data/properties'
import { PageHero, Breadcrumbs, SectionHeading, ButtonLink, EmptyState } from '../components/ui'
import { PropertyCard } from '../components/Cards'
import { PhotoGallery } from '../components/Gallery'
import Enquiry from '../components/Enquiry'
import NotFound from './NotFound'
import { waLink } from '../utils/whatsapp'
export default function ProjectDetail() {
  const p = projects.find((x) => x.id === useParams().id)
  useSEO(p?.name, p?.short)
  if (!p) return <NotFound />
  const imgs = [p.image, ...p.images].filter(Boolean), related = properties.filter((x) => x.projectId === p.id)
  return <>
    <PageHero label={p.tag} title={p.name} text={p.location || 'ADB project portfolio'}><Breadcrumbs items={[['Projects', '/projects'], [p.name]]} /></PageHero>
    <div className="wrap section compact">
      <div className="detail-layout"><div className="detail-content">
        <PhotoGallery images={imgs} name={p.name} fit={p.id === 'adb-heights' ? 'contain' : undefined} />
        <section className="detail-section"><h2>Project overview</h2><p>{p.description}</p>
          <dl className="facts"><div><dt>Location</dt><dd>{p.location || 'Awaiting ADB confirmation'}</dd></div><div><dt>Development status</dt><dd>Awaiting ADB confirmation</dd></div></dl></section>
        <section className="detail-section"><h2>Features & development details</h2><ul className="feature-list">{p.details.map((n) => <li key={n}>{n}</li>)}</ul></section>
        <section className="detail-section" id="enquiry"><h2>Make a project enquiry</h2><Enquiry subject={p.name} /></section>
      </div>
      <aside className="detail-sidebar"><div className="contact-panel"><span className="eyebrow">Project enquiry</span><h2>{p.name}</h2>
        <p><MapPin size={16} /> {p.location || 'Location to be confirmed'}</p>
        <a className="button button-primary" href={waLink(`Hello, I would like details about ${p.name}.`)} target="_blank" rel="noreferrer">Enquire on WhatsApp</a>
        <a className="button button-ghost" href="#enquiry">Enquiry form</a></div></aside></div>
      <section className="section"><SectionHeading title="Related Properties" />
        {related.length ? <div className="cards-grid">{related.map((x) => <PropertyCard key={x.id} p={x} />)}</div> : <EmptyState title="Listings pending" text="Contact ADB to ask about current listings for this project." />}</section>
    </div></>
}
