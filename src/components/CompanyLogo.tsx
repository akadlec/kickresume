import { useState } from 'react'
import { getInitials } from '../utils'

interface Props {
  logo: string | null
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_CLS = {
  sm: 'h-9 w-9 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-14 w-14 text-base',
}

/** Simple deterministic hue from company name */
function nameHue(name: string): number {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360
  return h
}

export function CompanyLogo({ logo, name, size = 'md' }: Props) {
  const [imgFailed, setImgFailed] = useState(false)

  const sizeCls = SIZE_CLS[size]

  if (logo && !imgFailed) {
    return (
      <img
        src={logo}
        alt={name}
        onError={() => setImgFailed(true)}
        className={`${sizeCls} rounded-lg object-contain border border-gray-100 bg-white p-0.5 shrink-0`}
      />
    )
  }

  const hue = nameHue(name)
  return (
    <div
      className={`${sizeCls} rounded-lg flex items-center justify-center font-display font-bold shrink-0`}
      style={{
        background: `hsl(${hue} 60% 94%)`,
        color:      `hsl(${hue} 50% 35%)`,
      }}
    >
      {getInitials(name)}
    </div>
  )
}
