import { useState } from 'react'
import { useCountries } from '../hooks/useCountries'
import type { SearchParams } from '../types'
import { LoadingSpinner } from './LoadingSpinner'

interface Props {
  onSearch: (params: SearchParams) => void
  initialParams?: SearchParams
}

export function SearchBar({ onSearch, initialParams }: Props) {
  const [q,       setQ      ] = useState(initialParams?.q       ?? '')
  const [country, setCountry] = useState(initialParams?.country ?? '')

  const { data: countriesData, isLoading: countriesLoading } = useCountries()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSearch({ q: q.trim(), country })
  }

  return (
    <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-screen-xl px-4 py-3">
        {/* Brand mark */}
        <div className="mb-3 flex items-center gap-2">
          <span className="font-display text-lg font-bold tracking-tight text-gray-900">
            job<span className="text-coral-500">board</span>
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
          {/* Keyword input */}
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 111.06-1.06l2.755 2.754a.75.75 0 11-1.06 1.06l-2.755-2.754zM10.5 7a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <input
              type="search"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Job title, skills, company…"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-coral-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coral-100"
            />
          </div>

          {/* Country dropdown */}
          <div className="relative sm:w-48">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 0011.386-4.373c-.379.68-.898 1.25-1.521 1.62C10.857 5.6 10 6.257 10 7v1H9V7c0-1.228 1.112-2.107 2.015-2.607A5.5 5.5 0 002.16 9H3c.828 0 1.5.672 1.5 1.5v1A1.5 1.5 0 006 13v.5a6.472 6.472 0 01-4.5-5.5z" />
              </svg>
            </span>
            {countriesLoading ? (
              <div className="flex h-[42px] items-center justify-center rounded-xl border border-gray-200 bg-gray-50 px-4">
                <LoadingSpinner size="sm" />
              </div>
            ) : (
              <select
                value={country}
                onChange={e => setCountry(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-8 text-sm text-gray-900 transition-colors focus:border-coral-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coral-100"
              >
                <option value="">All countries</option>
                {countriesData?.countries.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            )}
            {!countriesLoading && (
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                  <path d="M4.22 6.22a.75.75 0 011.06 0L8 8.94l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.22 7.28a.75.75 0 010-1.06z" />
                </svg>
              </span>
            )}
          </div>

          {/* Search button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-coral-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-coral-600 active:bg-coral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 sm:w-auto"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 111.06-1.06l2.755 2.754a.75.75 0 11-1.06 1.06l-2.755-2.754zM10.5 7a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z"
                clipRule="evenodd"
              />
            </svg>
            Search
          </button>
        </form>
      </div>
    </header>
  )
}
