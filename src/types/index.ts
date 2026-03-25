export type WorkArrangement = 'on-site' | 'hybrid' | 'remote'

export interface JobPost {
  id: string
  title: string
  organization: string
  organization_logo: string | null
  date_posted: string
  locations_derived: string[] | null
  ai_work_arrangement: WorkArrangement | null
  ai_salary_minvalue: number | null
  ai_salary_maxvalue: number | null
  ai_salary_currency: string | null
  url: string
}

export interface JobPostDetail extends JobPost {
  description_html: string
}

export interface JobPostsResponse {
  count: number
  next: string | null
  previous: string | null
  results: JobPost[]
}

export interface CountriesResponse {
  countries: string[]
}

export interface SearchParams {
  q: string
  country: string
}
