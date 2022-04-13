import React from 'react'
import { useState, useEffect } from 'react'

// Recat Router
import { Link, useNavigate } from 'react-router-dom'

// Hooks
import { useLogin } from '../../hooks/useLogin'

// Context
import { useGlobalContext } from '../../context/context'

import { motion } from 'framer-motion'

// styles
import './Login.css'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const { error, isPending, login } = useLogin()

  const {
    user,
    setSearchedMovies,
    setSearchTerm,
    loadMovies
  } = useGlobalContext()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      localStorage.removeItem('term')
      localStorage.setItem('mode', 'white')
      localStorage.removeItem('genre')
      localStorage.setItem('mode', 'white')
      localStorage.removeItem('page')
      localStorage.removeItem('activeGenre')
      loadMovies('popular', 1)
      setSearchedMovies([])
      setSearchTerm('')
      navigate('/')
      window.location.reload()
    }
  }, [user, navigate])

  const handleSubmit = e => {
    e.preventDefault()
    login(email, password)
  }

  const handleClick = () => {
    setShow(!show)
  }

  return (
    <div className='main'>
      <Link to='/'>
        <motion.h4
          initial={{ x: '100vw' }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          <i className='fa-solid fa-arrow-left'></i> Back to home
        </motion.h4>
      </Link>
      <motion.div
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2, duration: 0.2 }}
        className='title'
      >
        <h1>Moviefy</h1>
      </motion.div>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        onSubmit={handleSubmit}
        className='login-form'
      >
        <h2>login</h2>

        <label>
          <span>email</span>
          <input
            type='email'
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </label>

        <label>
          <div className='eye'>
            <span>password</span>
            {password && !show && (
              <i className='fa-regular fa-eye' onClick={handleClick}></i>
            )}
            {password && show && (
              <i className='fa-regular fa-eye-slash' onClick={handleClick}></i>
            )}
          </div>
          <input
            type={show ? 'text' : 'password'}
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </label>

        {!isPending && <button className='btn'>Login</button>}

        {isPending && <button className='btn'>Loggging in</button>}

        <h5>
          Don't have an account ? <Link to='/signup'>Signup</Link>
        </h5>

        {error && <h4 style={{ color: '#fff' }}>{error}</h4>}
      </motion.form>
    </div>
  )
}
