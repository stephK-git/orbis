import { useStore } from '../state/store'
import { fmt, toRgba } from '../utils'
import * as turf from '@turf/turf'

export default function GeoAnalysis() {
  const { country, flagColors } = useStore()
  if (!country || !country.lat) return null
  const c0 = flagColors?.[0]
  const borderColor = c0 ? toRgba(c0, 0.3) : 'rgba(196,98,45,0.15)'
  const bg = c0 ? toRgba(c0, 0.06) : 'var(--cream)'
  const point = turf.point([country.lng, country.lat])
  const buffered = turf.buffer(point, 500, { units: 'kilometers' })
  const bufferArea = turf.area(buffered) / 1e6
  const hemisphere = country.lat >= 0 ? '🌐 Nord' : '🌐 Sud'
  const meridian = country.lng >= 0 ? '🌐 Est' : '🌐 Ouest'
  const distEquator = Math.round(turf.distance(point, turf.point([country.lng, 0]), { units: 'kilometers' }))
  const distGreenwich = Math.round(turf.distance(point, turf.point([0, country.lat]), { units: 'kilometers' }))
  const geoStats = [
    { icon: '📍', label: 'Latitude',         value: `${country.lat.toFixed(4)}°` },
    { icon: '📍', label: 'Longitude',        value: `${country.lng.toFixed(4)}°` },
    { icon: '🌐', label: 'Hémisphère',       value: `${hemisphere} / ${meridian}` },
    { icon: '↕️', label: 'Dist. équateur',   value: `${fmt(distEquator)} km` },
    { icon: '↔️', label: 'Dist. Greenwich',  value: `${fmt(distGreenwich)} km` },
    { icon: '🔵', label: 'Buffer 500km',     value: `${fmt(Math.round(bufferArea))} km²` },
  ]
  return (
    <div style={{ background: bg, borderColor, borderRadius: 16, padding: '1.4rem 1.5rem', border: `1px solid ${borderColor}`, marginBottom: '1rem', boxShadow: '0 4px 16px rgba(44,36,22,0.07)' }}>
      <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1rem' }}>📐 Analyse géospatiale — Turf.js</div>
      <div className="geo-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        {geoStats.map(stat => (
          <div key={stat.label} className="geo-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', padding: '0.75rem', borderRadius: 12, background: 'rgba(255,253,248,0.6)' }}>
            <span style={{ fontSize: '1rem', marginTop: 2 }}>{stat.icon}</span>
            <div>
              <div style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 2 }}>{stat.label}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text)' }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
