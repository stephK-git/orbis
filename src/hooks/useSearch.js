import { useCallback } from 'react'
import { useStore } from '../state/store'
import { fetchCountryByName, parseCountry } from '../api/countries'
import { fetchWeather } from '../api/weather'
import { extractFlagColors } from '../utils'

export function useSearch() {
  const {
    query, setLoading, setError,
    setCountry, setWeather, setFlagColors,
    addHistory, setMapCenter, setMapZoom,
  } = useStore()

  const search = useCallback(async (name) => {
    const term = name || query
    if (!term.trim()) return

    setLoading(true)
    setError(null)
    setCountry(null)
    setWeather(null)
    setFlagColors(null)

    try {
      const raw = await fetchCountryByName(term)
      const country = parseCountry(raw)

      // Parallel: weather + flag colors
      const [weather, colors] = await Promise.all([
        country.capital !== '—'
          ? fetchWeather(country.lat, country.lng, country.capital).catch(() => null)
          : Promise.resolve(null),
        extractFlagColors(country.flagUrl),
      ])

      setCountry(country)
      setWeather(weather)
      setFlagColors(colors)
      setMapCenter([country.lng, country.lat])
      setMapZoom(5)
      addHistory({ name: country.name, flag: country.flagUrl })
    } catch (err) {
      setError(err.message || 'Pays introuvable')
    } finally {
      setLoading(false)
    }
  }, [query])

  return { search }
}
