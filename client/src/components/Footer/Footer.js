import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useGlobalContext } from '../../context/context'

import Filtered from '../Filtered/Filtered'

// Styles
import './Footer.css'

const Footer = () => {
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
          ? 'footer footerBlackBackground footerBlackColor'
          : 'footer footerWhiteBackground footerWhiteColor'
      }
    >
      <h1 className='name' onClick={() => handleClick('popular')}>
        Moviefy
      </h1>
      {window.location.pathname === '/' && (
        <div className='footer-filter'>
          <i
            class={
              toggleMode === 'white'
                ? 'fa-solid fa-filter footerBlackColor'
                : 'fa-solid fa-filter footerWhiteColor'
            }
          ></i>
          <Filtered activeGenre={activeGenre} setActiveGenre={setActiveGenre} />
        </div>
      )}
    </div>
  )
}

export default Footer
