import { useStore } from '../state/store'
import { toRgb, toRgba } from '../utils'

export default function InfoRow() {
  const { country, flagColors } = useStore()
  if (!country) return null
  const colors = flagColors || []
  const infos = [
    { icon: '🗣️', label: 'Langue(s)',       value: country.languages },
    { icon: '💰', label: 'Monnaie',          value: country.currency },
    { icon: '📞', label: 'Indicatif',        value: country.dialCode },
    { icon: '🌐', label: 'Domaine internet', value: country.tld },
    { icon: '🚦', label: 'Conduite',         value: country.driveSide },
    { icon: '🌍', label: 'Région',           value: country.region + (country.subregion !== '—' ? ' — ' + country.subregion : '') },
    { icon: '⏰', label: 'Fuseau horaire',   value: country.timezones[0] ?? '—' },
    { icon: '🏝️', label: 'Continent(s)',     value: country.continents.join(', ') || '—' },
  ]
  const cycle = [0, 1, 2, 0, 1, 2, 0, 1]
  return (
    <div className="info-row animate-fadeUp-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
      {infos.map((info, i) => {
        const c = colors[cycle[i]]
        const borderColor = c ? toRgba(c, 0.3) : 'rgba(196,98,45,0.15)'
        const bg = c ? toRgba(c, 0.08) : 'var(--cream)'
        const labelColor = c ? toRgb(c) : 'var(--muted)'
        return (
          <div key={info.label} className="info-card" style={{ background: bg, borderColor, borderRadius: 16, padding: '1.4rem 1.5rem', border: `1px solid ${borderColor}` }}>
            <div className="info-card-label" style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: labelColor, marginBottom: '0.5rem' }}>{info.icon} {info.label}</div>
            <div className="info-card-value" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)' }}>{info.value}</div>
          </div>
        )
      })}
    </div>
  )
}
