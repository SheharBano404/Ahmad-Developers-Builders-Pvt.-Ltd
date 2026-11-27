import { useSEO } from '../utils/useSEO'
import { services } from '../data/services'
import { PageHero, Breadcrumbs, Asset, ButtonLink } from '../components/ui'
export default function Services() {
  useSEO('Our Services', 'Planning, development, architecture, construction and related ADB services.')
  return <>
    <PageHero label="What we do" title="Our Services" text="Services documented in the ADB company profile."><Breadcrumbs items={[['Services']]} /></PageHero>
    <section className="wrap section compact">
      <div className="service-page-grid">{services.map(([t, d]) => <article className="service-page-card" key={t}><div><Asset src="" alt={t} /></div><h2>{t}</h2><p>{d}</p></article>)}</div>
      <div className="inline-cta"><h2>Discuss your requirements</h2><ButtonLink to="/contact">Contact ADB</ButtonLink></div>
    </section>
  </>
}
