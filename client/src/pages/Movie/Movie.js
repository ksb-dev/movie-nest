import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import Cast from '../../components/Cast/Cast'
import PersonDetail from '../../components/PersonDetail/PersonDetail'
import ImageInfo from '../../components/ImageInfo/ImageInfo'
import Youtube from '../../components/Youtube/Youtube'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import { motion } from 'framer-motion'

import './Movie.css'

const Movie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState({})
  const [trailerUrl, setTrailerUrl] = useState('')
  const [people, setPeople] = useState([])
  const [person, setPerson] = useState({})
  const [personError, setPersonError] = useState(false)
  const [read, setRead] = useState(false)

  const {
    toggleMode,
    error,
    setError,
    isLoading,
    setIsLoading
  } = useGlobalContext()

  const GET_DETAILS = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
  const GET_CAST = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`

  const off = useRef(null)
  const youtube_div = useRef(null)
  const detail = useRef(null)

  const fetchMovie = useCallback(
    async url => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })

      setIsLoading(true)
      try {
        const response = await fetch(url)
        const data = await response.json()

        if (data) {
          setIsLoading(false)
          setMovie(data)
        }
      } catch (error) {
        setIsLoading(false)
        setError({ show: true, msg: 'Movie Details Not Found' })
      }
    },
    [setError, setIsLoading]
  )

  useEffect(() => {
    fetchMovie(GET_DETAILS)
  }, [id, GET_DETAILS, fetchMovie])

  useEffect(() => {
    const getCast = async url => {
      const response = await fetch(url)
      const cast = await response.json()

      if (cast) {
        setPeople(cast.cast)
      }
    }
    getCast(GET_CAST)
  }, [GET_CAST])

  if (isLoading) {
    return <div className='loading'></div>
  }

  if (error.show) {
    return (
      <div className='page-error'>
        <h1>{error.msg}</h1>
      </div>
    )
  }

  const { overview } = movie

  const getTrailer = async id => {
    youtube_div.current.style.transform = 'translateY(0%)'

    if (trailerUrl && id) {
      setTrailerUrl('')
    } else {
      try {
        let response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
        )
        let trailerUrl = await response.json()

        trailerUrl.results.map(result => {
          if (result.official === true) {
            setTrailerUrl(result.key)
          }
          return 0
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='full-page'>
      <Header />

      {/* Single Movie */}

      <div
        className={
          toggleMode === 'white' ? 'whole whiteAlpha' : 'whole blackAlpha'
        }
      >
        <div className='single-movie'>
          {/* Image Information */}

          <ImageInfo
            movie={movie}
            getTrailer={getTrailer}
            id={id}
            trailerUrl={trailerUrl}
          />

          <motion.h6
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className={toggleMode === 'white' ? 'hrlineBlack' : 'hrlineWhite'}
          ></motion.h6>

          {/* Overview */}

          {overview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className={
                toggleMode === 'white'
                  ? 'overview blackColor'
                  : 'overview whiteColor'
              }
            >
              <h3>Overview</h3>
              <h4>
                {!read && overview.substring(0, 250) + '...'}

                {!read && overview.length > 250 && (
                  <span onClick={() => setRead(true)}>
                    {' '}
                    read more <i class='fa-solid fa-plus'></i>
                  </span>
                )}

                {read && overview}

                {read && overview.length > 250 && (
                  <span onClick={() => setRead(false)}>
                    {' '}
                    hide more <i class='fa-solid fa-minus'></i>
                  </span>
                )}
              </h4>
            </motion.div>
          )}

          <motion.h6
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className={toggleMode === 'white' ? 'hrlineBlack' : 'hrlineWhite'}
          ></motion.h6>

          {/* Cast */}

          {people && (
            <Cast
              people={people}
              setPerson={setPerson}
              personError={personError}
              setPersonError={setPersonError}
              detail={detail}
            />
          )}
        </div>
      </div>

      {/* person detail */}

      <PersonDetail detail={detail} person={person} />

      {/* youtube-div div*/}

      <Youtube
        off={off}
        youtube_div={youtube_div}
        trailerUrl={trailerUrl}
        setTrailerUrl={setTrailerUrl}
      />

      <Footer />
    </div>
  )
}

export default Movie
