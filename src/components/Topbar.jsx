export default function Topbar() {
  return (
    <header className="topbar"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '64px', padding: '0 2.5rem',
        background: 'var(--terra)',
        boxShadow: '0 4px 20px rgba(196,98,45,0.35)',
      }}>
      <div className="topbar-logo" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.35rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--cream)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--sun)', display: 'inline-block' }} />
        Orbis
      </div>
      <span className="topbar-sub" style={{ fontSize: '0.72rem', color: 'rgba(255,253,248,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        Explorateur mondial
      </span>
    </header>
  )
}
