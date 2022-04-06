import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useGlobalContext } from '../../context/context'

// Styles
import './SearchFooter.css'

const SearchFooter = () => {
  const {
    toggleMode,
    activeGenre,
    setActiveGenre,
    loadMovies,
    setPage
  } = useGlobalContext()

  const navigate = useNavigate()

  const handleClick = category => {
    setActiveGenre(0)
    localStorage.setItem('category', category)
    setPage(1)

    navigate('/')

    loadMovies(category, 1)
  }

  return (
    <div
      className={
        toggleMode === 'white'
          ? 'footer footerWhiteBackground footerWhiteColor'
          : 'footer footerBlackBackground footerBlackColor'
      }
    >
      <h1 className='name' onClick={() => handleClick('popular')}>
        Moviefy
      </h1>
    </div>
  )
}

export default SearchFooter
