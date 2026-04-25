import { useState } from "react"
import FleetMap from "./components/FleetMap"
import type { Robot } from "./data/robots"

export default function App() {
  const [selectedRobot, setSelectedRobot] = useState<Robot | null>(null)

  return (
    <div className="h-screen w-screen flex bg-gray-950 text-white">
      <aside className="w-96 border-r border-gray-800 bg-gray-900 p-4">
        <h1 className="text-2xl font-bold text-blue-400">Fleet Console</h1>

        <p className="mt-2 text-sm text-gray-400">
          Real-time robot telemetry dashboard
        </p>

        <div className="mt-6 rounded-xl border border-gray-800 bg-gray-950 p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Selected Robot
          </h2>

          {selectedRobot ? (
            <div className="mt-4 space-y-4">
              <div>
                <div className="text-lg font-bold text-white">
                  {selectedRobot.id}
                </div>
                <div className="text-xs text-green-400">Online</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <Metric label="Mode" value={selectedRobot.mode} />
                <Metric label="Task" value={selectedRobot.task} />
                <Metric label="Battery" value={`${selectedRobot.battery.toFixed(0)}%`} />
                <Metric label="Speed" value={`${selectedRobot.speedMph.toFixed(1)} mph`} />
              </div>

              <div className="rounded-lg border border-gray-800 bg-gray-900 p-3 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-500">Latitude</span>
                  <span>{selectedRobot.lat.toFixed(5)}</span>
                </div>
                <div className="mt-1 flex justify-between">
                  <span className="text-gray-500">Longitude</span>
                  <span>{selectedRobot.lng.toFixed(5)}</span>
                </div>
                <div className="mt-1 flex justify-between">
                  <span className="text-gray-500">Last Update</span>
                  <span>{selectedRobot.lastUpdate}</span>
                </div>
              </div>

              <button className="w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold hover:bg-blue-500">
                Send Command
              </button>

              <button className="w-full rounded-lg border border-gray-700 px-3 py-2 text-sm font-semibold text-gray-300 hover:bg-gray-800">
                View Telemetry
              </button>
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500">
              Select a robot marker on the map.
            </p>
          )}
        </div>

        <div className="mt-4 rounded-xl border border-gray-800 bg-gray-950 p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Fleet Status
          </h2>

          <div className="mt-3 space-y-2 text-sm">
            <Status label="Robots Online" value="3" valueClass="text-green-400" />
            <Status label="Telemetry" value="Live" valueClass="text-blue-400" />
            <Status label="Region" value="Philadelphia" />
            <Status label="Active Zone" value="Demo Geofence" />
          </div>
        </div>
      </aside>

      <main className="flex-1">
        <FleetMap onSelect={setSelectedRobot} />
      </main>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 font-semibold text-white">{value}</div>
    </div>
  )
}

function Status({
  label,
  value,
  valueClass = "text-white",
}: {
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}</span>
      <span className={`font-semibold ${valueClass}`}>{value}</span>
    </div>
  )
}