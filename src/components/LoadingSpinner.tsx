interface Props {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SIZE = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-[3px]',
}

export function LoadingSpinner({ size = 'md', className = '' }: Props) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`animate-spin rounded-full border-gray-200 border-t-coral-500 ${SIZE[size]} ${className}`}
    />
  )
}
