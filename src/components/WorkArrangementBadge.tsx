import type { WorkArrangement } from '../types'

const CONFIG: Record<
  WorkArrangement,
  { label: string; className: string }
> = {
  remote:   { label: 'Remote',   className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  hybrid:   { label: 'Hybrid',   className: 'bg-sky-50    text-sky-700    ring-sky-200'     },
  'on-site':{ label: 'On-site',  className: 'bg-amber-50  text-amber-700  ring-amber-200'   },
}

interface Props {
  arrangement: WorkArrangement | null
}

export function WorkArrangementBadge({ arrangement }: Props) {
  if (!arrangement) return null
  const { label, className } = CONFIG[arrangement]
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${className}`}
    >
      {label}
    </span>
  )
}
