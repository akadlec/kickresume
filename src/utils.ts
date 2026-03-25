/** Returns a human-readable relative date string */
export function formatRelativeDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return 'Unknown date'

  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  // Clamp future dates to "Today" to avoid negative values like "-1 days ago"
  if (diffMs < 0) return 'Today'

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/** Returns formatted salary string or null if unavailable */
export function formatSalary(
  min:      number | null,
  max:      number | null,
  currency: string | null,
): string | null {
  const hasMin = min !== null && min !== undefined
  const hasMax = max !== null && max !== undefined
  if (!hasMin && !hasMax) return null

  const fmt = (n: number) => {
    if (n >= 1000) return `${Math.round(n / 1000)}K`
    return String(n)
  }
  const sym = currency ? ` ${currency}` : ''

  if (hasMin && hasMax) return `$${fmt(min!)} – $${fmt(max!)}${sym}`
  if (hasMin)           return `From $${fmt(min!)}${sym}`
  if (hasMax)           return `Up to $${fmt(max!)}${sym}`
  return null
}

/** Returns initials from a company name (up to 2 chars) */
export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('')
}
