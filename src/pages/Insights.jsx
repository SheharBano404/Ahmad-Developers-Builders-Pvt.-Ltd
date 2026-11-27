import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useSEO } from '../utils/useSEO'
import { guides } from '../data/insights'
import { PageHero, Breadcrumbs, Asset } from '../components/ui'
export default function Insights() {
  useSEO('Insights', 'Guides and updates about ADB projects and properties.')
  return <>
    <PageHero label="Property & developments" title="Insights" text="Guides and updates about ADB projects and properties."><Breadcrumbs items={[['Insights']]} /></PageHero>
    <section className="wrap section compact insight-grid">
      {guides.map((g) => <Link key={g.slug} to={`/insights/${g.slug}`} className="insight-card"><div className="insight-image"><Asset src={g.image} alt={g.title} /></div>
        <div><small>{g.category}</small><h2>{g.title}</h2><ArrowRight size={18} /></div></Link>)}
    </section></>
}
