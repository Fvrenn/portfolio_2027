import { angleDelta } from './math'

export interface AngularSpring {
  angleDeg: number
  velocityDeg: number
}

interface SpringSettings {
  stiffness: number
  damping: number
}

export function stepAngularSpring(spring: AngularSpring, targetDeg: number, settings: SpringSettings): AngularSpring {
  const velocityDeg = (spring.velocityDeg + angleDelta(spring.angleDeg, targetDeg) * settings.stiffness) * settings.damping
  return { angleDeg: spring.angleDeg + velocityDeg, velocityDeg }
}
