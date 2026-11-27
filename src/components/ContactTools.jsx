import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MessageCircle, Send, Sparkles, UserRound } from 'lucide-react'
import Modal from './Modal'
import { COMPANY } from '../config'
import { projects } from '../data/projects'
import { properties } from '../data/properties'
import { INTRO } from '../data/text'
import { waLink } from '../utils/whatsapp'

const Ctx = createContext(() => {})
const first = [{ role: 'assistant', text: 'Hello. Ask me about ADB’s services, projects or how to see property pricing.' }]
const suggestions = ['Explore ADB projects', 'How do I see pricing?', 'Consultancy aur services?']

// Scripted answers (no AI service is connected).
function answer(t) {
  if (/[؀-ۿ]/.test(t)) {
    if (/قیمت|بجٹ|پاؤنڈ/.test(t)) return 'قیمت دیکھنے کے لیے پراپرٹی پر See Pricing منتخب کریں اور اپنی کرنسی چنیں۔'
    if (/رابط/.test(t)) return `آپ رابطہ صفحہ دیکھ سکتے ہیں یا ${COMPANY.email} پر ای میل کر سکتے ہیں۔`
    return 'ADB تعمیرات، ٹاؤن پلاننگ اور آرکیٹیکچرل ڈیزائن کی خدمات پیش کرتا ہے۔ منصوبوں کی تفصیلات کے لیے Projects صفحہ دیکھیں۔'
  }
  if (/\b(kaise|kya|kahan|mein|kitni|aur|bata|mujhe|hai)\b/i.test(t)) {
    if (/price|qeemat|kitni|budget/i.test(t)) return 'Property par See Pricing dabayen aur PKR, GBP, USD ya AED chunein. Final qeemat ADB se confirm karein.'
    return 'ADB town planning, construction, consultancy aur architectural design ki services deta hai. Portfolio dekhne ke liye Projects kholein.'
  }
  if (/price|currency|budget|pkr|usd|aed|gbp/i.test(t)) return 'Open any property and press See Pricing, then choose PKR, GBP, USD or AED. Converted prices are approximate; please confirm final pricing with ADB.'
  if (/contact|advisor|whatsapp|phone|office/i.test(t)) return `You can use the Contact page, WhatsApp, or email ${COMPANY.email}.`
  if (/project|regal|heights|villa|homes|available|listing|apartment/i.test(t)) return 'ADB has worked on Regal City development and offers residential and mixed-use projects. Explore the projects below.'
  if (/adb|services|about|construction|consult/i.test(t)) return `${INTRO} See Services for the full list.`
  return 'I can answer common questions about ADB, its projects and pricing. For anything else, please contact the team.'
}

export const useContact = () => useContext(Ctx)
export function ContactButton({ kind, subject, beforeOpen, className = '', label, variant = 'primary' }) {
  const open = useContact()
  if (kind === 'whatsapp')
    return <a className={`button button-outline ${className}`} target="_blank" rel="noreferrer"
      href={waLink(subject ? `Hello ADB, I would like to enquire about ${subject}.` : 'Hello ADB, I would like more information.')}><MessageCircle size={16} /> {label || 'WhatsApp'}</a>
  return <button type="button" className={`button button-${variant} ${className}`} onClick={() => { beforeOpen?.(); open({ kind, subject }) }}><UserRound size={16} /> Contact Advisor</button>
}

export default function ContactTools({ children }) {
  const { pathname } = useLocation()
  const [active, setActive] = useState(null), [messages, setMessages] = useState(first), [input, setInput] = useState('')
  const [typing, setTyping] = useState(false), [enquiry, setEnquiry] = useState(false)
  const timer = useRef(null), bottom = useRef(null)
  const ctxP = properties.find((p) => pathname === `/properties/${p.id}`), ctxJ = projects.find((p) => pathname === `/projects/${p.id}`)
  const context = active?.subject ?? ctxP?.name ?? ctxJ?.name
  const open = (c) => { setEnquiry(false); setActive(c) }
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => { bottom.current?.scrollIntoView({ block: 'nearest' }) }, [messages, typing])
  function send(v) {
    const text = v.trim(); if (!text || typing) return
    setMessages((o) => [...o, { role: 'visitor', text }]); setInput(''); setTyping(true)
    timer.current = setTimeout(() => { setMessages((o) => [...o, { role: 'assistant', text: answer(text) }]); setTyping(false) }, 450)
  }
  const showProjects = messages.length > 1 && /projects?|portfolio|listing/i.test(messages.at(-1)?.text ?? '')
  return (
    <Ctx.Provider value={open}>
      {children}
      <div className="floating-contact" role="group" aria-label="Quick contact">
        <button type="button" className="float-button floating-ai" onClick={() => open({ kind: 'advisor' })} aria-label="Open ADB Property Advisor">
          <img src="/contact/property-advisor.png" alt="" /><span className="float-label" aria-hidden="true">Contact ADB Advisor</span></button>
        <a className="float-button floating-whatsapp" href={waLink(context ? `Hello ADB, I would like to enquire about ${context}.` : 'Hello ADB, I would like more information.')} target="_blank" rel="noreferrer" aria-label="Chat with ADB on WhatsApp">
          <img src="/contact/whatsapp.png" alt="" /><span className="float-label" aria-hidden="true">Contact ADB Team</span></a>
      </div>
      <Modal title="ADB Property Advisor" open={active?.kind === 'advisor'} onClose={() => setActive(null)} className="chat-dialog">
        <div className="chat-meta"><Sparkles size={14} /> Quick answers, scripted replies{context && <span> · {context}</span>}</div>
        <div className="chat-history" role="log" aria-live="polite">
          {messages.map((m, i) => <p key={i} className={`chat-message ${m.role}`} dir="auto">{m.text}</p>)}
          {showProjects && <div className="chat-results">{projects.slice(0, 3).map((p) => <Link key={p.id} onClick={() => setActive(null)} to={`/projects/${p.id}`}>{p.name}</Link>)}</div>}
          {typing && <p className="chat-message assistant">Typing…</p>}<div ref={bottom} />
        </div>
        <div className="chat-suggestions">{suggestions.map((t) => <button type="button" key={t} disabled={typing} onClick={() => send(t)}>{t}</button>)}</div>
        <form className="chat-form" onSubmit={(e) => { e.preventDefault(); send(input) }}>
          <label className="sr-only" htmlFor="advisor-input">Ask a question</label>
          <input id="advisor-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about ADB" autoComplete="off" />
          <button className="icon-button" aria-label="Send message" type="submit" disabled={typing || !input.trim()}><Send size={18} /></button>
        </form>
        <div className="chat-footer">
          <button type="button" className="text-button" onClick={() => setEnquiry((x) => !x)}>Contact advisor</button>
          <a className="text-button" target="_blank" rel="noreferrer" href={waLink(context ? `Hello ADB, I would like to enquire about ${context}.` : 'Hello ADB, I would like to speak with a property advisor.')}>WhatsApp</a>
        </div>
        {enquiry && <div className="contact-choices"><p>Send an enquiry to the ADB team.</p>
          <Link className="button button-primary" to={'/contact' + (context ? `?subject=${encodeURIComponent(context)}` : '')} onClick={() => setActive(null)}>Open enquiry form</Link></div>}
      </Modal>
    </Ctx.Provider>)
}
