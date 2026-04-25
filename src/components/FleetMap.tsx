import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import type { LatLngExpression } from "leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

import { initialRobots, type Robot } from "../data/robots"
import GeofenceLayer, { demoZone } from "./GeofenceLayer"
import { isInsidePolygon } from "../utils/geo"

type FleetMapProps = {
  onSelect: (robot: Robot) => void
}

const mapCenter: LatLngExpression = [39.9526, -75.1652]

const greenIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32],
})

const blueIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [32, 32],
})

export default function FleetMap({ onSelect }: FleetMapProps) {
  const [robots, setRobots] = useState<Robot[]>(initialRobots)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRobots((prev) =>
        prev.map((robot) => {
          const speed =
            robot.mode === "Paused"
              ? 0
              : Math.max(
                  0.4,
                  robot.speedMph + (Math.random() - 0.5) * 0.35
                )

          return {
            ...robot,
            lat: robot.lat + (Math.random() - 0.5) * 0.0007,
            lng: robot.lng + (Math.random() - 0.5) * 0.0007,
            battery: Math.max(0, robot.battery - Math.random() * 0.08),
            speedMph: Number(speed.toFixed(1)),
            lastUpdate: new Date().toLocaleTimeString(),
          }
        })
      )
    }, 1000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <MapContainer center={mapCenter} zoom={13} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <GeofenceLayer />

      {robots.map((robot) => {
        const inside = isInsidePolygon([robot.lat, robot.lng], demoZone)

        const markerPosition: LatLngExpression = [robot.lat, robot.lng]

        return (
          <Marker
            key={robot.id}
            position={markerPosition}
            icon={inside ? greenIcon : blueIcon}
            eventHandlers={{
              click: () => onSelect(robot),
            }}
          >
            <Popup>
              <strong>{robot.id}</strong>
              <br />
              Mode: {robot.mode}
              <br />
              Task: {robot.task}
              <br />
              Battery: {robot.battery.toFixed(0)}%
              <br />
              Speed: {robot.speedMph.toFixed(1)} mph
              <br />
              Status:{" "}
              <span style={{ color: inside ? "green" : "gray" }}>
                {inside ? "Inside Zone" : "Outside Zone"}
              </span>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}