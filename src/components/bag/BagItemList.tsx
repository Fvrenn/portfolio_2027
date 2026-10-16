import { LuggageTag } from '@/components/ui/LuggageTag'
import type { BagItem } from '@/content/bag'

export function BagItemList({ items }: { items: BagItem[] }) {
  return (
    <ol className="mt-6 space-y-2.5">
      {items.map(({ id, object, image, title, text, proof }) => (
        <li key={id} data-bag-entry className="odd:-rotate-[0.6deg] even:rotate-[0.6deg]">
          <LuggageTag>
            <div className="flex items-center gap-4">
              <img src={image} alt="" aria-hidden="true" loading="lazy" className="size-[clamp(52px,2vw+28px,64px)] shrink-0 object-contain drop-shadow-[0_2px_2px_rgb(0_0_0/0.25)]" />
              <div>
                <p className="font-mono text-[11px] tracking-[1.4px] text-brass-deep uppercase">{object}</p>
                <h3 className="font-serif text-[22px] leading-tight">{title}</h3>
                <div data-bag-detail className="overflow-hidden">
                  <p className="pt-1.5 text-[15px] text-ink/80">{text}</p>
                  <p className="pt-1 text-sm text-ink/60">↳ {proof}</p>
                </div>
              </div>
            </div>
          </LuggageTag>
        </li>
      ))}
    </ol>
  )
}
