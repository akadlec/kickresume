import { useEffect } from 'react'
import { useJobDetail } from '../hooks/useJobDetail'
import { JobDetail } from './JobDetail'

interface Props {
  jobId: string
  onClose: () => void
}

export function JobDetailModal({ jobId, onClose }: Props) {
  const { data: job, isLoading, isError } = useJobDetail(jobId)
  const applyHref = job?.url
  const applyDisabled = isLoading || isError || !applyHref

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white"
      role="dialog"
      aria-modal="true"
      aria-label="Job details"
    >
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin pb-24">
        <JobDetail jobId={jobId} scrollable={false} />
      </div>

      {/* Fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-10 flex items-center gap-3 border-t border-gray-100 bg-white/95 px-4 py-4 backdrop-blur-sm">
        <button
          onClick={onClose}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 active:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
        >
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
            <path
              fillRule="evenodd"
              d="M9.78 11.78a.75.75 0 01-1.06 0L5.47 8.53a.75.75 0 010-1.06l3.25-3.25a.75.75 0 011.06 1.06L7.06 8l2.72 2.72a.75.75 0 010 1.06z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>

        {!applyDisabled && applyHref ? (
          <a
            href={applyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-coral-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-coral-600 active:bg-coral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
          >
            Apply Now
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M3.75 2a.75.75 0 00-.75.75v10.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75V6.56L9.44 3H3.75zM2 2.75A2.75 2.75 0 014.75 0h4.94c.316 0 .617.123.841.341l3.5 3.444A1.75 1.75 0 0114.5 5v8.25A2.75 2.75 0 0111.75 16h-8A2.75 2.75 0 011 13.25V2.75zm7-1.03v1.78c0 .414.336.75.75.75h1.75L9 1.72z" />
            </svg>
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-gray-200 px-4 py-3 text-sm font-semibold text-gray-500 shadow-sm cursor-not-allowed"
            aria-disabled="true"
          >
            {isLoading ? 'Loading…' : 'Apply unavailable'}
          </button>
        )}
      </div>
    </div>
  )
}
