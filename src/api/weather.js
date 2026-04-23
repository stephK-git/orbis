export function weatherIcon(code) {
  if (code === 0) return '☀️'
  if (code <= 2)  return '⛅'
  if (code <= 3)  return '☁️'
  if (code <= 48) return '🌫️'
  if (code <= 57) return '🌧️'
  if (code <= 67) return '🌧️'
  if (code <= 77) return '❄️'
  if (code <= 82) return '🌦️'
  if (code <= 86) return '🌨️'
  if (code <= 99) return '⛈️'
  return '🌡️'
}

export async function fetchWeather(lat, lon, city) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&wind_speed_unit=kmh&timezone=auto`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Météo indisponible')
  const d = await res.json()
  const cur = d.current
  return {
    temp:     Math.round(cur.temperature_2m),
    humidity: cur.relative_humidity_2m,
    wind:     Math.round(cur.wind_speed_10m),
    icon:     weatherIcon(cur.weather_code),
    city,
  }
}
