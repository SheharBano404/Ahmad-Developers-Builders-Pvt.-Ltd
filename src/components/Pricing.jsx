import { useState } from 'react'
import { Wallet } from 'lucide-react'
import Modal from './Modal'
import { useCurrency, CURRENCIES } from '../utils/currency'
import { waLink, propertyMessage } from '../utils/whatsapp'
import { ButtonLink } from './ui'
export default function PricingButton({ property }) {
  const [open, setOpen] = useState(false)
  const { currency, setCurrency, format, status, updated, stale } = useCurrency()
  const shown = format(property.pricePKR)
  return <>
    <button type="button" className="button button-outline price-trigger" onClick={() => setOpen(true)}><Wallet size={16} /> See Pricing</button>
    <Modal title="Property pricing" open={open} onClose={() => setOpen(false)}>
      <p className="muted">{property.name} · {property.ref}</p>
      {property.isSample && <p className="notice">Sample price for interface demonstration only.</p>}
      <fieldset className="currency-grid" style={{ border: 0, padding: 0, marginInline: 0 }}><legend className="sr-only">Display currency</legend>
        {Object.entries(CURRENCIES).map(([code, c]) => (
          <label key={code} className={code === currency ? 'selected' : ''}>
            <input type="radio" name="cur" checked={code === currency} onChange={() => setCurrency(code)} /><span>{c.label}</span></label>))}
      </fieldset>
      <div className="price-answer" aria-live="polite">
        <small>{currency}</small>
        <strong>{currency !== 'PKR' && status === 'loading' && !shown ? 'Loading rates…' : shown || 'Conversion temporarily unavailable'}</strong>
        {currency !== 'PKR' && <span>Original price: {format(property.pricePKR, 'PKR')}</span>}
        {currency !== 'PKR' && shown && <span>Exchange rates updated: {updated ? new Date(updated).toLocaleString() : 'unavailable'}{stale ? ' (could not refresh, showing last saved rates)' : ''}</span>}
        {currency !== 'PKR' && !shown && status === 'error' && <span>Live exchange rates could not be loaded. The original PKR price is shown above.</span>}
      </div>
      <p className="fine-print">Converted amounts are approximate. The original price is in PKR. Please confirm final pricing with ADB.</p>
      <div className="modal-actions">
        <a className="button button-primary" href={waLink(propertyMessage(property))} target="_blank" rel="noreferrer">Enquire on WhatsApp</a>
        <ButtonLink to="/contact" variant="outline" onClick={() => setOpen(false)}>Contact ADB</ButtonLink>
      </div>
    </Modal>
  </>
}
