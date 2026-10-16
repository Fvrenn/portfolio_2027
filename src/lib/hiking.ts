const CLIMB_M_PER_HOUR = 300
const DESCENT_M_PER_HOUR = 500
const MINUTES_PER_HOUR = 60
const ROUNDING_MINUTES = 5

export function getWalkingMinutes(fromAltitudeM: number, toAltitudeM: number) {
  const elevationM = toAltitudeM - fromAltitudeM
  const metersPerHour = elevationM >= 0 ? CLIMB_M_PER_HOUR : DESCENT_M_PER_HOUR
  const minutes = (Math.abs(elevationM) / metersPerHour) * MINUTES_PER_HOUR
  return Math.max(ROUNDING_MINUTES, Math.round(minutes / ROUNDING_MINUTES) * ROUNDING_MINUTES)
}
