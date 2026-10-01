import { lerp } from './math'
import { createRandom, type Random } from './random'

type Noise2D = (x: number, y: number) => number

const TABLE_SIZE = 256
const GRADIENT_COUNT = 8
const GRADIENTS = Array.from({ length: GRADIENT_COUNT }, (_, i) => {
  const angle = (i / GRADIENT_COUNT) * Math.PI * 2
  return [Math.cos(angle), Math.sin(angle)] as const
})

export function createFractalNoise2D(seed: number, octaves: number): Noise2D {
  const noise = createNoise2D(seed)
  return (x, y) => {
    let sum = 0
    let amplitude = 1
    let frequency = 1
    let totalAmplitude = 0
    for (let octave = 0; octave < octaves; octave++) {
      sum += noise(x * frequency, y * frequency) * amplitude
      totalAmplitude += amplitude
      amplitude /= 2
      frequency *= 2
    }
    return sum / totalAmplitude
  }
}

function createNoise2D(seed: number): Noise2D {
  const permutation = buildPermutation(createRandom(seed))
  const hash = (x: number, y: number) =>
    permutation[(permutation[x & (TABLE_SIZE - 1)] + y) & (TABLE_SIZE - 1)]

  const corner = (cellX: number, cellY: number, dx: number, dy: number) => {
    const [gx, gy] = GRADIENTS[hash(cellX, cellY) % GRADIENT_COUNT]
    return gx * dx + gy * dy
  }

  return (x, y) => {
    const cellX = Math.floor(x)
    const cellY = Math.floor(y)
    const dx = x - cellX
    const dy = y - cellY
    const u = fade(dx)
    const v = fade(dy)
    const top = lerp(corner(cellX, cellY, dx, dy), corner(cellX + 1, cellY, dx - 1, dy), u)
    const bottom = lerp(
      corner(cellX, cellY + 1, dx, dy - 1),
      corner(cellX + 1, cellY + 1, dx - 1, dy - 1),
      u,
    )
    return lerp(top, bottom, v)
  }
}

function buildPermutation(random: Random): number[] {
  const values = Array.from({ length: TABLE_SIZE }, (_, i) => i)
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[values[i], values[j]] = [values[j], values[i]]
  }
  return values
}

const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
