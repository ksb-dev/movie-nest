import { useEffect, useState } from 'react'
import axios from 'axios'

import { useGlobalContext } from '../context/context'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const { setUser, setToken } = useGlobalContext()

  const signup = async (name, email, password) => {
    setError(null)
    setIsPending(true)

    try {
      // Sign the user in
      const response = await axios.post('/api/v1/auth/register', {
        name,
        email,
        password
      })

      if (!response) {
        throw new Error('Could not complete signup')
      } else {
        localStorage.setItem('name', response.data.user.name)
        localStorage.setItem('token', response.data.token)
        setUser(response.data.user.name)
        setToken(response.data.token)
      }

      // Update state
      if (!isCancelled) {
        setError(null)
        setIsPending(false)
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.response.data.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { error, isPending, signup }
}
