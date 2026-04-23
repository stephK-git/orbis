const BASE = 'https://restcountries.com/v3.1'

export async function fetchCountryByName(name) {
  const res = await fetch(`${BASE}/name/${encodeURIComponent(name)}`)
  if (!res.ok) throw new Error('Pays introuvable')
  const data = await res.json()
  return data[0]
}

export async function fetchAllCountries() {
  const res = await fetch(`${BASE}/all?fields=name,flags,cca2`)
  if (!res.ok) throw new Error('Erreur chargement pays')
  const data = await res.json()
  return data.sort((a, b) => a.name.common.localeCompare(b.name.common))
}

export function parseCountry(p) {
  return {
    name:        p.name?.common ?? '—',
    official:    p.name?.official ?? p.name?.common ?? '—',
    capital:     p.capital?.[0] ?? '—',
    region:      p.region ?? '—',
    subregion:   p.subregion ?? '—',
    population:  p.population ?? 0,
    area:        p.area ?? 0,
    languages:   p.languages ? Object.values(p.languages).join(', ') : '—',
    currency:    p.currencies
      ? Object.values(p.currencies).map(c => `${c.name} (${c.symbol ?? '?'})`).join(', ')
      : '—',
    dialCode:    p.idd?.root ? p.idd.root + (p.idd.suffixes?.[0] ?? '') : '—',
    tld:         p.tld?.[0] ?? '—',
    driveSide:   p.car?.side === 'right' ? '🚗 Droite' : '🚗 Gauche',
    isoCode:     p.cca2 ?? '—',
    flagUrl:     p.flags?.png ?? '',
    lat:         p.latlng?.[0] ?? 0,
    lng:         p.latlng?.[1] ?? 0,
    borders:     p.borders ?? [],
    landlocked:  p.landlocked ?? false,
    timezones:   p.timezones ?? [],
    continents:  p.continents ?? [],
  }
}
