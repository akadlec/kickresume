import DOMPurify from 'dompurify'
import { useJobDetail } from '../hooks/useJobDetail'
import { formatRelativeDate, formatSalary } from '../utils'
import { CompanyLogo } from './CompanyLogo'
import { WorkArrangementBadge } from './WorkArrangementBadge'
import { LoadingSpinner } from './LoadingSpinner'
import { ErrorMessage } from './ErrorMessage'

interface Props {
  jobId: string
  /** In desktop sidebar mode the description is scrollable inside panel */
  scrollable?: boolean
}

function MetaRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 text-sm text-gray-600">
      <span className="mt-0.5 shrink-0 text-gray-400">{icon}</span>
      <span>{children}</span>
    </div>
  )
}

const IconPin = () => (
  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
    <path d="M8 0a5 5 0 00-5 5c0 3.5 5 11 5 11s5-7.5 5-11a5 5 0 00-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
)

const IconBriefcase = () => (
  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
    <path d="M6 2a2 2 0 00-2 2v1H1.5A1.5 1.5 0 000 6.5v6A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-6A1.5 1.5 0 0014.5 5H11V4a2 2 0 00-2-2H6zm0 1.5h4a.5.5 0 01.5.5v1H5.5V4A.5.5 0 016 3.5z" />
  </svg>
)

const IconSalary = () => (
  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
    <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm.75 4.5v.565a2.5 2.5 0 011.75 2.185h-1.5a1 1 0 00-1-1h-.5a1 1 0 000 2h.5a2.5 2.5 0 010 5v.5h-1.5v-.5a2.5 2.5 0 01-1.75-2.5h1.5a1 1 0 001 1h.5a1 1 0 000-2h-.5a2.5 2.5 0 010-5V4.5h1.5z" />
  </svg>
)

const IconCalendar = () => (
  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
    <path d="M5 0a.5.5 0 01.5.5V1h5V.5a.5.5 0 011 0V1h1A1.5 1.5 0 0114 2.5v11A1.5 1.5 0 0112.5 15h-9A1.5 1.5 0 012 13.5v-11A1.5 1.5 0 013.5 1h1V.5A.5.5 0 015 0zM3.5 2.5A.5.5 0 003 3v1h10V3a.5.5 0 00-.5-.5h-9zM3 5.5v8a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-8H3z" />
  </svg>
)

export function JobDetail({ jobId, scrollable = false }: Props) {
  const { data: job, isLoading, isError, refetch } = useJobDetail(jobId)

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-gray-400">Loading job details…</p>
      </div>
    )
  }

  if (isError || !job) {
    return (
      <div className="p-6">
        <ErrorMessage
          message="Failed to load job details."
          onRetry={() => void refetch()}
        />
      </div>
    )
  }

  const salary    = formatSalary(job.ai_salary_minvalue, job.ai_salary_maxvalue, job.ai_salary_currency)
  const location  = job.locations_derived?.[0] ?? null
  const applyHref = job.url
  const safeDescription = DOMPurify.sanitize(job.description_html)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start gap-4">
          <CompanyLogo logo={job.organization_logo} name={job.organization} size="lg" />
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-xl font-bold leading-tight text-gray-900">
              {job.title}
            </h2>
            <p className="mt-1 text-sm font-medium text-gray-500">{job.organization}</p>
          </div>
        </div>

        {/* Meta grid */}
        <div className="mt-5 flex flex-col gap-2.5">
          {location && (
            <MetaRow icon={<IconPin />}>{location}</MetaRow>
          )}
          <MetaRow icon={<IconBriefcase />}>
            <WorkArrangementBadge arrangement={job.ai_work_arrangement} />
          </MetaRow>
          {salary && (
            <MetaRow icon={<IconSalary />}>{salary}</MetaRow>
          )}
          <MetaRow icon={<IconCalendar />}>
            Posted {formatRelativeDate(job.date_posted)}
          </MetaRow>
        </div>

        {/* Desktop apply button */}
        <a
          href={applyHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-coral-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-coral-600 active:bg-coral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
        >
          Apply Now
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
            <path d="M3.75 2a.75.75 0 00-.75.75v10.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75V6.56L9.44 3H3.75zM2 2.75A2.75 2.75 0 014.75 0h4.94c.316 0 .617.123.841.341l3.5 3.444A1.75 1.75 0 0114.5 5v8.25A2.75 2.75 0 0111.75 16h-8A2.75 2.75 0 011 13.25V2.75zm7-1.03v1.78c0 .414.336.75.75.75h1.75L9 1.72z" />
          </svg>
        </a>
      </div>

      {/* Description */}
      <div
        className={[
          'px-6 py-5',
          scrollable ? 'overflow-y-auto scrollbar-thin flex-1' : '',
        ].join(' ')}
      >
        <div
          className="job-description"
          dangerouslySetInnerHTML={{ __html: safeDescription }}
        />
      </div>
    </div>
  )
}
