import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import Logout from '../Logout/Logout'

// Styles
import './Header.css'

const Header = () => {
  const {
    toggleMode,
    setToggleMode,
    loadMovies,
    setPage,
    isLoading,
    user,
    setActiveGenre
  } = useGlobalContext()
  const [userName, setUserName] = useState('')

  useEffect(() => {
    setUserName(user)
    setToggleMode(localStorage.getItem('mode'))
  }, [isLoading, user, setToggleMode])

  const allMenu = useRef(null)
  const back = useRef(null)
  const log = useRef(null)

  const navigate = useNavigate()

  const toggle = mode => {
    if (mode === 'white') {
      setToggleMode('black')
      localStorage.setItem('mode', 'black')
    } else {
      setToggleMode('white')
      localStorage.setItem('mode', 'white')
    }
  }

  const hideMenu = () => {
    allMenu.current.style.transform = 'translateX(100%)'
    back.current.style.transform = 'translateX(100%)'
  }

  const showMenu = () => {
    allMenu.current.style.transform = 'translateX(0%)'
    back.current.style.transform = 'translateX(0%)'
  }

  const showLogout = () => {
    log.current.style.transform = 'translateX(0%)'
  }

  const handleClick = category => {
    setActiveGenre(0)
    localStorage.setItem('category', category)
    setPage(1)

    navigate('/')

    loadMovies(category, 1)

    allMenu.current.style.transform = 'translateX(100%)'
    back.current.style.transform = 'translateX(100%)'
  }

  return (
    <>
      <Logout log={log} />
      <div
        ref={back}
        className={
          toggleMode === 'white'
            ? 'backMenu backWhiteBackground'
            : 'backMenu backBlackBackground'
        }
      >
        <div
          ref={allMenu}
          className={
            toggleMode === 'white'
              ? 'all-menu menuWhiteBackground'
              : 'all-menu menuBlackBackground'
          }
        >
          <ul
            className={
              toggleMode === 'white'
                ? 'all-menu-list headerBlackColor'
                : 'all-menu-list headerWhiteColor'
            }
          >
            <li>
              <i className='fa-solid fa-xmark fa-2x' onClick={hideMenu}></i>
            </li>
            <li className='bookmarks' onClick={hideMenu}>
              <Link to='/bookmarks'>Wishlist</Link>
            </li>
            <li onClick={() => handleClick('popular')}>Popular</li>
            <li onClick={() => handleClick('trending')}>Trending</li>
            <li onClick={() => handleClick('now playing')}>Now Playing</li>
            <li onClick={() => handleClick('upcoming')}>Upcoming</li>
            <li onClick={() => handleClick('top rated')}>Top Rated</li>
          </ul>
        </div>
      </div>

      {/* Name, search, mode, menu */}

      <div
        className={
          toggleMode === 'white'
            ? 'header headerBlackBg headerWhiteColor'
            : 'header headerWhiteBg headerBlackColor'
        }
      >
        <div className='name-mode-menu'>
          <h4 onClick={() => handleClick('popular')}>Moviefy</h4>

          <div className='mode-menu'>
            <p>
              <Link
                to='/'
                className={
                  toggleMode === 'white'
                    ? 'headerWhiteColor'
                    : 'headerBlackColor'
                }
              >
                <i className='fa-solid fa-house'></i>
                <span>Home</span>
              </Link>
            </p>

            <p>
              <Link
                to='/search'
                className={
                  toggleMode === 'white'
                    ? 'headerWhiteColor'
                    : 'headerBlackColor'
                }
              >
                <i
                  className={
                    toggleMode === 'white'
                      ? 'fa-solid fa-magnifying-glass headerWhiteColor'
                      : 'fa-solid fa-magnifying-glass headerBlackColor'
                  }
                ></i>
                <span>Search</span>
              </Link>
            </p>

            {toggleMode === 'white' ? (
              <p
                className='mode headerWhiteColor'
                onClick={() => toggle(toggleMode)}
              >
                <i className='fa-solid fa-moon headerWhiteColor'></i>
                <span>Dark</span>
              </p>
            ) : (
              <p
                className='mode headerBlackColor'
                onClick={() => toggle(toggleMode)}
              >
                <i className='fa-solid fa-sun headerBlackColor'></i>
                <span>Light</span>
              </p>
            )}

            {!userName && (
              <p>
                <Link
                  to='/login'
                  className={
                    toggleMode === 'white'
                      ? 'headerWhiteColor'
                      : 'headerBlackColor'
                  }
                >
                  <i
                    className={
                      toggleMode === 'white'
                        ? 'fa-solid fa-circle-user headerWhiteColor'
                        : 'fa-solid fa-circle-user headerBlackColor'
                    }
                  ></i>
                  <span>Login</span>
                </Link>
              </p>
            )}

            {userName && (
              <p onClick={showLogout}>
                <Link
                  to='#'
                  className={
                    toggleMode === 'white'
                      ? 'headerWhiteColor'
                      : 'headerBlackColor'
                  }
                >
                  <i
                    className={
                      toggleMode === 'white'
                        ? 'fa-solid fa-circle-user headerWhiteColor'
                        : 'fa-solid fa-circle-user headerBlackColor'
                    }
                  ></i>
                  <span>{userName}</span>
                </Link>
              </p>
            )}

            <p className='menu' onClick={showMenu}>
              <i
                className={
                  toggleMode === 'white'
                    ? 'fa fa-bars-staggered headerWhiteColor'
                    : 'fa fa-bars-staggered headerBlackColor'
                }
              ></i>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
