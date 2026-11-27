import { Link } from 'react-router-dom'
import { MapPin, ArrowUpRight } from 'lucide-react'
import { Asset, ButtonLink } from './ui'
import PricingButton from './Pricing'
export const PropertyCard = ({ p }) => (
  <article className="property-card">
    <Asset src={p.images[0]} alt={p.name} />
    <div className="property-shade" />
    <div className="card-badges">{p.isSample && <span>Sample listing</span>}<span>{p.category} · Ref {p.ref}</span></div>
    <div className="property-copy">
      <h3>{p.name}</h3><div className="property-location"><MapPin size={16} />{p.location}</div>
      <p>{p.description}</p>
      <div className="property-actions"><ButtonLink to={`/properties/${p.id}`} variant="light">View Details <ArrowUpRight size={15} /></ButtonLink><PricingButton property={p} /></div>
    </div>
  </article>)
export const ProjectCard = ({ p }) => (
  <Link className="project-card" to={`/projects/${p.id}`}>
    <Asset src={p.image} alt={p.name} fit={p.id === 'adb-heights' ? 'contain' : undefined} />
    <div className="property-shade" />
    <div className="project-card-copy"><span>{p.tag}</span><h3>{p.name}</h3></div>
    <span className="project-arrow" aria-hidden="true"><ArrowUpRight size={19} /></span>
  </Link>)
