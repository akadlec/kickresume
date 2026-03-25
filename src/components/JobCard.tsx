import type { JobPost } from '../types'
import { formatRelativeDate } from '../utils'
import { CompanyLogo } from './CompanyLogo'
import { WorkArrangementBadge } from './WorkArrangementBadge'

interface Props {
  job: JobPost
  isSelected: boolean
  onClick: () => void
}

export function JobCard({ job, isSelected, onClick }: Props) {
  const location = job.locations_derived?.[0] ?? null

  return (
    <article
      role="button"
      tabIndex={0}
      aria-selected={isSelected}
      onClick={onClick}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
      className={[
        'group relative cursor-pointer rounded-xl border bg-white p-4 transition-all duration-150',
        'hover:shadow-md hover:border-gray-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-400',
        isSelected
          ? 'border-coral-500 shadow-md ring-1 ring-coral-500'
          : 'border-gray-100 shadow-sm',
      ].join(' ')}
    >
      {/* Coral accent bar for selected state */}
      {isSelected && (
        <span className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-coral-500" />
      )}

      <div className="flex items-start gap-3">
        <CompanyLogo logo={job.organization_logo} name={job.organization} size="md" />

        <div className="min-w-0 flex-1">
          <h3
            className={[
              'font-display text-sm font-semibold leading-snug line-clamp-2',
              isSelected ? 'text-coral-700' : 'text-gray-900 group-hover:text-coral-700',
            ].join(' ')}
          >
            {job.title}
          </h3>
          <p className="mt-0.5 text-sm text-gray-500 truncate">{job.organization}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <WorkArrangementBadge arrangement={job.ai_work_arrangement} />
        {location && (
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <svg className="h-3 w-3 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path
                fillRule="evenodd"
                d="M8 1.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM2 6a6 6 0 1110.174 4.31l2.757 2.758a.75.75 0 01-1.06 1.06l-2.758-2.757A6 6 0 012 6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="truncate max-w-[180px]">{location}</span>
          </span>
        )}
        <span className="ml-auto shrink-0 text-xs text-gray-400">
          {formatRelativeDate(job.date_posted)}
        </span>
      </div>
    </article>
  )
}
