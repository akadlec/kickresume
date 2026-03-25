import { useQuery } from '@tanstack/react-query'
import { fetchCountries } from '../api/countries'

export function useCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: Infinity,
  })
}
