import { useState, useEffect } from 'react'

interface Plan {
  name: string
  price: number
  description: string[]
  age: number
}

export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true)
      try {
        const response = await fetch('https://rimac-front-end-challenge.netlify.app/api/plans.json')
        if (!response.ok) throw new Error('Error fetching plans')
        const data = await response.json()
        setPlans(data.list)
        setError(null)
      } catch {
        setError('No se pudieron cargar los planes. Intenta nuevamente.')
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  return {
    plans,
    loading,
    error,
  }
}
