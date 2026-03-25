import { apiFetch } from './client'
import type { CountriesResponse } from '../types'

export function fetchCountries(): Promise<CountriesResponse> {
  return apiFetch<CountriesResponse>('/job-post-countries/')
}
