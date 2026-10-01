import type { BagItem } from '@/content/bag'

export function BagItemList({ items }: { items: BagItem[] }) {
  return (
    <ol className="mt-6 space-y-2">
      {items.map(({ id, object, image, title, text, proof }, i) => (
        <li key={id} data-bag-entry className="flex gap-4 rounded-2xl bg-white/75 px-4 py-3 backdrop-blur-sm">
          <div className="flex w-14 shrink-0 flex-col items-center gap-0.5 pt-1">
            <img src={image} alt="" aria-hidden="true" loading="lazy" className="h-9 w-full object-contain" />
            <span className="font-mono text-[10px] tracking-[1px] text-ink/50">0{i + 1}</span>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[1.4px] text-trail-dark uppercase">{object}</p>
            <h3 className="font-serif text-[22px] leading-tight">{title}</h3>
            <div data-bag-detail className="overflow-hidden">
              <p className="pt-1.5 text-[15px] text-ink/75">{text}</p>
              <p className="pt-1 text-sm text-ink/55">↳ {proof}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
