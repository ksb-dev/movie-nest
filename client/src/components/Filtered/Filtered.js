import React, { useEffect, useRef } from 'react'

import { useGlobalContext } from '../../context/context'

import './Filtered.css'

const Filtered = ({ activeGenre, setActiveGenre }) => {
  const {
    movies,
    setFiltered,
    wishlist,
    setWishlistFiltered,
    more,
    toggleMode
  } = useGlobalContext()

  const dropDown = useRef(null)

  useEffect(() => {
    if (activeGenre === 0) {
      setFiltered(movies)
      setWishlistFiltered(wishlist)
      return
    }

    if (activeGenre === 1) {
      const lowestToHighest = movies.sort(
        (a, b) => a.vote_average - b.vote_average
      )

      const inc = lowestToHighest.map(movie => movie)

      const lowestToHighestWishlist = wishlist.sort(
        (a, b) => a.movie_vote - b.movie_vote
      )

      const incw = lowestToHighestWishlist.map(movie => movie)

      setFiltered(inc)
      setWishlistFiltered(incw)
      return
    }

    if (activeGenre === 2) {
      const highestToLowest = movies.sort(
        (a, b) => b.vote_average - a.vote_average
      )

      const inc = highestToLowest.map(movie => movie)

      const highestToLowestWishlist = wishlist.sort(
        (a, b) => b.movie_vote - a.movie_vote
      )

      const incw = highestToLowestWishlist.map(movie => movie)

      setFiltered(inc)
      setWishlistFiltered(incw)
      return
    }

    if (activeGenre === 3) {
      const ascendingMovies = movies.sort(function (a, b) {
        return a.title.localeCompare(b.title) //using String.prototype.localCompare()
      })

      const inc = ascendingMovies.map(movie => movie)

      const ascendingWishlist = wishlist.sort(function (a, b) {
        return a.movie_name.localeCompare(b.movie_name) //using String.prototype.localCompare()
      })

      const incw = ascendingWishlist.map(movie => movie)

      setFiltered(inc)
      setWishlistFiltered(incw)
      return
    }

    if (activeGenre === 4) {
      const descendingMovies = movies.sort(function (a, b) {
        return b.title.localeCompare(a.title) //using String.prototype.localCompare()
      })

      const inc = descendingMovies.map(movie => movie)

      const descendingWishlist = wishlist.sort(function (a, b) {
        return b.movie_name.localeCompare(a.movie_name) //using String.prototype.localCompare()
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
  }, [activeGenre, more])

  const handleClick = () => {
    setActiveGenre(Number(dropDown.current.value))
  }

  return (
    <div className='filtered'>
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
          toggleMode === 'white' ? 'select filterDark' : 'select filterWhite'
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
    </div>
  )
}

export default Filtered
