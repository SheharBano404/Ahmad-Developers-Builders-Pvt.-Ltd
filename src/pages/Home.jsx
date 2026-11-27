import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, Building2, Compass, DraftingCompass, Hammer, PanelsTopLeft, UsersRound } from 'lucide-react'
import { useSEO } from '../utils/useSEO'
import { projects } from '../data/projects'
import { properties } from '../data/properties'
import { services } from '../data/services'
import { ceo } from '../data/team'
import { ButtonLink, SectionHeading, Asset } from '../components/ui'
import { PropertyCard, ProjectCard } from '../components/Cards'
import HeroStory from '../components/HeroStory'
import ApproachTour from '../components/ApproachTour'
import { ContactButton } from '../components/ContactTools'
import { guides } from '../data/insights'
import { ArrowUpRight } from 'lucide-react'
import { INTRO, VISION, MISSION } from '../data/text'
const icons = [Compass, Building2, UsersRound, Hammer, PanelsTopLeft, DraftingCompass]
export default function Home() {
  useSEO('', 'Ahmad Developers & Builders: construction, real estate development and architectural design in Pakistan.')
  return <>
    <HeroStory />
    <section className="wrap section" id="properties">
      <SectionHeading label="The collection" title="Featured Properties" text="Explore ADB property listings." action={<ButtonLink to="/properties" variant="outline">View All Properties <ArrowRight size={16} /></ButtonLink>} />
      <div className="cards-grid">{properties.filter((p) => p.featured).slice(0, 3).map((p) => <PropertyCard key={p.id} p={p} />)}</div>
    </section>
    <section className="project-band"><div className="wrap section">
      <SectionHeading label="The portfolio" title="Featured Projects" text="Development and design work documented in the ADB company profile." action={<ButtonLink to="/projects" variant="outline">Explore All Projects <ArrowRight size={16} /></ButtonLink>} />
      <div className="cards-grid">{projects.slice(0, 3).map((p) => <ProjectCard key={p.id} p={p} />)}</div>
    </div></section>
    <section className="wrap section">
      <SectionHeading label="What we do" title="Our Services" text="From planning and design to construction, finishing and furnishing." action={<ButtonLink to="/services" variant="outline">View All Services <ArrowRight size={16} /></ButtonLink>} />
      <div className="service-grid">{services.slice(0, 6).map(([t, d], i) => { const I = icons[i]; return <article className="service-tile" key={t}><I size={25} strokeWidth={1.55} /><h3>{t}</h3><p>{d}</p></article> })}</div>
    </section>
    <section className="paper-band"><div className="wrap section split">
      <div className="editorial-photo"><Asset src="/adb/office.jpg" alt="ADB and Regal City signage on a building" /></div>
      <div className="editorial-copy"><span className="eyebrow">About ADB</span><h2>Ahmad Developers & Builders</h2><p>{INTRO}</p>
        <dl className="statement-list"><div><dt>Our vision</dt><dd>{VISION}</dd></div><div><dt>Our mission</dt><dd>{MISSION}</dd></div></dl>
        <ButtonLink to="/about" variant="outline">About the Company <ArrowRight size={16} /></ButtonLink></div>
    </div></section>
    <section className="wrap section" id="approach">
      <SectionHeading label="From planning to construction" title="The ADB Approach" />
      <div className="approach-grid">
        <article><Compass /><h3>Planning</h3><p>Town planning and development services help define how a site can be used.</p></article>
        <article><DraftingCompass /><h3>Design</h3><p>Architectural plans and 3D elevations communicate the proposed design.</p></article>
        <article><Hammer /><h3>Delivery</h3><p>Construction, finishing and furnishing are part of the company’s service offering.</p></article></div>
      <p className="approach-tour-lead">See how each plan becomes a finished space <ArrowDown size={20} aria-hidden="true" /></p>
    </section>
    <ApproachTour />
    <section className="paper-band"><div className="wrap section leadership-strip">
      <div className="founder-photo"><Asset src={ceo.photo} alt={`${ceo.name}, ${ceo.title}`} /></div>
      <div className="editorial-copy"><span className="eyebrow">Leadership & team</span><h2>A message from our founder</h2>
        <p>{ceo.name}’s message emphasizes understanding clients’ needs and being a reliable construction partner.</p>
        <div className="actions"><ButtonLink to="/about#leadership" variant="outline">CEO Message</ButtonLink><ButtonLink to="/about#team" variant="ghost">Meet the Team <ArrowRight size={16} /></ButtonLink></div></div>
    </div></section>
    <section className="wrap section">
      <SectionHeading label="Property & developments" title="Insights" action={<ButtonLink to="/insights" variant="outline">All Insights <ArrowRight size={16} /></ButtonLink>} />
      <div className="insight-grid">{guides.map((g) => <Link key={g.slug} to={`/insights/${g.slug}`} className="insight-card"><div className="insight-image"><Asset src={g.image} alt={g.title} /></div><div><small>{g.category}</small><h3>{g.title}</h3><ArrowUpRight size={18} /></div></Link>)}</div>
    </section>
    <section className="closing-cta">
      <div className="wrap">
        <div><span className="eyebrow">Contact ADB</span><h2>Discuss a project or property.</h2><p>Tell us what you have in mind and speak with our team.</p></div>
        <div className="actions"><ButtonLink to="/properties">Explore Properties <ArrowRight size={16} /></ButtonLink><ContactButton kind="advisor" variant="outline" /></div>
      </div>
    </section>
  </>
}
