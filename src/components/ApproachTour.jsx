import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const motionQuery = '(prefers-reduced-motion: reduce)'
const captions = [
  [0, 'Living room', 'Floor plan'],
  [1.4, 'Living room', 'Walls & ceilings'],
  [3.6, 'Living room', 'Flooring & glazing'],
  [5.15, 'Living room', 'Joinery & furnishings'],
  [7.32, 'Kitchen', 'Layout & floor plan'],
  [9.2, 'Kitchen', 'Walls & floor finishes'],
  [11.0, 'Kitchen', 'Cabinetry & appliances'],
  [13.1, 'Kitchen', 'Dining & lighting'],
  [14.65, 'Bedroom', 'Floor plan'],
  [16.2, 'Bedroom', 'Wall & ceiling finishes'],
  [18.4, 'Bedroom', 'Flooring & glazing'],
  [19.9, 'Bedroom', 'Joinery & furnishings'],
  [22.15, 'Bathroom', 'Layout & stone finishes'],
  [24.3, 'Bathroom', 'Flooring & fixtures'],
  [26.3, 'Bathroom', 'Vanity & lighting'],
  [28.15, 'Pool', 'Site plan & groundwork'],
  [30.25, 'Pool', 'Patio & pool finishes'],
  [33.15, 'Garden', 'Planting & landscaping'],
]

function captionAt(time) {
  let index = captions.length - 1
  while (index > 0 && time < captions[index][0]) index -= 1
  return index
}

function fitLine(line) {
  line.style.removeProperty('--tour-fit-size')
  const range = document.createRange()
  range.selectNodeContents(line)
  const textWidth = range.getBoundingClientRect().width
  const available = line.clientWidth - 0.5
  if (available <= 0 || textWidth <= available) return
  const fontSize = Number.parseFloat(getComputedStyle(line).fontSize)
  line.style.setProperty('--tour-fit-size', `${fontSize * available / textWidth}px`)
}

export default function ApproachTour() {
  const track = useRef(null)
  const stage = useRef(null)
  const video = useRef(null)
  const titleLine = useRef(null)
  const detailLine = useRef(null)
  const [caption, setCaption] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia(motionQuery).matches)
  const [unavailable, setUnavailable] = useState(false)
  const scrub = !reducedMotion && !unavailable
  const [, room, detail] = captions[caption]

  useLayoutEffect(() => {
    const title = titleLine.current
    const detail = detailLine.current
    const fit = () => { fitLine(title); fitLine(detail) }
    let mounted = true
    const resize = new ResizeObserver(fit)
    resize.observe(title.parentElement)
    resize.observe(detail.parentElement)
    fit()
    document.fonts.ready.then(() => { if (mounted) fit() })
    return () => { mounted = false; resize.disconnect() }
  }, [])

  useLayoutEffect(() => { fitLine(detailLine.current) }, [detail])

  useEffect(() => {
    const preference = window.matchMedia(motionQuery)
    const update = () => setReducedMotion(preference.matches)
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!scrub) return
    const scrollport = document.getElementById('public-scrollport')
    if (!scrollport) return

    const section = track.current
    const panel = stage.current
    const media = video.current
    let frame = 0
    let travel = 0

    const update = () => {
      frame = 0
      if (travel <= 0) return

      const offset = scrollport.getBoundingClientRect().top - section.getBoundingClientRect().top
      section.toggleAttribute('data-presenting', offset >= -1 && offset <= travel + 1)
      if (!Number.isFinite(media.duration) || media.seeking) return
      const progress = Math.min(1, Math.max(0, offset / travel))
      const time = progress * Math.max(0, media.duration - 0.04)
      // Seek to the newest scroll position as soon as the current seek finishes.
      const difference = time - media.currentTime
      if (Math.abs(difference) <= 0.024) return
      const step = Math.min(Math.abs(difference), Math.max(1 / 30, Math.abs(difference) * 0.35))
      media.currentTime += Math.sign(difference) * step
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const measure = () => {
      travel = section.offsetHeight - panel.offsetHeight
      schedule()
    }

    const resize = new ResizeObserver(measure)
    resize.observe(section)
    resize.observe(panel)
    const nearby = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      media.preload = 'auto'
      nearby.disconnect()
    }, { root: scrollport, rootMargin: '1500px 0px' })
    nearby.observe(section)

    scrollport.addEventListener('scroll', schedule, { passive: true })
    media.addEventListener('loadedmetadata', schedule)
    media.addEventListener('seeked', schedule)
    measure()

    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      nearby.disconnect()
      section.removeAttribute('data-presenting')
      scrollport.removeEventListener('scroll', schedule)
      media.removeEventListener('loadedmetadata', schedule)
      media.removeEventListener('seeked', schedule)
    }
  }, [scrub])

  function updateCaption(event) {
    const media = event.currentTarget
    if (!media.seeking) setCaption(captionAt(media.currentTime))
  }

  return <section ref={track} className="approach-tour" data-scrub={scrub || undefined} aria-labelledby="approach-tour-title">
    <div ref={stage} className="approach-tour-stage">
      <div className="approach-tour-frame">
        <video
          key={reducedMotion ? 'playback' : 'scrub'}
          ref={video}
          className="approach-tour-media"
          poster="/adb/approach-tour-poster.jpg"
          width="1696"
          height="960"
          preload="metadata"
          playsInline
          muted
          controls={reducedMotion}
          aria-label="A blueprint-to-finish tour of the living room, kitchen, bedroom, bathroom, pool and garden"
          onError={() => setUnavailable(true)}
          onLoadedMetadata={updateCaption}
          onSeeked={updateCaption}
          onTimeUpdate={updateCaption}
        >
          {!reducedMotion && <source src="/adb/approach-tour-scroll-hd.webm" type="video/webm" />}
          <source src="/adb/approach-tour.mp4" type="video/mp4" />
        </video>
        <h2 id="approach-tour-title" className="approach-tour-title"><span ref={titleLine}>From Blueprint to Finish</span></h2>
        <div className="approach-tour-caption"><strong>{room}</strong><span ref={detailLine}>{detail}</span></div>
      </div>
    </div>
  </section>
}
