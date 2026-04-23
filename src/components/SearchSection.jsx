import { useState, useEffect, useRef } from 'react'
import { useStore } from '../state/store'
import { useSearch } from '../hooks/useSearch'

export default function SearchSection() {
  const { query, setQuery, allCountries } = useStore()
  const { search } = useSearch()
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!query || query.length < 2) { setSuggestions([]); setOpen(false); return }
    const matches = allCountries
      .filter(c => c.name.common.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 7)
    setSuggestions(matches)
    setOpen(matches.length > 0)
  }, [query, allCountries])

  function handleSelect(name) {
    setQuery(name)
    setOpen(false)
    search(name)
  }

  return (
    <section className="search-section" style={{ position: 'relative', zIndex: 5, background: 'var(--dark)', padding: '2.5rem 2.5rem 3rem' }}>
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2.4rem', color: 'var(--cream)', marginBottom: '0.4rem', lineHeight: 1.1 }}>
        Explorez le <em style={{ color: 'var(--sun)', fontStyle: 'normal' }}>monde</em>
      </h2>
      <p style={{ fontSize: '0.85rem', color: 'rgba(255,253,248,0.5)', marginBottom: '1.75rem', fontWeight: 300 }}>
        Entrez le nom d'un pays pour afficher son tableau de bord
      </p>

      <div className="search-row" style={{ display: 'flex', gap: '0.75rem', maxWidth: '640px', position: 'relative' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && search()}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="Ex: Côte d'Ivoire, Sénégal, Brésil…"
            style={{
              width: '100%', padding: '0.9rem 1.25rem',
              fontFamily: 'Nunito, sans-serif', fontSize: '0.95rem',
              color: 'var(--text)', background: 'var(--sand)',
              border: '2px solid transparent', borderRadius: '10px', outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--sun)'}
          />
          {open && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
              background: 'var(--cream)', borderRadius: '10px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.2)', overflow: 'hidden',
              zIndex: 100, maxHeight: '220px', overflowY: 'auto',
            }}>
              {suggestions.map(c => (
                <div key={c.cca2}
                  style={{ padding: '0.7rem 1.1rem', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
                  onMouseDown={() => handleSelect(c.name.common)}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(240,165,0,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <img src={c.flags.png} alt="" style={{ width: 22, height: 15, objectFit: 'cover', borderRadius: 2 }} />
                  {c.name.common}
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={() => search()}
          style={{
            padding: '0.9rem 1.75rem', fontFamily: 'Syne, sans-serif', fontWeight: 700,
            fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--dark)', background: 'var(--sun)', border: 'none',
            borderRadius: '10px', cursor: 'pointer', whiteSpace: 'nowrap',
          }}>
          ▶ Rechercher
        </button>
      </div>

      <div style={{ position: 'absolute', bottom: '-30px', left: 0, right: 0, height: '60px', background: 'var(--dark)', clipPath: 'ellipse(55% 100% at 50% 0%)', zIndex: -1 }} />
    </section>
  )
}
