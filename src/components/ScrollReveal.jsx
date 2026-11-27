import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const content = [
  '.page-hero > .wrap > *', '.section-head > div > *', '.section-head > .button',
  '.editorial-photo', '.editorial-copy > *', '.founder-photo', '.approach-tour-lead',
  '.closing-cta .wrap > div:first-child > *', '.closing-cta .actions', '.inline-cta > *',
  '.cards-grid > *', '.service-grid > *', '.approach-grid > *',
  '.insight-grid > *', '.team-grid > *', '.service-page-grid > *',
  '.catalogue-form', '.result-toolbar', '.empty-state', '.pagination',
  '.detail-gallery', '.detail-section > *', '.contact-main > *', '.contact-panel > *',
  '.article-copy > *', '.wrap > .notice',
].map((selector) => `#main ${selector}`).concat(
  '.footer-brand > *', '.footer-links > *', '.footer-contact > *', '.footer-bottom',
).join(', ')

const bottomInset = 36

export default function ScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const scrollport = document.getElementById('public-scrollport')
    if (!scrollport || !window.IntersectionObserver || !Element.prototype.animate) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const animations = new Map()
    let observer
    let resultsObserver

    function cancelAnimations() {
      for (const animation of animations.values()) animation.cancel()
      animations.clear()
    }

    function stop() {
      observer?.disconnect()
      resultsObserver?.disconnect()
      cancelAnimations()
    }

    function start() {
      stop()
      if (motion.matches) return

      const outside = new WeakSet()
      const observed = new Set()
      const headerHeight = scrollport.querySelector('.site-header')?.offsetHeight ?? 0

      observer = new IntersectionObserver((entries) => {
        for (const { target, isIntersecting } of entries) {
          // Ignore intersection changes caused by the element's own lift.
          if (animations.has(target)) continue
          if (!isIntersecting) {
            outside.add(target)
            continue
          }

          // Leave content that's already in view alone until it exits and returns.
          if (!outside.delete(target) || target.contains(document.activeElement)) continue

          const animation = target.animate([
            { opacity: 0.12, translate: '0 20px' },
            { opacity: 1, translate: '0 0' },
          ], { duration: 620, easing: 'cubic-bezier(.22, .68, .36, 1)' })
          animations.set(target, animation)
          animation.onfinish = () => {
            animations.delete(target)
            const { top, bottom } = target.getBoundingClientRect()
            const viewport = scrollport.getBoundingClientRect()
            if (bottom < viewport.top + headerHeight || top > viewport.bottom - bottomInset) {
              outside.add(target)
            }
          }
        }
      }, { root: scrollport, rootMargin: `-${headerHeight}px 0px -${bottomInset}px 0px` })

      function observeContent() {
        for (const element of observed) {
          if (element.isConnected) continue
          observer.unobserve(element)
          observed.delete(element)
          animations.get(element)?.cancel()
          animations.delete(element)
        }
        for (const element of scrollport.querySelectorAll(content)) {
          if (observed.has(element)) continue
          observed.add(element)
          observer.observe(element)
        }
      }

      observeContent()
      const catalogue = scrollport.querySelector('.catalogue')
      if (catalogue) {
        resultsObserver = new MutationObserver(observeContent)
        resultsObserver.observe(catalogue, { childList: true, subtree: true })
      }
    }

    function showFocusedContent({ target }) {
      for (const [element, animation] of animations) {
        if (!element.contains(target)) continue
        animation.cancel()
        animations.delete(element)
      }
    }

    start()
    motion.addEventListener('change', start)
    scrollport.addEventListener('focusin', showFocusedContent)
    return () => {
      stop()
      motion.removeEventListener('change', start)
      scrollport.removeEventListener('focusin', showFocusedContent)
    }
  }, [pathname])

  return null
}
