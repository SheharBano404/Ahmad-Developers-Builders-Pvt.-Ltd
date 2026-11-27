import { useEffect } from 'react'
export function useSEO(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | Ahmad Developers & Builders` : 'Ahmad Developers & Builders Pvt. Ltd.'
    const m = document.querySelector('meta[name="description"]')
    if (m && description) m.setAttribute('content', description)
    if (!window.location.hash) document.getElementById('public-scrollport')?.scrollTo({ top: 0, behavior: 'instant' })
  }, [title, description])
}
