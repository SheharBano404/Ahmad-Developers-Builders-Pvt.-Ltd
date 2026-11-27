import { useSEO } from '../utils/useSEO'
import { projects } from '../data/projects'
import { PageHero, Breadcrumbs } from '../components/ui'
import { ProjectCard } from '../components/Cards'
export default function Projects() {
  useSEO('Projects', 'Regal City Development, ADB Heights, Kanal ADB Villa, 2 Kanal ADB Royal Classic Villa and ADB 100 Homes.')
  return <>
    <PageHero label="Development & design" title="Our Projects" text="Explore locations, development work and designs documented in the ADB company profile."><Breadcrumbs items={[['Projects']]} /></PageHero>
    <section className="wrap section compact"><div className="cards-grid">{projects.map((p) => <ProjectCard key={p.id} p={p} />)}</div></section>
  </>
}
