import { useParams } from 'react-router-dom'
import { useSEO } from '../utils/useSEO'
import { guides } from '../data/insights'
import { PageHero, Breadcrumbs, Asset, ButtonLink } from '../components/ui'
import NotFound from './NotFound'
export default function InsightDetail() {
  const g = guides.find((x) => x.slug === useParams().slug)
  useSEO(g?.title, g?.text)
  if (!g) return <NotFound />
  return <>
    <PageHero label={g.category} title={g.title}><Breadcrumbs items={[['Insights', '/insights'], [g.title]]} /></PageHero>
    <article className="wrap section compact article-copy"><div className="article-image"><Asset src={g.image} alt={g.title} /></div><p>{g.text}</p><ButtonLink to="/insights" variant="outline">Back to Insights</ButtonLink></article></>
}
