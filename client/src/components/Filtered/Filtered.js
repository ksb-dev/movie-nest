import React, { useEffect, useRef } from 'react'

import { useGlobalContext } from '../../context/context'

import './Filtered.css'

const Filtered = ({ activeGenre, setActiveGenre }) => {
  const {
    movies,
    setFiltered,
    wishlist,
    wishlistFiltered,
    setWishlistFiltered,
    more,
    setMore
  } = useGlobalContext()

  const dropDown = useRef(null)

  useEffect(() => {
    if (activeGenre === 0) {
      setFiltered(movies)
      setWishlistFiltered(wishlist)
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
      <select ref={dropDown} onClick={handleClick}>
        <option value='0'>All</option>
        <option value='28'>Action</option>
        <option value='12'>Adventure</option>
        <option value='53'>Thriller</option>
        <option value='35'>Comedy</option>
        <option value='27'>Horror</option>
      </select>
    </div>
  )
}

export default Filtered
