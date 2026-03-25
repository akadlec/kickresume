import { useState } from 'react'
import type { SearchParams } from './types'
import { SearchBar } from './components/SearchBar'
import { JobList } from './components/JobList'
import { JobDetail } from './components/JobDetail'
import { JobDetailModal } from './components/JobDetailModal'

const INITIAL_PARAMS: SearchParams = { q: '', country: '' }

function EmptyDetailPanel() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-coral-50">
        <svg className="h-8 w-8 text-coral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <div>
        <p className="font-display font-semibold text-gray-700">Select a job to see details</p>
        <p className="mt-1 text-sm text-gray-400">Click any listing on the left to preview it here.</p>
      </div>
    </div>
  )
}

export default function App() {
  const [searchParams,   setSearchParams  ] = useState<SearchParams>(INITIAL_PARAMS)
  const [selectedJobId,  setSelectedJobId ] = useState<string | null>(null)
  const [mobileModalOpen, setMobileModalOpen] = useState(false)

  function handleSearch(params: SearchParams) {
    setSearchParams(params)
    setSelectedJobId(null)
  }

  function handleJobSelect(id: string) {
    setSelectedJobId(id)
    setMobileModalOpen(true)
  }

  function handleModalClose() {
    setMobileModalOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Sticky search bar */}
      <SearchBar onSearch={handleSearch} initialParams={INITIAL_PARAMS} />

      {/* Main content area */}
      <main className="mx-auto flex w-full max-w-screen-xl flex-1 gap-0 lg:gap-6 lg:px-4 lg:py-6">

        {/*
          Job list column
          - Mobile: full width
          - Desktop: fixed-width left column, independently scrollable
        */}
        <section
          aria-label="Job listings"
          className="w-full lg:w-[420px] xl:w-[480px] lg:shrink-0 lg:self-start lg:sticky lg:top-[104px] lg:h-[calc(100vh-120px)] lg:overflow-y-auto lg:scrollbar-thin lg:rounded-2xl lg:border lg:border-gray-100 lg:bg-white lg:shadow-sm"
        >
          <JobList
            searchParams={searchParams}
            selectedJobId={selectedJobId}
            onJobSelect={handleJobSelect}
          />
        </section>

        {/*
          Detail panel — desktop only (lg+)
          Sticky, full viewport height minus the search bar
        */}
        <section
          aria-label="Job details"
          className="hidden lg:flex lg:flex-1 lg:self-start lg:sticky lg:top-[104px] lg:h-[calc(100vh-120px)] lg:flex-col lg:overflow-hidden lg:rounded-2xl lg:border lg:border-gray-100 lg:bg-white lg:shadow-sm"
        >
          {selectedJobId
            ? <JobDetail jobId={selectedJobId} scrollable />
            : <EmptyDetailPanel />
          }
        </section>
      </main>

      {/* Mobile modal */}
      {mobileModalOpen && selectedJobId && (
        <div className="lg:hidden">
          <JobDetailModal jobId={selectedJobId} onClose={handleModalClose} />
        </div>
      )}
    </div>
  )
}
