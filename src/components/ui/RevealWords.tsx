export function RevealWords({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span key={i} data-word>
          {word}{' '}
        </span>
      ))}
    </>
  )
}
