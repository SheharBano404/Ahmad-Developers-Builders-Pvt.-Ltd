import { useEffect, useRef, useId } from 'react'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
export default function Modal({ title, open, onClose, children, className = '', onKeyDown }) {
  const ref = useRef(null), id = useId()
  useEffect(() => { const d = ref.current; if (!d) return; if (open && !d.open) d.showModal(); if (!open && d.open) d.close() }, [open])
  // Rendered in <body> so card styles (e.g. .property-actions a:hover) never leak into the dialog.
  return createPortal(
    <dialog ref={ref} aria-labelledby={id} className={`modal ${className}`} onKeyDown={onKeyDown}
      onCancel={(e) => { e.preventDefault(); onClose() }} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      {open && <div className="modal-body">
        <div className="modal-top"><h2 id={id}>{title}</h2><button className="icon-button" type="button" aria-label="Close dialog" onClick={onClose}><X size={21} /></button></div>
        {children}</div>}
    </dialog>, document.body)
}
