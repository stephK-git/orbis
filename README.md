# 🌍 Info Pays — React + Vite + MapLibre

Application géomatique de consultation de données pays, migrée depuis Vanilla JS vers React.

## Stack technique

| Outil | Rôle |
|---|---|
| **React 18 + Vite** | Base de l'application |
| **MapLibre GL JS** | Carte vectorielle (remplace Leaflet) |
| **Turf.js** | Analyses géospatiales |
| **TanStack Query** | Gestion des appels API |
| **Zustand** | État global (pays, météo, historique) |
| **Tailwind CSS** | Styles utilitaires |

## APIs utilisées

- [restcountries.com](https://restcountries.com) — Données pays
- [open-meteo.com](https://open-meteo.com) — Météo temps réel
- [OpenStreetMap](https://openstreetmap.org) — Tuiles cartographiques

## Installation

```bash
npm install
npm run dev
```

## Structure du projet

```
src/
├── api/
│   ├── countries.js     # Appels restcountries.com
│   └── weather.js       # Appels open-meteo.com
├── components/
│   ├── Topbar.jsx
│   ├── SearchSection.jsx
│   ├── HistoryBar.jsx
│   ├── CountryHeader.jsx
│   ├── StatGrid.jsx
│   ├── InfoRow.jsx
│   ├── WeatherCard.jsx
│   ├── GeoAnalysis.jsx   # ← Nouveau : analyses Turf.js
│   ├── MapCard.jsx       # ← MapLibre GL (remplace Leaflet)
│   └── Dashboard.jsx
├── hooks/
│   └── useSearch.js      # Logique de recherche principale
├── state/
│   └── store.js          # Zustand store
├── utils/
│   └── index.js          # fmt, colors, extractFlagColors
├── App.jsx
├── main.jsx
└── index.css
```

## Nouvelles fonctionnalités géomatiques (vs version originale)

- **MapLibre GL** : carte vectorielle plus performante que Leaflet
- **Analyse géospatiale Turf.js** :
  - Coordonnées précises (lat/lng)
  - Hémisphère (Nord/Sud, Est/Ouest)
  - Distance à l'équateur
  - Distance au méridien de Greenwich
  - Calcul de buffer 500km

## Phase 2 (backend optionnel)

Si tu souhaites ajouter des couches GeoJSON personnalisées :

```bash
# Backend Python
pip install fastapi geopandas shapely uvicorn
uvicorn main:app --reload
```

## Build production

```bash
npm run build
npm run preview
```
