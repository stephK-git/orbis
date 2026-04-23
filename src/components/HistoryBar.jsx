import { useStore } from '../state/store'
import { useSearch } from '../hooks/useSearch'

export default function HistoryBar() {
  const { history, setQuery } = useStore()
  const { search } = useSearch()

  if (!history.length) return null

  function handleClick(name) {
    setQuery(name)
    search(name)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-3 sm:pt-4 flex items-center gap-2 flex-wrap relative z-10">
      <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
        Récents :
      </span>
      {history.map(e => (
        <button
          key={e.name}
          onClick={() => handleClick(e.name)}
          className="flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-full border transition-all hover:border-yellow-400"
          style={{
            background: 'var(--cream)',
            border: '1px solid rgba(196,98,45,0.15)',
            color: 'var(--text)',
          }}
        >
          <img src={e.flag} alt="" className="w-4 sm:w-5 h-3 object-cover rounded-sm" />
          {e.name}
        </button>
      ))}
    </div>
  )
}
