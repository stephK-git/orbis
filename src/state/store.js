import { create } from 'zustand'

// ── History stored in localStorage ──
function getHistory() {
  try { return JSON.parse(localStorage.getItem('infopays_history') || '[]') } catch { return [] }
}
function saveHistoryLS(h) {
  try { localStorage.setItem('infopays_history', JSON.stringify(h)) } catch {}
}

export const useStore = create((set, get) => ({
  // Search
  query:        '',
  setQuery:     (q) => set({ query: q }),

  // Country data
  country:      null,
  weather:      null,
  flagColors:   null,
  loading:      false,
  error:        null,

  setCountry:   (country) => set({ country }),
  setWeather:   (weather) => set({ weather }),
  setFlagColors:(flagColors) => set({ flagColors }),
  setLoading:   (loading)  => set({ loading }),
  setError:     (error)    => set({ error }),

  // All countries for autocomplete
  allCountries: [],
  setAllCountries: (allCountries) => set({ allCountries }),

  // History
  history: getHistory(),
  addHistory(entry) {
    let h = get().history.filter(e => e.name !== entry.name)
    h.unshift(entry)
    h = h.slice(0, 6)
    saveHistoryLS(h)
    set({ history: h })
  },

  // Map state
  mapCenter: [0, 20],
  mapZoom:   2,
  setMapCenter: (mapCenter) => set({ mapCenter }),
  setMapZoom:   (mapZoom)   => set({ mapZoom }),
}))
