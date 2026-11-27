import { ArrowDown } from 'lucide-react'
const target = '#properties'
export default function HeroScrollLink({ onIntroExplore }) {
  function go(e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (onIntroExplore) {
      e.preventDefault()
      onIntroExplore()
      return
    }
    const el = document.querySelector(target); if (!el) return
    e.preventDefault()
    if (window.location.hash !== target) window.history.pushState(null, '', target)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ block: 'start', behavior: reduced ? 'instant' : 'smooth' })
  }
  return <a className="hero-scroll" href={onIntroExplore ? '#hero-content' : target} onClick={go}>Scroll to explore <ArrowDown size={15} aria-hidden="true" /></a>
}
