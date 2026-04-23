import { useStore } from '../state/store'
import { fmt, toRgb, toRgba, textColor } from '../utils'

export default function StatGrid() {
  const { country, flagColors } = useStore()
  if (!country) return null
  const colors = flagColors || []
  const stats = [
    { icon: '🏙️', label: 'Capitale',    value: country.capital },
    { icon: '👥', label: 'Population',  value: fmt(country.population) },
    { icon: '🗺️', label: 'Superficie',  value: country.area ? fmt(Math.round(country.area)) + ' km²' : '—' },
  ]
  return (
    <div className="stat-grid animate-fadeUp-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1rem' }}>
      {stats.map((s, i) => {
        const c = colors[i]
        const bg = c ? toRgb(c) : 'var(--cream)'
        const shadow = c ? `0 6px 20px ${toRgba(c, 0.35)}` : '0 4px 16px rgba(44,36,22,0.07)'
        const tc = c ? textColor(c.r, c.g, c.b) : 'var(--text)'
        const lc = tc === '#FFFDF8' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.5)'
        return (
          <div key={s.label} className="stat-card" style={{ background: bg, boxShadow: shadow, borderRadius: 16, padding: '1.4rem 1.5rem', border: c ? 'none' : '1px solid rgba(196,98,45,0.15)' }}>
            <span className="stat-icon" style={{ fontSize: '1.4rem', marginBottom: '0.75rem', display: 'block' }}>{s.icon}</span>
            <div className="stat-label" style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: lc, marginBottom: '0.35rem' }}>{s.label}</div>
            <div className="stat-value" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.35rem', fontWeight: 700, color: tc }}>{s.value}</div>
          </div>
        )
      })}
    </div>
  )
}
