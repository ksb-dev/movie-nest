import React, { useState, useEffect } from 'react'

import { useGlobalContext } from '../../context/context'

const WishlistFiltered = ({ activeGenreW, setActiveGenreW }) => {
  const {
    wishlist,
    wishlistFiltered,
    setWishlistFiltered,
    more,
    isLoading,
    toggleMode
  } = useGlobalContext()

  const [isActive, setIsActive] = useState(false)

  const options = [
    'All',
    'Action',
    'Adventure',
    'Animation',
    'Thriller',
    'Comedy',
    'Crime',
    'Drama',
    'Horror',
    'Rating (1 - 9)',
    'Rating (9 - 1)',
    'Title (A - Z)',
    'Title (Z - A)'
  ]
  const [selected, setSelected] = useState('All')

  useEffect(() => {
    if (activeGenreW === 0) {
      const wish = wishlist.map(movies => movies)
      setWishlistFiltered(wish)
      return
    }

    if (activeGenreW === 1) {
      const wish = []

      wishlist.forEach(film => {
        wish.push(film)
      })

      const lowestToHighestWishlist = wish.sort(
        (a, b) => a.movie_vote - b.movie_vote
      )

      const incw = lowestToHighestWishlist.map(movie => movie)

      setWishlistFiltered(incw)
      return
    }

    if (activeGenreW === 2) {
      const wish = []

      wishlist.forEach(film => {
        wish.push(film)
      })

      const highestToLowestWishlist = wish.sort(
        (a, b) => b.movie_vote - a.movie_vote
      )

      const incw = highestToLowestWishlist.map(movie => movie)

      setWishlistFiltered(incw)
      return
    }

    if (activeGenreW === 3) {
      const wish = []

      wishlist.forEach(film => {
        wish.push(film)
      })

      const ascendingWishlist = wish.sort(function (a, b) {
        return a.movie_name.localeCompare(b.movie_name)
      })

      const incw = ascendingWishlist.map(movie => movie)

      setWishlistFiltered(incw)
      return
    }

    if (activeGenreW === 4) {
      const wish = []

      wishlist.forEach(film => {
        wish.push(film)
      })

      const descendingWishlist = wish.sort(function (a, b) {
        return b.movie_name.localeCompare(a.movie_name)
      })

      const incw = descendingWishlist.map(movie => movie)

      setWishlistFiltered(incw)
      return
    }

    const filterWishlist = wishlist.filter(movie =>
      movie.genre.includes(activeGenreW)
    )
    setWishlistFiltered(filterWishlist)
  }, [activeGenreW, more, isLoading])

  const handleClick = genre => {
    if (genre === 'All') {
      setActiveGenreW(0)
    } else if (genre === 'Action') {
      setActiveGenreW(28)
    } else if (genre === 'Adventure') {
      setActiveGenreW(12)
    } else if (genre === 'Animation') {
      setActiveGenreW(16)
    } else if (genre === 'Thriller') {
      setActiveGenreW(53)
    } else if (genre === 'Comedy') {
      setActiveGenreW(35)
    } else if (genre === 'Crime') {
      setActiveGenreW(80)
    } else if (genre === 'Drama') {
      setActiveGenreW(18)
    } else if (genre === 'Horror') {
      setActiveGenreW(27)
    } else if (genre === 'Rating (1 - 9)') {
      setActiveGenreW(1)
    } else if (genre === 'Rating (9 - 1)') {
      setActiveGenreW(2)
    } else if (genre === 'Title (A - Z)') {
      setActiveGenreW(3)
    } else {
      setActiveGenreW(4)
    }
  }

  return (
    <div className='dd'>
      <div
        className={
          toggleMode === 'white'
            ? 'dropdown filterLight'
            : 'dropdown filterDark'
        }
      >
        <div className='dropdown-btn' onClick={() => setIsActive(!isActive)}>
          {/*{selected ? selected : 'All'}*/}
          {wishlistFiltered.length === wishlist.length && selected}
          {wishlistFiltered.length !== wishlist.length &&
            localStorage.getItem('wgenre') &&
            localStorage.getItem('wgenre')}

          {isActive ? (
            <i className='fa-solid fa-caret-up'></i>
          ) : (
            <i className='fa-solid fa-caret-down'></i>
          )}
        </div>
        {isActive && (
          <div
            className={
              toggleMode === 'white'
                ? 'dropdown-content filterLight'
                : 'dropdown-content filterDark'
            }
          >
            {options.map((option, index) => {
              return (
                <div
                  key={index}
                  className='dropdown-item'
                  onClick={e => {
                    setSelected(e.target.textContent)
                    localStorage.setItem('wgenre', e.target.textContent)
                    setIsActive(!isActive)
                    handleClick(e.target.textContent)
                  }}
                >
                  {option}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default WishlistFiltered
