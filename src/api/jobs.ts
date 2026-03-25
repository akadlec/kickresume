import { apiFetch } from './client'
import type { JobPostDetail, JobPostsResponse } from '../types'

export interface FetchJobsParams {
  q?: string
  country?: string
  limit?: number
  offset?: number
}

export function fetchJobs(params: FetchJobsParams): Promise<JobPostsResponse> {
  return apiFetch<JobPostsResponse>('/job-posts/', {
    ...(params.q       ? { q: params.q }                : {}),
    ...(params.country ? { country: [params.country] }  : {}),
    limit:  params.limit  ?? 20,
    offset: params.offset ?? 0,
  })
}

export function fetchJobDetail(id: string): Promise<JobPostDetail> {
  return apiFetch<JobPostDetail>(`/job-posts/${id}/`)
}
