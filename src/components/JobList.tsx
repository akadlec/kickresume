import { useEffect, useRef } from 'react'
import { useJobSearch } from '../hooks/useJobSearch'
import type { SearchParams } from '../types'
import { JobCard } from './JobCard'
import { LoadingSpinner } from './LoadingSpinner'
import { ErrorMessage } from './ErrorMessage'

interface Props {
  searchParams: SearchParams
  selectedJobId: string | null
  onJobSelect: (id: string) => void
}

export function JobList({ searchParams, selectedJobId, onJobSelect }: Props) {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useJobSearch(searchParams)

  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-gray-400">Searching jobs…</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-4">
        <ErrorMessage
          message="Failed to load jobs. Please check your connection and try again."
          onRetry={() => void refetch()}
        />
      </div>
    )
  }

  const allJobs = data?.pages.flatMap(p => p.results) ?? []
  const total   = data?.pages[0]?.count ?? 0

  if (allJobs.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center px-6">
        <span className="text-4xl" aria-hidden>🔍</span>
        <p className="font-display font-semibold text-gray-800">No results found</p>
        <p className="text-sm text-gray-400">Try adjusting your keywords or country filter.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Result count */}
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">
            {total.toLocaleString()}
          </span>{' '}
          search results
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3 p-4">
        {allJobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            isSelected={job.id === selectedJobId}
            onClick={() => onJobSelect(job.id)}
          />
        ))}
      </div>

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="h-2" aria-hidden />

      {/* Next-page loader */}
      {isFetchingNextPage && (
        <div className="flex justify-center py-6">
          <LoadingSpinner size="md" />
        </div>
      )}

      {/* End of list */}
      {!hasNextPage && allJobs.length > 0 && (
        <p className="py-8 text-center text-xs text-gray-300">
          — End of results —
        </p>
      )}
    </div>
  )
}
