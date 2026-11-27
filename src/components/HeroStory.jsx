import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from './ui'
import HeroScrollLink from './HeroScrollLink'
import { easeBetween, planCrop, projectPlan } from '../utils/heroPlan'

const mediaPath = '/adb/hero-frames'
const motionQuery = '(prefers-reduced-motion: reduce)'
const scrubFraction = 0.72
const headline = ['Developing places', 'Building for the future']
const constructionStages = [
  { file: 'foundation.jpg', start: 0.11, end: 0.23 },
  { file: 'ground-floor.jpg', start: 0.27, end: 0.38, rise: true },
  { file: 'structural-frame.jpg', start: 0.42, end: 0.52, rise: true },
  { file: 'exterior-shell.jpg', start: 0.54, end: 0.65, rise: true },
  { file: 'architectural-model.jpg', start: 0.69, end: 0.78 },
]

function storyDistance(track, stage) {
  return (track.offsetHeight - stage.offsetHeight) * scrubFraction
}

export default function HeroStory() {
  const story = useRef(null)
  const stage = useRef(null)
  const plan = useRef(null)
  const stageImages = useRef([])
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia(motionQuery).matches)
  const [mediaUnavailable, setMediaUnavailable] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const isStatic = reducedMotion || mediaUnavailable
  const phase = isStatic || revealed ? 'final' : 'intro'

  useEffect(() => {
    const intro = document.getElementById('site-intro')
    if (!intro) return

    const firstFrame = stage.current.querySelector(isStatic ? '.hero-frame-final' : '.hero-frame-blueprint')
    let mounted = true
    const ready = () => { if (mounted) intro.dispatchEvent(new Event('hero-ready')) }
    firstFrame.decode().then(ready, ready)
    return () => { mounted = false }
  }, [isStatic])

  useEffect(() => {
    const preference = window.matchMedia(motionQuery)
    const update = () => setReducedMotion(preference.matches)
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (isStatic) return

    const scrollport = document.getElementById('public-scrollport')
    const track = story.current
    const viewport = stage.current
    if (!scrollport) {
      setMediaUnavailable(true)
      return
    }

    let request = 0
    let final = false
    let distance = storyDistance(track, viewport)
    let { clientWidth: width, clientHeight: height } = viewport
    const desktop = window.matchMedia('(min-width: 769px)')

    function schedule() {
      if (!request) request = requestAnimationFrame(update)
    }

    function update() {
      request = 0
      const position = scrollport.getBoundingClientRect().top - track.getBoundingClientRect().top
      const progress = Math.max(0, Math.min(1, position / Math.max(1, distance)))
      const zoom = 1 + Math.sin(progress * Math.PI) * 0.018
      const planOpacity = easeBetween(progress, 0.025, 0.065) * (1 - easeBetween(progress, 0.195, 0.25))
      const blueprintOpacity = 1 - easeBetween(progress, 0.04, 0.135)
      viewport.style.setProperty('--hero-blueprint-opacity', blueprintOpacity)
      plan.current.style.opacity = planOpacity
      if (planOpacity > 0 && width > 0 && height > 0) {
        const tilt = easeBetween(progress, 0.035, 0.21)
        plan.current.style.transform = projectPlan(tilt, width, height, desktop.matches, desktop.matches ? zoom : 1)
      }
      constructionStages.forEach(({ start, end, rise }, index) => {
        const image = stageImages.current[index]
        if (!image) return
        const reveal = easeBetween(progress, start, end)
        image.style.opacity = rise ? Math.min(1, reveal * 4) : reveal
        if (rise) {
          image.style.setProperty('--hero-stage-solid', `${-18 + reveal * 118}%`)
          image.style.setProperty('--hero-stage-edge', `${reveal * 118}%`)
        }
      })

      const renderReveal = easeBetween(progress, 0.82, 0.98)
      viewport.style.setProperty('--hero-render-opacity', easeBetween(progress, 0.81, 0.89))
      viewport.style.setProperty('--hero-render-solid', `${-24 + renderReveal * 124}%`)
      viewport.style.setProperty('--hero-render-edge', `${renderReveal * 124}%`)
      viewport.style.setProperty('--hero-zoom', zoom)

      const atEnd = progress === 1
      if (atEnd !== final) {
        final = atEnd
        setRevealed(atEnd)
      }
    }

    const observer = new ResizeObserver(() => {
      distance = storyDistance(track, viewport)
      width = viewport.clientWidth
      height = viewport.clientHeight
      schedule()
    })
    observer.observe(track)
    observer.observe(viewport)
    scrollport.addEventListener('scroll', schedule, { passive: true })
    setRevealed(false)
    schedule()

    return () => {
      cancelAnimationFrame(request)
      scrollport.removeEventListener('scroll', schedule)
      observer.disconnect()
    }
  }, [isStatic])

  function scrollToReveal() {
    const scrollport = document.getElementById('public-scrollport')
    if (!scrollport) return
    const top = scrollport.scrollTop + story.current.getBoundingClientRect().top - scrollport.getBoundingClientRect().top
    scrollport.scrollTo({ top: Math.ceil(top + storyDistance(story.current, stage.current)), behavior: 'smooth' })
  }

  return <section ref={story} className="hero-story" data-phase={phase} data-static={isStatic || undefined} aria-labelledby="hero-title">
    <div ref={stage} className="hero">
      <div className="hero-visual" aria-hidden="true">
        {!isStatic && <>
          <img className="hero-frame hero-frame-blueprint" src={`${mediaPath}/blueprint.jpg`} alt="" onError={() => setMediaUnavailable(true)} />
          {constructionStages.map(({ file, rise }, index) => <img
            key={file}
            ref={(image) => { stageImages.current[index] = image }}
            className={`hero-frame hero-frame-stage${rise ? ' hero-frame-rise' : ''}`}
            src={`${mediaPath}/${file}`}
            alt=""
            onError={() => setMediaUnavailable(true)}
          />)}
          <div className="hero-plan" ref={plan} style={{ width: planCrop.width, height: planCrop.height, backgroundPosition: `-${planCrop.x}px -${planCrop.y}px` }} />
        </>}
        <img className="hero-frame hero-frame-final" src={`${mediaPath}/final-enhanced.jpg`} alt="" />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="wrap hero-inner" id="hero-content">
        <p className="hero-company hero-support">WE BUILD YOUR DREAMS</p>
        <h1 id="hero-title" aria-label={headline.join(' ')}>
          {headline.map((line, index) => <span key={line} className="hero-line" aria-hidden="true">
            {[...line].map((character, offset) => <span key={offset} className="hero-letter" style={{ '--letter-delay': `${(index === 0 ? 85 : 520) + offset * 21}ms` }}>{character}</span>)}
          </span>)}
        </h1>
        <p className="hero-support">Explore our construction, real estate development and architectural design portfolio in Pakistan.</p>
        <div className="actions hero-actions">
          <ButtonLink to="/properties">Explore Properties <ArrowRight size={17} /></ButtonLink>
          <ButtonLink to="/about#leadership" variant="outline">A Message from the CEO</ButtonLink>
        </div>
      </div>
      <HeroScrollLink onIntroExplore={phase === 'intro' ? scrollToReveal : undefined} />
    </div>
  </section>
}
