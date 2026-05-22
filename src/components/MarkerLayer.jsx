import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

const ICON_SIZE = 14

function createIcon(isSelected, category) {
  const color = isSelected ? '#1a1a1a' : categoryColor(category)
  const ring = isSelected
    ? `<div style="width:${ICON_SIZE}px;height:${ICON_SIZE}px;border-radius:50%;background:${color};box-shadow:0 0 0 6px rgba(26,26,26,0.15),0 2px 8px rgba(0,0,0,0.2);"></div>`
    : `<div style="width:${ICON_SIZE}px;height:${ICON_SIZE}px;border-radius:50%;background:${color};box-shadow:0 1px 4px rgba(0,0,0,0.15);opacity:0.85;"></div>`

  return L.divIcon({
    html: ring,
    className: '',
    iconSize: [ICON_SIZE, ICON_SIZE],
    iconAnchor: [ICON_SIZE / 2, ICON_SIZE / 2],
  })
}

function categoryColor(cat) {
  const map = {
    '工业遗产': '#8b7355',
    '古渡口': '#5b7a8c',
    '历史名城': '#7a6b5c',
    '水利工程': '#6b8a7a',
  }
  return map[cat] || '#888'
}

export default function MarkerLayer({ locations, selected, onSelect }) {
  const map = useMap()

  useEffect(() => {
    const markers = locations.map((loc) => {
      const isSelected = selected?.id === loc.id
      const marker = L.marker([loc.lat, loc.lng], {
        icon: createIcon(isSelected, loc.category),
      })

      marker.on('click', () => {
        map.flyTo([loc.lat, loc.lng], 12, { duration: 1.2 })
        onSelect(loc)
      })

      marker.bindTooltip(loc.name, {
        direction: 'top',
        offset: [0, -ICON_SIZE / 2 - 4],
        className: 'custom-tooltip',
      })

      return marker
    })

    const group = L.featureGroup(markers).addTo(map)

    return () => {
      group.clearLayers()
      map.removeLayer(group)
    }
  }, [locations, selected, map, onSelect])

  return null
}
