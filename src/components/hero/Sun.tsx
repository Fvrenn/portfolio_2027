import { useId } from 'react'

const SUN_VIEWBOX_SIZE = 725
const SUN_CENTER = SUN_VIEWBOX_SIZE / 2
const SLIT_ROWS = [
  { y: 300, height: 5 },
  { y: 322, height: 7 },
  { y: 346, height: 9 },
  { y: 372, height: 11 },
  { y: 400, height: 13 },
  { y: 430, height: 15 },
]

export function Sun({ className }: { className?: string }) {
  const id = useId()
  const blurId = `${id}-blur`
  const slitsId = `${id}-slits`

  return (
    <svg className={className} viewBox={`0 0 ${SUN_VIEWBOX_SIZE} ${SUN_VIEWBOX_SIZE}`} aria-hidden="true">
      <defs>
        <filter id={blurId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="70" />
        </filter>
        <mask id={slitsId}>
          <rect width={SUN_VIEWBOX_SIZE} height={SUN_VIEWBOX_SIZE} fill="white" />
          <g transform={`rotate(-45 ${SUN_CENTER} ${SUN_CENTER})`}>
            {SLIT_ROWS.map(({ y, height }) => (
              <rect key={y} x="150" y={y} width="425" height={height} fill="black" />
            ))}
          </g>
        </mask>
      </defs>
      <circle cx={SUN_CENTER} cy={SUN_CENTER} r="210" className="fill-sun-glow" fillOpacity="0.45" filter={`url(#${blurId})`} />
      <circle cx={SUN_CENTER} cy={SUN_CENTER} r="97" className="fill-sun" mask={`url(#${slitsId})`} />
    </svg>
  )
}
