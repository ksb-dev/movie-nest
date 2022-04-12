import React from 'react'
import { useState, useEffect } from 'react'

// Recat Router
import { Link, useNavigate } from 'react-router-dom'

// Hooks
import { useSignup } from '../../hooks/useSignup'

// Context
import { useGlobalContext } from '../../context/context'

import { motion } from 'framer-motion'

// styles
import './Signup.css'

export default function Signup () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [show, setShow] = useState(false)

  const { error, isPending, signup } = useSignup()

  const { user } = useGlobalContext()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  const handleSubmit = e => {
    e.preventDefault()
    signup(displayName, email, password)
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
        className='signup-form'
      >
        <h2>sign up</h2>

        <label>
          <span>name</span>
          <input
            type='text'
            onChange={e => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>

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

        {!isPending && <button className='btn'>Signup</button>}

        {isPending && (
          <button className='btn' disabled>
            Signing up
          </button>
        )}

        <h5>
          Already have an acoount ? <Link to='/login'>Login</Link>
        </h5>

        {error && <p style={{ color: '#fff' }}>{error}</p>}
      </motion.form>
    </div>
  )
}
