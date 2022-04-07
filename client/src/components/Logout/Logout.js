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
    setSearchTerm,
    setWishlistFiltered
  } = useGlobalContext()

  const hide = () => {
    log.current.style.transform = 'translateX(100%)'
  }

  const logout = () => {
    localStorage.removeItem('name')
    localStorage.removeItem('token')
    localStorage.removeItem('term')
    localStorage.removeItem('page')
    setSearchedMovies([])
    setWishlistFiltered([])
    setUser('')
    setToken('')
    setWishlist([])
    setSearchTerm('')
    log.current.style.transform = 'translateX(100%)'
    //window.location.reload()
  }

  return (
    <div
      ref={log}
      className={toggleMode === 'white' ? 'logout dark' : 'logout light'}
    >
      <h4>Do you want to logout?</h4>
      <div className='options'>
        <h5 onClick={logout}>Yes</h5>
        <h5 onClick={hide}>No</h5>
      </div>
    </div>
  )
}

export default Logout
