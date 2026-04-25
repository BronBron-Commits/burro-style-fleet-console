export type RobotMode = "Autonomous" | "Manual" | "Paused"
export type RobotTask = "Patrol Route" | "Harvest Assist" | "Idle" | "Return to Base"

export type Robot = {
  id: string
  lat: number
  lng: number
  battery: number
  speedMph: number
  mode: RobotMode
  task: RobotTask
  lastUpdate: string
}

export const initialRobots: Robot[] = [
  {
    id: "BURRO-01",
    lat: 39.9526,
    lng: -75.1652,
    battery: 87,
    speedMph: 2.4,
    mode: "Autonomous",
    task: "Patrol Route",
    lastUpdate: new Date().toLocaleTimeString(),
  },
  {
    id: "BURRO-02",
    lat: 39.956,
    lng: -75.18,
    battery: 64,
    speedMph: 1.7,
    mode: "Manual",
    task: "Harvest Assist",
    lastUpdate: new Date().toLocaleTimeString(),
  },
  {
    id: "BURRO-03",
    lat: 39.948,
    lng: -75.15,
    battery: 92,
    speedMph: 0,
    mode: "Paused",
    task: "Idle",
    lastUpdate: new Date().toLocaleTimeString(),
  },
]