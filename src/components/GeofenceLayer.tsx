import { Polygon, Popup } from "react-leaflet"

export const demoZone: [number, number][] = [
  [39.958, -75.18],
  [39.958, -75.15],
  [39.942, -75.145],
  [39.94, -75.175],
]

export default function GeofenceLayer() {
  return (
    <Polygon
      positions={demoZone}
      pathOptions={{
        color: "#2563eb",
        fillColor: "#2563eb",
        fillOpacity: 0.18,
        weight: 2,
      }}
    >
      <Popup>Demo Geofence Zone</Popup>
    </Polygon>
  )
}