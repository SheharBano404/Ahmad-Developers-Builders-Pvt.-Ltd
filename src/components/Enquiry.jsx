import { useState } from 'react'
import { FORM_ENDPOINT, WHATSAPP_IS_PLACEHOLDER } from '../config'
import { waLink } from '../utils/whatsapp'
const empty = { name: '', email: '', phone: '', type: 'General enquiry', message: '' }
export default function Enquiry({ subject = '' }) {
  const [f, setF] = useState({ ...empty, message: subject ? `Enquiry about: ${subject}. ` : '' }), [err, setErr] = useState({}), [state, setState] = useState('idle')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const validate = () => {
    const e = {}
    if (f.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Please enter a valid email address.'
    if (!/^[+\d][\d\s-]{6,}$/.test(f.phone.trim())) e.phone = 'Please enter a valid phone number.'
    if (f.message.trim().length < 10) e.message = 'Please write at least 10 characters.'
    setErr(e); return !Object.keys(e).length
  }
  const submit = async (ev) => {
    ev.preventDefault(); if (!validate()) return
    if (!FORM_ENDPOINT) { window.open(waLink(`Hello ADB, my name is ${f.name}. ${f.type}: ${f.message} Phone: ${f.phone}. Email: ${f.email}.`), '_blank', 'noopener'); setState('wa'); return }
    setState('sending')
    try {
      const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...f, subject }) })
      if (!r.ok) throw new Error(); setState('ok'); setF(empty)
    } catch { setState('fail') }
  }
  const Field = ({ k, label, ...p }) => <label>{label}<input value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} {...p} />{err[k] && <span className="field-error" role="alert">{err[k]}</span>}</label>
  return (
    <form className="enquiry-form" onSubmit={submit} noValidate>
      <p className="muted">{FORM_ENDPOINT ? 'Send your enquiry to ADB.' : 'Your enquiry will open in WhatsApp so you can send it to ADB.'}{!FORM_ENDPOINT && WHATSAPP_IS_PLACEHOLDER && ' (WhatsApp number not configured yet.)'}</p>
      <div className="form-grid">
        {Field({ k: 'name', label: 'Name', autoComplete: 'name' })}{Field({ k: 'email', label: 'Email', type: 'email', autoComplete: 'email' })}
        {Field({ k: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel' })}
        <label>Enquiry type<select value={f.type} onChange={set('type')}>{['General enquiry', 'Property purchase', 'Project information', 'Construction / design services'].map((o) => <option key={o}>{o}</option>)}</select></label>
      </div>
      <label>Message<textarea rows="5" value={f.message} onChange={set('message')} aria-invalid={!!err.message} />{err.message && <span className="field-error" role="alert">{err.message}</span>}</label>
      <button type="submit" className="button button-primary" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : FORM_ENDPOINT ? 'Submit enquiry' : 'Send via WhatsApp'}</button>
      <div aria-live="polite">
        {state === 'ok' && <p className="notice">Thank you. Your enquiry has been sent to ADB.</p>}
        {state === 'wa' && <p className="notice">WhatsApp opened with your message. Press send there to deliver it.</p>}
        {state === 'fail' && <p className="field-error" role="alert">Sending failed. Please try again or use WhatsApp or email.</p>}
      </div>
    </form>)
}
