import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, Expand, Play } from 'lucide-react'
import Modal from './Modal'
import { Asset, EmptyState } from './ui'
import { parseVideo } from '../utils/video'
export function PhotoGallery({ images, name, fit }) {
  const [i, setI] = useState(0), [open, setOpen] = useState(false), sx = useRef(null)
  const n = images.length
  if (!n) return <EmptyState title="Photography pending" text="ADB will supply approved photographs for this gallery." />
  const move = (d) => setI((x) => (x + d + n) % n)
  const arrows = n > 1 && <>
    <button type="button" className="gallery-arrow previous" onClick={() => move(-1)} aria-label="Previous image"><ChevronLeft /></button>
    <button type="button" className="gallery-arrow next" onClick={() => move(1)} aria-label="Next image"><ChevronRight /></button></>
  return (
    <div className="photo-gallery"><figure>
      <div className="gallery-stage" onTouchStart={(e) => { sx.current = e.touches[0].clientX }}
        onTouchEnd={(e) => { const x = e.changedTouches[0].clientX; if (sx.current !== null && Math.abs(sx.current - x) > 48) move(sx.current > x ? 1 : -1); sx.current = null }}>
        <Asset src={images[i]} alt={`${name}, image ${i + 1}`} fit={fit} eager />{arrows}
        <button type="button" className="gallery-expand" onClick={() => setOpen(true)} aria-label="Open full-screen image"><Expand size={18} /></button>
      </div></figure>
      {n > 1 && <div className="thumbnails" aria-label="Select gallery image">{images.map((s, k) =>
        <button key={s + k} type="button" aria-pressed={i === k} aria-label={`View image ${k + 1}`} onClick={() => setI(k)}><Asset src={s} fit={fit} /></button>)}</div>}
      <Modal title={`Photo gallery · ${i + 1} / ${n}`} open={open} onClose={() => setOpen(false)} className="lightbox"
        onKeyDown={(e) => { if (n > 1 && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) { e.preventDefault(); move(e.key === 'ArrowLeft' ? -1 : 1) } }}>
        <div className="lightbox-image"><Asset src={images[i]} alt={`${name}, image ${i + 1}`} fit="contain" />{arrows}</div>
      </Modal>
    </div>)
}
function Player({ url, k }) {
  const v = parseVideo(url), [play, setPlay] = useState(false)
  if (!v) return <article className="video-item"><div className="video-frame"><span className="preview-image"><small>Video unavailable</small></span></div></article>
  const src = v.type === 'youtube' ? `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1` : `https://player.vimeo.com/video/${v.id}?autoplay=1`
  return <article className="video-item"><div className="video-frame">
    {!play ? <button type="button" className="video-poster" onClick={() => setPlay(true)} aria-label={`Play video ${k + 1}`}
        style={v.thumb ? { backgroundImage: `url(${v.thumb})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}>
        <span className="play-badge"><Play fill="currentColor" size={24} /></span></button>
      : v.type === 'mp4' ? <video src={v.src} controls autoPlay playsInline preload="none" />
      : <iframe title={`Property video ${k + 1}`} src={src} allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowFullScreen />}
  </div></article>
}
export const VideoGallery = ({ videos }) => !videos?.length ? null :
  <section className="detail-section"><h2>Video Tour</h2><div className="video-grid">{videos.map((u, k) => <Player key={u + k} url={u} k={k} />)}</div></section>
