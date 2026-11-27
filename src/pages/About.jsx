import { Building2, Compass, DraftingCompass } from 'lucide-react'
import { useSEO } from '../utils/useSEO'
import { team, ceo } from '../data/team'
import { COMPANY } from '../config'
import { INTRO, VISION, MISSION } from '../data/text'
import { PageHero, Breadcrumbs, SectionHeading, Asset, ButtonLink } from '../components/ui'
export default function About() {
  useSEO('About Us', 'Company background, vision, mission, CEO message and team at Ahmad Developers & Builders.')
  return <>
    <PageHero label="The company" title="About ADB" text="Construction, real estate development and architectural design in Pakistan."><Breadcrumbs items={[['About Us']]} /></PageHero>
    <section className="wrap section split">
      <div className="editorial-photo"><Asset src="/adb/office.jpg" alt="Building with ADB and Regal City signage" /></div>
      <div className="editorial-copy"><span className="eyebrow">Company profile</span><h2>Ahmad Developers & Builders</h2><p>{INTRO}</p>
        <p>Licence No. {COMPANY.licence}. ADB started development work at Regal City, Sheikhupura, in October 2021. Its services include planning, architecture, construction and finishing.</p>
        <dl className="statement-list" id="vision-mission"><div><dt>Our vision</dt><dd>{VISION}</dd></div><div><dt>Our mission</dt><dd>{MISSION}</dd></div></dl></div>
    </section>
    <section className="paper-band" id="core-values"><div className="wrap section">
      <SectionHeading label="Philosophy & values" title="Core Values" text="Quality, innovation, disciplined construction and client satisfaction." />
      <div className="approach-grid">
        <article><Compass /><h3>Quality & innovation</h3><p>Recognized for quality and innovation in construction.</p></article>
        <article><DraftingCompass /><h3>Discipline</h3><p>Discipline is the most important thing ADB follows in construction.</p></article>
        <article><Building2 /><h3>Customer satisfaction</h3><p>Our goal is always 100% customer satisfaction.</p></article></div>
    </div></section>
    <section className="wrap section leadership-strip" id="leadership">
      <div className="founder-photo"><Asset src={ceo.photo} alt={`${ceo.name}, ${ceo.title}`} /></div>
      <div className="editorial-copy"><span className="eyebrow">CEO message</span><h2>{ceo.name}</h2><p><strong>{ceo.title}</strong></p>
        <p>From the day of establishment, our goal is always “100% Customer Satisfaction”, and as a reliable partner for construction, we are providing the best facilities in construction.</p>
        <p>ADB gets the perspective of customers and takes a step closer, to support bigger dreams and higher value of customers.</p>
        <p>I say proudly that we are found as a preferred and competitive company by our clients, and the responsibility of this is so important for our company. I would like to thank all of them again.</p></div>
    </section>
    <section className="paper-band" id="team"><div className="wrap section">
      <SectionHeading label="Our people" title="Meet the Team" text="Coming together is a beginning. Keeping together is progress. Working together is success." />
      <div className="team-grid">{team.map((m) => <article className="team-card" key={m.name}><div><Asset src={m.photo} alt={m.name} /></div><h2>{m.name}</h2><p>{m.role}</p></article>)}</div>
    </div></section>
  </>
}
