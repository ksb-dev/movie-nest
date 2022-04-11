import React from 'react'
import { useState, useEffect } from 'react'

// Recat Router
import { Link, useNavigate } from 'react-router-dom'

// Hooks
import { useLogin } from '../../hooks/useLogin'

// Context
import { useGlobalContext } from '../../context/context'

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
      navigate('/')
      localStorage.removeItem('term')
      localStorage.setItem('mode', 'white')
      localStorage.removeItem('genre')
      localStorage.setItem('mode', 'white')
      localStorage.removeItem('page')
      loadMovies('popular', 1)
      setSearchedMovies([])
      setSearchTerm('')
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
        <h4>
          <i className='fa-solid fa-arrow-left'></i> Back to home
        </h4>
      </Link>
      <div className='title'>
        <h1>Moviefy</h1>
      </div>

      <form onSubmit={handleSubmit} className='login-form'>
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
      </form>
    </div>
  )
}
