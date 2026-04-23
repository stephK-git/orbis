import { useEffect, useRef } from 'react'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useStore } from '../state/store'

export default function MapCard() {
  const { country, mapCenter } = useStore()
  const mapRef      = useRef(null)
  const instanceRef = useRef(null)

  useEffect(() => {
    if (!country || !mapRef.current) return

    if (instanceRef.current) {
      instanceRef.current.remove()
      instanceRef.current = null
    }

    const ML = maplibregl.default ?? maplibregl

    const map = new ML.Map({
      container: mapRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
          },
          'country-highlight': {
            type: 'geojson',
            data: { type: 'FeatureCollection', features: [] },
          },
        },
        layers: [
          { id: 'osm-tiles', type: 'raster', source: 'osm' },
          {
            id: 'highlight-fill',
            type: 'fill',
            source: 'country-highlight',
            paint: { 'fill-color': '#C4622D', 'fill-opacity': 0.35 },
          },
          {
            id: 'highlight-border',
            type: 'line',
            source: 'country-highlight',
            paint: { 'line-color': '#C4622D', 'line-width': 3 },
          },
        ],
      },
      center: mapCenter,
      zoom: 3,
      scrollZoom: false,
      attributionControl: false,
      renderWorldCopies: false,
    })

    map.addControl(new ML.NavigationControl(), 'top-right')
    map.addControl(new ML.AttributionControl({ compact: true }), 'bottom-right')

    map.on('load', async () => {

      // Marqueur capitale
      new ML.Marker({ color: '#F0A500' })
        .setLngLat(mapCenter)
        .setPopup(
          new ML.Popup({ offset: 25, closeButton: false }).setHTML(
            `<strong style="font-family:sans-serif">${country.capital}</strong><br/>
             <span style="font-size:0.8em;color:#8C7B60;font-family:sans-serif">
               Capitale de ${country.name}
             </span>`
          )
        )
        .addTo(map)

      // Contours GeoJSON via Nominatim
      try {
        const url =
          `https://nominatim.openstreetmap.org/search` +
          `?q=${encodeURIComponent(country.name)}` +
          `&polygon_geojson=1&format=geojson&limit=3&featuretype=country`

        const res = await fetch(url, {
          headers: { 'Accept-Language': 'fr', 'User-Agent': 'Orbis-App/1.0' },
        })
        if (!res.ok) throw new Error(`Nominatim ${res.status}`)

        const geojson = await res.json()
        const feature = geojson.features?.find(f =>
          f.geometry?.type === 'MultiPolygon' || f.geometry?.type === 'Polygon'
        )

        if (feature) {
          // Injecter le GeoJSON dans la source
          map.getSource('country-highlight')?.setData({
            type: 'FeatureCollection',
            features: [feature],
          })

          // Calculer le bounding box du pays depuis ses coordonnées
          const bbox = getGeojsonBbox(feature.geometry)
          if (bbox) {
            map.fitBounds(
              [[bbox[0], bbox[1]], [bbox[2], bbox[3]]],
              { padding: 60, duration: 1200, maxZoom: 10 }
            )
          }
        }
      } catch (err) {
        console.warn('Contours pays indisponibles :', err.message)
        // Fallback : centrer sur les coordonnées du pays
        map.flyTo({ center: mapCenter, zoom: 5, duration: 1000 })
      }
    })

    instanceRef.current = map

    return () => {
      map.remove()
      instanceRef.current = null
    }
  }, [country])

  if (!country) return null

  return (
    <div className="rounded-2xl overflow-hidden border mb-4 animate-fadeUp-4"
      style={{ borderColor: 'rgba(196,98,45,0.15)', boxShadow: '0 4px 16px rgba(44,36,22,0.07)' }}>
      <div className="px-5 py-3 border-b flex items-center justify-between"
        style={{ background: 'var(--cream)', borderColor: 'rgba(196,98,45,0.15)' }}>
        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
          🗺️ {country.name} — {country.region}
        </span>
        <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--muted)' }}>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ background: '#C4622D', opacity: 0.7 }}/>
            Territoire
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: '#F0A500' }}/>
            Capitale
          </span>
        </div>
      </div>
      <div ref={mapRef} style={{ height: 'clamp(260px, 50vw, 400px)', width: '100%' }} />
    </div>
  )
}

// Calcule le bounding box [minLng, minLat, maxLng, maxLat] d'un GeoJSON geometry
function getGeojsonBbox(geometry) {
  let minLng = Infinity, minLat = Infinity
  let maxLng = -Infinity, maxLat = -Infinity

  function processCoords(coords) {
    if (typeof coords[0] === 'number') {
      // Point [lng, lat]
      const [lng, lat] = coords
      if (lng < minLng) minLng = lng
      if (lng > maxLng) maxLng = lng
      if (lat < minLat) minLat = lat
      if (lat > maxLat) maxLat = lat
    } else {
      coords.forEach(processCoords)
    }
  }

  if (geometry.type === 'Polygon') {
    processCoords(geometry.coordinates)
  } else if (geometry.type === 'MultiPolygon') {
    geometry.coordinates.forEach(polygon => processCoords(polygon))
  } else {
    return null
  }

  if (!isFinite(minLng)) return null
  return [minLng, minLat, maxLng, maxLat]
}
