import { useState, useEffect } from 'react'

interface User {
  name: string
  lastName: string
  birthDay: string
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [userLoading, setUserLoading] = useState(true)
  const [userError, setUserError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      setUserLoading(true)
      try {
        const response = await fetch('https://rimac-front-end-challenge.netlify.app/api/user.json')
        if (!response.ok) throw new Error('Error fetching user')
        const data = await response.json()
        setUser(data)
        setUserError(null)
      } catch {
        setUserError('No se pudieron cargar los datos del usuario.')
      } finally {
        setUserLoading(false)
      }
    }

    fetchUser()
  }, [])

  return {
    user,
    userLoading,
    userError,
  }
}
