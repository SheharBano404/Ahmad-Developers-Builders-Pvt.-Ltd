import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { FX_URL, FX_CACHE_HOURS } from '../config'

export const CURRENCIES = {
  PKR: { label: 'PKR (Pakistani Rupee)', locale: 'en-PK' },
  GBP: { label: 'GBP (British Pound)', locale: 'en-GB' },
  USD: { label: 'USD (US Dollar)', locale: 'en-US' },
  AED: { label: 'AED (UAE Dirham)', locale: 'en-AE' },
}
const KEY = 'adb_fx_v1', PICK = 'adb_currency'
const Ctx = createContext(null)
export const useCurrency = () => useContext(Ctx)

const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) } catch { return null } }

export function CurrencyProvider({ children }) {
  const [currency, setCur] = useState(() => { try { return localStorage.getItem(PICK) || 'PKR' } catch { return 'PKR' } })
  const [fx, setFx] = useState(() => read())            // {rates, updated, fetched}
  const [status, setStatus] = useState('idle')          // idle | loading | ready | error

  const load = useCallback(async () => {
    const c = read()
    if (c && Date.now() - c.fetched < FX_CACHE_HOURS * 3600e3) { setFx(c); setStatus('ready'); return }
    setStatus('loading')
    try {
      const r = await fetch(FX_URL); if (!r.ok) throw new Error('http ' + r.status)
      const d = await r.json()
      const { GBP, USD, AED } = d.rates || {}
      if (!(GBP > 0 && USD > 0 && AED > 0)) throw new Error('bad data')
      const next = { rates: { PKR: 1, GBP, USD, AED }, updated: d.time_last_update_unix ? d.time_last_update_unix * 1000 : Date.now(), fetched: Date.now() }
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
      setFx(next); setStatus('ready')
    } catch {
      setStatus('error') // keep stale cache if any, but flag it
    }
  }, [])

  // Rates are only requested once a non-PKR currency is chosen.
  useEffect(() => { if (currency !== 'PKR') load() }, [currency, load])

  const setCurrency = (c) => { setCur(c); try { localStorage.setItem(PICK, c) } catch {} }

  // Returns formatted string, or null when conversion is unavailable. Original PKR is never changed.
  const format = (pkr, cur = currency) => {
    if (cur === 'PKR') return 'Rs. ' + Math.round(pkr).toLocaleString('en-PK')
    const rate = fx?.rates?.[cur]
    if (!rate) return null
    return new Intl.NumberFormat(CURRENCIES[cur].locale, { style: 'currency', currency: cur, maximumFractionDigits: 0 }).format(pkr * rate)
  }
  return <Ctx.Provider value={{ currency, setCurrency, format, status, updated: fx?.updated, stale: status === 'error' && !!fx }}>{children}</Ctx.Provider>
}
