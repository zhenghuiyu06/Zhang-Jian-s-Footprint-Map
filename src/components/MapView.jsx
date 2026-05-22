import { MapContainer, TileLayer } from 'react-leaflet'
import MarkerLayer from './MarkerLayer'

const MAP_CENTER = [32.5, 119.5]
const MAP_ZOOM = 8
const MAX_BOUNDS = [
  [28, 115],
  [37, 122]
]

export default function MapView({ locations, selected, onSelect }) {
  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={MAP_ZOOM}
      maxBounds={MAX_BOUNDS}
      zoomControl={false}
      attributionControl={false}
      className="h-full w-full"
      style={{ background: '#f5f3ef' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
      />
      <MarkerLayer
        locations={locations}
        selected={selected}
        onSelect={onSelect}
      />
    </MapContainer>
  )
}
