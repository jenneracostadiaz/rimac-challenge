import { useQuery } from '@tanstack/react-query'
import type { User } from '../types/user.ts'

export function useUser() {
  return useQuery<User>({
    queryKey: ['user'],

    queryFn: async () => {
      const res = await fetch('https://rimac-front-end-challenge.netlify.app/api/user.json')
      if (!res.ok) throw new Error('Error fetching user')
      return res.json()
    },
  })
}
