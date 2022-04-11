import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Context
import { useGlobalContext } from '../../context/context'

// Hooks

// Styles
import './MovieCard.css'

const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
  genre_ids
}) => {
  const { toggleMode, wishlist, user, getWishlist } = useGlobalContext()

  const [bookmark, setBookmark] = useState(false)

  useEffect(() => {
    if (wishlist) {
      for (let i = 0; i < wishlist.length; i++) {
        if (wishlist[i].movie_id === id) {
          setBookmark(true)
        }
      }
    }

    if (wishlist.length === 0) setBookmark(false)
  }, [wishlist])

  const getClassByRate = vote => {
    if (vote >= 8) {
      return 'green'
    } else if (vote >= 5) {
      return 'orange'
    } else {
      return 'red'
    }
  }

  const addBookmark = async (
    id,
    title,
    poster_path,
    release_date,
    vote_average,
    genre_ids
  ) => {
    const token = localStorage.getItem('token')

    try {
      const response = await axios.post(
        '/api/v1/wishlist',
        {
          movie_data: {
            movie_id: id,
            movie_name: title,
            poster_path,
            movie_vote: vote_average,
            release_date,
            genre: genre_ids
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response) getWishlist()

      //setWishlist(response.data.wishlists)
    } catch (error) {
      //console.log(error.response.data.message)
    }
  }

  const deleteBookmark = async movieId => {
    const token = localStorage.getItem('token')

    try {
      const response = await axios.delete(`/api/v1/wishlist/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response) {
        setBookmark(false)
        getWishlist()
      }

      //setWishlist(response.data.wish)

      //window.location.reload()
    } catch (error) {
      //console.log(error.response.data.message)
    }
  }

  return (
    <>
      <Link to={`/movie/${id}`}>
        <div
          className={
            toggleMode === 'white'
              ? 'img-rating movieInfoBlackBg'
              : 'img-rating movieInfoWhiteBg'
          }
        >
          <img
            src={poster_path === null ? url : IMG_PATH + poster_path}
            alt={title}
          />

          <span className={getClassByRate(vote_average)}>{vote_average}</span>
        </div>
      </Link>

      <div
        className={
          toggleMode === 'white'
            ? 'movie-info movieInfoBlackBg'
            : 'movie-info movieInfoWhiteBg'
        }
      >
        <div className='title-year'>
          <h5
            className={
              toggleMode === 'white' ? 'title darkTitle' : 'title lightTitle'
            }
          >
            {title &&
              (title.length > 30 ? title.substring(0, 30) + '...' : title)}
          </h5>

          <div>
            <h5
              className={
                toggleMode === 'white' ? 'year darkTitle' : 'year lightTitle'
              }
            >
              {release_date ? release_date.substring(0, 4) : ''}
            </h5>
          </div>
        </div>

        <div className='rating-bookmark'>
          {user && !bookmark && (
            <h5
              id='add'
              onClick={() =>
                addBookmark(
                  id,
                  title,
                  poster_path,
                  release_date,
                  vote_average,
                  genre_ids
                )
              }
            >
              <i className='fa-solid fa-plus'></i> Wishlist
            </h5>
          )}

          {user && bookmark && (
            <h5 id='remove' onClick={() => deleteBookmark(id)}>
              <i className='fa-solid fa-trash-can'></i> Wishlist
            </h5>
          )}

          {!user && <h5 id='add'>Login to wishlist</h5>}
        </div>
      </div>
    </>
  )
}

export default MovieCard
