import { useStore } from '../state/store'
import { toRgba } from '../utils'

export default function WeatherCard() {
  const { weather, flagColors } = useStore()
  if (!weather) return null
  const c1 = flagColors?.[1]
  const borderColor = c1 ? toRgba(c1, 0.4) : 'rgba(196,98,45,0.15)'
  const bg = c1 ? toRgba(c1, 0.08) : 'var(--cream)'
  const items = [
    { icon: weather.icon, value: `${weather.temp}°C`,    label: 'Température' },
    { icon: '💧',         value: `${weather.humidity}%`, label: 'Humidité' },
    { icon: '💨',         value: `${weather.wind} km/h`, label: 'Vent' },
  ]
  return (
    <div className="weather-card animate-fadeUp-3" style={{ background: bg, borderColor, borderRadius: 16, padding: '1.4rem 1.5rem', border: `1px solid ${borderColor}`, marginBottom: '1rem', boxShadow: '0 4px 16px rgba(44,36,22,0.07)' }}>
      <div className="weather-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <div className="weather-title" style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>🌤️ Météo actuelle</div>
          <div className="weather-city" style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text)' }}>{weather.city}</div>
        </div>
      </div>
      <div className="weather-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem' }}>
        {items.map(item => (
          <div key={item.label} className="weather-item" style={{ textAlign: 'center' }}>
            <span className="weather-icon" style={{ fontSize: '1.6rem', display: 'block', marginBottom: '0.3rem' }}>{item.icon}</span>
            <div className="weather-val" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>{item.value}</div>
            <div className="weather-sub" style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: '0.15rem' }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
