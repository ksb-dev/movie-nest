import React from 'react'

import { useGlobalContext } from '../../context/context'

import './Logout.css'

const Logout = ({ log }) => {
  const {
    toggleMode,
    setUser,
    setToken,
    setSearchedMovies,
    setWishlist,
    setSearchTerm
  } = useGlobalContext()

  const hide = () => {
    log.current.style.transform = 'translateY(-100%)'
  }

  const logout = () => {
    localStorage.removeItem('name')
    localStorage.removeItem('token')
    localStorage.setItem('mode', 'white')
    localStorage.removeItem('term')
    setSearchedMovies([])
    setUser('')
    setToken('')
    setWishlist([])
    setSearchTerm('')
    log.current.style.transform = 'translateY(-100%)'
    //window.location.reload()
  }

  return (
    <div
      ref={log}
      className={toggleMode === 'white' ? 'logout light' : 'logout dark'}
    >
      <div className={toggleMode === 'white' ? 'box lighter' : 'box darker'}>
        <h4>Do you want to logout?</h4>
        <div className='options'>
          <h5 onClick={logout}>Yes</h5>
          <h5 onClick={hide}>No</h5>
        </div>
      </div>
    </div>
  )
}

export default Logout
