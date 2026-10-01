const NON_BREAKING_SPACE = ' '

interface SplitLettersProps {
  text: string
}

export function SplitLetters({ text }: SplitLettersProps) {
  return (
    <>
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          className="inline-block origin-bottom transition-[translate,rotate,color] duration-[400ms,400ms,250ms] ease-spring hover:-translate-y-[0.16em] hover:-rotate-[7deg] hover:text-gold-hover"
        >
          {char === ' ' ? NON_BREAKING_SPACE : char}
        </span>
      ))}
    </>
  )
}
