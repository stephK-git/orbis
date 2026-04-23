import { useStore } from '../state/store'
import CountryHeader from './CountryHeader'
import StatGrid from './StatGrid'
import InfoRow from './InfoRow'
import WeatherCard from './WeatherCard'
import GeoAnalysis from './GeoAnalysis'
import MapCard from './MapCard'

export default function Dashboard() {
  const { country, loading, error } = useStore()
  if (loading) {
    return (
      <div className="dashboard" style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
          {[0,1,2].map(i => <span key={i} className="loader-dot" style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--terra)', opacity: 0.25, display: 'block' }} />)}
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Chargement des données…</p>
      </div>
    )
  }
  if (error) {
    return (
      <div className="dashboard" style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
        <div style={{ background: '#FFF0EB', border: '1px solid rgba(196,98,45,0.25)', borderRadius: 16, padding: '2rem', textAlign: 'center' }}>
          <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.75rem' }}>⚠️</span>
          <p style={{ color: 'var(--terra)', fontSize: '0.9rem' }}>Pays introuvable. Vérifiez l'orthographe et réessayez.</p>
        </div>
      </div>
    )
  }
  if (!country) {
    return (
      <div className="dashboard" style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
        <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: '1rem' }}>🌍</span>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Votre tableau de bord apparaîtra ici</p>
      </div>
    )
  }
  return (
    <div className="dashboard" style={{ maxWidth: 900, margin: '0 auto', padding: '2.5rem 2rem 4rem', position: 'relative', zIndex: 1 }}>
      <CountryHeader />
      <StatGrid />
      <InfoRow />
      <WeatherCard />
      <GeoAnalysis />
      <MapCard />
    </div>
  )
}
