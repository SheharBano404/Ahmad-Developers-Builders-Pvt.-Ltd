import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { useSEO } from '../utils/useSEO'
import { properties } from '../data/properties'
import { projects } from '../data/projects'
import { PageHero, Breadcrumbs, EmptyState } from '../components/ui'
import { PropertyCard } from '../components/Cards'
import { useCurrency, CURRENCIES } from '../utils/currency'
const init = { text: '', category: '', project: '', location: '' }
const PAGE = 6
export default function Properties() {
  useSEO('Properties', 'Explore ADB properties: apartments, villas, houses and plots.')
  const { currency, setCurrency } = useCurrency()
  const [draft, setDraft] = useState(init), [f, setF] = useState(init), [sort, setSort] = useState('featured'), [page, setPage] = useState(1)
  const cats = [...new Set(properties.map((p) => p.category))], locs = [...new Set(properties.map((p) => p.location))]
  const list = useMemo(() => {
    const q = f.text.trim().toLowerCase()
    const r = properties.filter((p) => (!q || `${p.name} ${p.location} ${p.category} ${p.ref}`.toLowerCase().includes(q)) &&
      (!f.category || p.category === f.category) && (!f.project || p.projectId === f.project) && (!f.location || p.location === f.location))
    return sort === 'name' ? [...r].sort((a, b) => a.name.localeCompare(b.name)) : sort === 'price' ? [...r].sort((a, b) => a.pricePKR - b.pricePKR) : r
  }, [f, sort])
  const pages = Math.max(1, Math.ceil(list.length / PAGE)), up = (k) => (e) => setDraft({ ...draft, [k]: e.target.value })
  return <>
    <PageHero label="Property collection" title="Explore Properties" text="Browse properties and use See Pricing to view the price in your preferred currency."><Breadcrumbs items={[['Properties']]} /></PageHero>
    <div className="wrap section catalogue">
      <form className="catalogue-form" onSubmit={(e) => { e.preventDefault(); setF(draft); setPage(1) }}>
        <div className="filter-grid">
          <label className="filter-search">Search<div><Search size={18} /><input type="search" placeholder="Name, category, location or reference" value={draft.text} onChange={up('text')} /></div></label>
          <label>Property type<select value={draft.category} onChange={up('category')}><option value="">All types</option>{cats.map((x) => <option key={x}>{x}</option>)}</select></label>
          <label>Project<select value={draft.project} onChange={up('project')}><option value="">All projects</option>{projects.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
          <label>Location<select value={draft.location} onChange={up('location')}><option value="">All locations</option>{locs.map((x) => <option key={x}>{x}</option>)}</select></label>
        </div>
        <div className="filter-actions"><button className="button button-primary" type="submit">Search properties</button>
          <button type="button" className="button button-outline" onClick={() => { setDraft(init); setF(init); setPage(1) }}>Reset filters</button></div>
      </form>
      <div className="result-toolbar">
        <span role="status">{list.length} {list.length === 1 ? 'listing' : 'listings'}</span>
        <div>
          <label>Currency<select value={currency} onChange={(e) => setCurrency(e.target.value)}>{Object.keys(CURRENCIES).map((c) => <option key={c}>{c}</option>)}</select></label>
          <label>Sort by<select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1) }}><option value="featured">Featured</option><option value="name">Name</option><option value="price">Price: low to high</option></select></label>
        </div>
      </div>
      {list.length ? <div className="cards-grid">{list.slice((page - 1) * PAGE, page * PAGE).map((p) => <PropertyCard key={p.id} p={p} />)}</div>
        : <EmptyState title="No listings match" text="Try a different filter or reset the search." />}
      {list.length > PAGE && <div className="pagination"><button type="button" className="button button-outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button><span>Page {page} of {pages}</span><button type="button" className="button button-outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button></div>}
    </div>
  </>
}
