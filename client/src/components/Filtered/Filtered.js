import React, { useState, useEffect } from 'react'

import { useGlobalContext } from '../../context/context'

import './Filtered.css'

const Filtered = ({ activeGenre, setActiveGenre }) => {
  const {
    movies,
    setFiltered,
    wishlist,
    setWishlistFiltered,
    more,
    setMore,
    isLoading,
    toggleMode,
    filtered
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
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    if (activeGenre === 0) {
      const films = movies.map(movies => movies)
      setFiltered(films)
      const wish = wishlist.map(movies => movies)
      setWishlistFiltered(wish)
      return
    }

    if (activeGenre === 1) {
      const films = []

      movies.forEach(film => {
        films.push(film)
      })

      const lowestToHighest = films.sort(
        (a, b) => a.vote_average - b.vote_average
      )

      const inc = lowestToHighest.map(movie => movie)

      const wish = []

      wishlist.forEach(film => {
        wish.push(film)
      })

      const lowestToHighestWishlist = wish.sort(
        (a, b) => a.movie_vote - b.movie_vote
      )

      const incw = lowestToHighestWishlist.map(movie => movie)

      setFiltered(inc)
      setWishlistFiltered(incw)
      return
    }

    if (activeGenre === 2) {
      const films = []

      movies.forEach(film => {
        films.push(film)
      })

      const highestToLowest = films.sort(
        (a, b) => b.vote_average - a.vote_average
      )

      const inc = highestToLowest.map(movie => movie)

      const wish = []

      wishlist.forEach(film => {
        wish.push(film)
      })

      const highestToLowestWishlist = wish.sort(
        (a, b) => b.movie_vote - a.movie_vote
      )

      const incw = highestToLowestWishlist.map(movie => movie)

      setFiltered(inc)
      setWishlistFiltered(incw)
      return
    }

    if (activeGenre === 3) {
      const films = []

      movies.forEach(film => {
        films.push(film)
      })

      const ascendingMovies = films.sort(function (a, b) {
        if (a.title) return a.title.localeCompare(b.title)
      })

      const inc = ascendingMovies.map(movie => movie)

      const wish = []

      wishlist.forEach(film => {
        wish.push(film)
      })

      const ascendingWishlist = wish.sort(function (a, b) {
        return a.movie_name.localeCompare(b.movie_name)
      })

      const incw = ascendingWishlist.map(movie => movie)

      setFiltered(inc)
      setWishlistFiltered(incw)
      return
    }

    if (activeGenre === 4) {
      const films = []

      movies.forEach(film => {
        films.push(film)
      })

      const descendingMovies = films.sort(function (a, b) {
        if (b.title) return b.title.localeCompare(a.title)
      })

      const inc = descendingMovies.map(movie => movie)

      const wish = []

      wishlist.forEach(film => {
        wish.push(film)
      })

      const descendingWishlist = wish.sort(function (a, b) {
        return b.movie_name.localeCompare(a.movie_name)
      })

      const incw = descendingWishlist.map(movie => movie)

      setFiltered(inc)
      setWishlistFiltered(incw)
      return
    }

    const filter = movies.filter(movie => movie.genre_ids.includes(activeGenre))
    setFiltered(filter)

    const filterWishlist = wishlist.filter(movie =>
      movie.genre.includes(activeGenre)
    )
    setWishlistFiltered(filterWishlist)
  }, [activeGenre, more, isLoading])

  const handleClick = genre => {
    if (genre === 'All') {
      setActiveGenre(0)
    } else if (genre === 'Action') {
      setActiveGenre(28)
    } else if (genre === 'Adventure') {
      setActiveGenre(12)
    } else if (genre === 'Animation') {
      setActiveGenre(16)
    } else if (genre === 'Thriller') {
      setActiveGenre(53)
    } else if (genre === 'Comedy') {
      setActiveGenre(35)
    } else if (genre === 'Crime') {
      setActiveGenre(80)
    } else if (genre === 'Drama') {
      setActiveGenre(18)
    } else if (genre === 'Horror') {
      setActiveGenre(27)
    } else if (genre === 'Rating (1 - 9)') {
      setActiveGenre(1)
    } else if (genre === 'Rating (9 - 1)') {
      setActiveGenre(2)
    } else if (genre === 'Title (A - Z)') {
      setActiveGenre(3)
    } else {
      setActiveGenre(4)
    }
  }

  return (
    /*<div className='filtered'>
      <i
        className={
          toggleMode === 'white'
            ? 'fa-solid fa-filter iconDark'
            : 'fa-solid fa-filter iconWhite'
        }
      ></i>
      <select
        ref={dropDown}
        onClick={handleClick}
        className={
          toggleMode === 'white' ? 'select filterDark' : 'select filterLight'
        }
      >
        <option value='0'>All</option>
        <option value='28'>Action</option>
        <option value='12'>Adventure</option>
        <option value='53'>Thriller</option>
        <option value='35'>Comedy</option>
        <option value='27'>Horror</option>
        <option value='1'>Lowest (1 - 9)</option>
        <option value='2'>Highest (9 - 1)</option>
        <option value='3'>Ascending (A - Z)</option>
        <option value='4'>Descending (Z - A)</option>
      </select>
    </div>*/
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
          {filtered.length === 20 && selected}
          {filtered.length !== 20 &&
            localStorage.getItem('genre') &&
            localStorage.getItem('genre')}

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
                    localStorage.setItem('genre', e.target.textContent)
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

export default Filtered
