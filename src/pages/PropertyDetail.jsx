import { useParams } from 'react-router-dom'
import { MapPin, Building2 } from 'lucide-react'
import { useSEO } from '../utils/useSEO'
import { properties } from '../data/properties'
import { projects } from '../data/projects'
import { PageHero, Breadcrumbs, SectionHeading, ButtonLink } from '../components/ui'
import { PropertyCard } from '../components/Cards'
import { PhotoGallery, VideoGallery } from '../components/Gallery'
import PricingButton from '../components/Pricing'
import Enquiry from '../components/Enquiry'
import NotFound from './NotFound'
import { waLink, propertyMessage } from '../utils/whatsapp'
import { ContactButton } from '../components/ContactTools'
export default function PropertyDetail() {
  const p = properties.find((x) => x.id === useParams().id)
  useSEO(p?.name, p?.description)
  if (!p) return <NotFound />
  const project = projects.find((x) => x.id === p.projectId), others = properties.filter((x) => x.id !== p.id).slice(0, 3)
  return <>
    <PageHero label={`${p.isSample ? 'Sample listing · ' : ''}${p.ref}`} title={p.name} text={p.location}><Breadcrumbs items={[['Properties', '/properties'], [p.name]]} /></PageHero>
    <div className="wrap section compact">
      {p.isSample && <p className="notice">Sample listing for demonstration. Replace with confirmed property details.</p>}
      <div className="detail-layout property-detail-layout">
        <div className="detail-gallery"><PhotoGallery images={p.images} name={p.name} fit="contain" /></div>
        <aside className="detail-sidebar"><div className="contact-panel"><span className="eyebrow">Property enquiry</span><h2>{p.name}</h2>
          <p><MapPin size={16} /> {p.location}</p><p><Building2 size={16} /> {p.category}</p>
          <PricingButton property={p} />
          <ContactButton kind="advisor" subject={p.name} />
          <a className="button button-outline" href={waLink(propertyMessage(p))} target="_blank" rel="noreferrer">Enquire on WhatsApp</a>
          <a className="button button-ghost" href="#enquiry">Enquiry form</a></div></aside>
        <div className="detail-content">
          <section className="detail-section"><h2>Property overview</h2><p>{p.description}</p>
            <dl className="facts"><div><dt>Listing reference</dt><dd>{p.ref}</dd></div><div><dt>Category</dt><dd>{p.category}</dd></div>
              {p.status && <div><dt>Availability</dt><dd>{p.status}</dd></div>}<div><dt>Location</dt><dd>{p.location}</dd></div></dl></section>
          {p.specs?.length > 0 && <section className="detail-section"><h2>Specifications & amenities</h2>
            <dl className="facts">{p.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></section>}
          <VideoGallery videos={p.videos} />
          {project && <section className="detail-section"><h2>Related project</h2><ButtonLink to={`/projects/${project.id}`} variant="outline">{project.name}</ButtonLink></section>}
          <section className="detail-section" id="enquiry"><h2>Enquire about this property</h2><Enquiry subject={`${p.name} · ${p.ref}`} /></section>
        </div>
      </div>
      {others.length > 0 && <section className="section"><SectionHeading title="Similar Properties" /><div className="cards-grid">{others.map((x) => <PropertyCard key={x.id} p={x} />)}</div></section>}
    </div></>
}
