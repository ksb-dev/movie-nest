import React, { useState, useEffect } from 'react'

import axios from 'axios'

// Context
import { useGlobalContext } from '../../context/context'

import { motion } from 'framer-motion/dist/es/index'

// Styles
import './ImageInfo.css'

const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const ImageInfo = ({ movie, getTrailer, id }) => {
  const { toggleMode, wishlist, getWishlist, user } = useGlobalContext()

  const [bookmark, setBookmark] = useState(false)

  const {
    poster_path,
    title,
    release_date,
    genres,
    runtime,
    tagline,
    vote_average,
    vote_count,
    original_language,
    backdrop_path
  } = movie

  useEffect(() => {
    if (wishlist) {
      wishlist.map(wish => {
        if (wish.movie_id === Number(id)) setBookmark(true)
      })
    }
    if (wishlist.length === 0) setBookmark(false)
  }, [wishlist])

  const addBookmark = async (
    id,
    title,
    poster_path,
    release_date,
    vote_average
  ) => {
    const token = localStorage.getItem('token')

    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/wishlist',
        {
          movie_data: {
            movie_id: id,
            movie_name: title,
            poster_path,
            movie_vote: vote_average,
            release_date
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response) getWishlist()
      //console.log(response.data.wish)
    } catch (error) {
      //console.log(error.response.data.message)
    }
  }

  const deleteBookmark = async movieId => {
    const token = localStorage.getItem('token')

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/wishlist/${movieId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      //console.log(response.data.wishlist)

      if (response) {
        setBookmark(false)
        getWishlist()
      }
    } catch (error) {
      //console.log(error.response.data.message)
    }
  }

  const getClassByRate = vote => {
    if (vote >= 8) {
      return 'greenMovie'
    } else if (vote >= 5) {
      return 'orangeMovie'
    } else {
      return 'redMovie'
    }
  }

  return (
    <div
      className='info'
      style={{ backgroundImage: `url(${IMG_PATH + backdrop_path})` }}
    >
      {/* start of Image + Rating */}

      <div
        className={
          toggleMode === 'white'
            ? 'img-more-info moreInfoWhiteAlpha blackMovieColor'
            : 'img-more-info moreInfoBlackAlpha whiteMovieColor'
        }
      >
        <div className='img-rating'>
          <img
            src={poster_path === null ? url : IMG_PATH + poster_path}
            alt={title}
          />

          {vote_average && (
            <div className='rating'>
              <h5 className='vote-average'>
                <span className={getClassByRate(vote_average)}>
                  {vote_average}
                </span>
              </h5>
            </div>
          )}

          {user && !bookmark && (
            <h5
              id='add'
              onClick={() =>
                addBookmark(id, title, poster_path, release_date, vote_average)
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

        {/* end of Image + Rating */}

        {/* start of more-info div */}

        <div className='more-info'>
          {title && <h3 className='title'>{title}</h3>}

          {tagline && (
            <h4 className={getClassByRate(vote_average)} id='tagline'>
              {tagline}
            </h4>
          )}

          {/* genre-div div */}

          <div className='genre-div'>
            {genres &&
              genres.map(genre => {
                return (
                  <h6
                    className={
                      toggleMode === 'white' ? 'whiteGenre' : 'blackGenre'
                    }
                    id='genre'
                    key={genre.id}
                  >
                    {genre.name}
                  </h6>
                )
              })}
          </div>

          {release_date && (
            <h5>
              release date : <span className='release'>{release_date}</span>
            </h5>
          )}

          {runtime && (
            <h5>
              runtime : <span className='runtime'>{runtime} minutes</span>
            </h5>
          )}

          {original_language && (
            <h5>
              language : <span className='language'>{original_language}</span>{' '}
            </h5>
          )}

          {vote_count && (
            <h5>
              vote count : <span className='vote'>{vote_count}</span>{' '}
            </h5>
          )}

          {title && (
            <button
              className={
                toggleMode === 'white'
                  ? 'trailer-btn whiteBtn'
                  : 'trailer-btn blackBtn'
              }
              onClick={() => getTrailer(id)}
            >
              <i className='fa-solid fa-circle-play fa-3x'></i>
            </button>
          )}

          {!title &&
            !genres &&
            !vote_average &&
            !vote_count &&
            !original_language &&
            !runtime &&
            !release_date &&
            !tagline && <h5>No details found</h5>}
        </div>

        {/* end of more-info div */}
      </div>
    </div>
  )
}

export default ImageInfo
