import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchJobs } from '../api/jobs'
import type { SearchParams } from '../types'

const PAGE_SIZE = 20
const MAX_OFFSET = 10_000

export function useJobSearch(params: SearchParams) {
  return useInfiniteQuery({
    queryKey: ['jobs', params],
    queryFn: ({ pageParam }) =>
      fetchJobs({
        q:       params.q       || undefined,
        country: params.country || undefined,
        limit:   PAGE_SIZE,
        offset:  pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) return undefined
      const nextOffset = allPages.length * PAGE_SIZE
      return nextOffset >= MAX_OFFSET ? undefined : nextOffset
    },
  })
}
