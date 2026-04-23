import { useStore } from '../state/store'
import { toRgb, toRgba, textColor } from '../utils'

export default function CountryHeader() {
  const { country, flagColors } = useStore()
  if (!country) return null

  const c0 = flagColors?.[0]
  const headerBg     = c0 ? toRgb(c0) : 'var(--terra)'
  const headerShadow = c0 ? `0 8px 30px ${toRgba(c0, 0.4)}` : '0 8px 30px rgba(196,98,45,0.3)'
  const nameColor    = c0 ? textColor(c0.r, c0.g, c0.b) : 'var(--cream)'
  const subColor     = nameColor === '#FFFDF8' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)'

  return (
    <div className="country-header animate-fadeUp"
      style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderRadius: '20px', padding: '1.75rem 2rem', marginBottom: '1.25rem', background: headerBg, boxShadow: headerShadow }}>
      <div className="flag-frame"
        style={{ flexShrink: 0, width: 100, height: 66, borderRadius: 10, overflow: 'hidden', border: '3px solid rgba(255,255,255,0.25)', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
        <img src={country.flagUrl} alt={`Drapeau ${country.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
      </div>
      <div style={{ flex: 1 }}>
        <div className="country-name" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2.2rem', color: nameColor, lineHeight: 1.05, marginBottom: '0.4rem' }}>
          {country.name}
        </div>
        <div className="country-official" style={{ fontSize: '0.8rem', color: subColor, fontWeight: 300 }}>{country.official}</div>
        <div className="country-badges" style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem', flexWrap: 'wrap' }}>
          <span className="badge" style={{ background: 'var(--sun)', color: 'var(--dark)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.22rem 0.65rem', borderRadius: 20 }}>{country.isoCode}</span>
          <span className="badge" style={{ background: '#5E9E74', color: 'white', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.22rem 0.65rem', borderRadius: 20 }}>{country.region}</span>
          {country.subregion !== '—' && (
            <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,253,248,0.85)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.22rem 0.65rem', borderRadius: 20 }}>{country.subregion}</span>
          )}
        </div>
      </div>
    </div>
  )
}
