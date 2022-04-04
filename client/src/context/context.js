import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

const AppContext = React.createContext()

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query="`

const POPULAR = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc`
const TRENDING = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`
const NOW_PLAYING = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
const UPCOMING = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
const TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({ show: false, msg: '' })
  const [movies, setMovies] = useState([])
  const [toggleMode, setToggleMode] = useState('white')
  const [category, setCategory] = useState('')
  const [searchedMovies, setSearchedMovies] = useState([])
  const [searchError, setSearchError] = useState({ show: false, msg: '' })
  const [searchTerm, setSearchTerm] = useState('')
  let [page, setPage] = useState(2)
  const [user, setUser] = useState('')
  const [token, setToken] = useState('')
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    const userName = localStorage.getItem('name')
    if (userName) setUser(userName)
  }, [isLoading, user])

  const getWishlist = async () => {
    const savedToken = localStorage.getItem('token')

    try {
      const response = await axios.get(
        'http://localhost:5000/api/v1/wishlist',
        {
          headers: {
            Authorization: `Bearer ${savedToken}`
          }
        }
      )
      setWishlist(response.data.wishlists)
    } catch (error) {
      //console.log(error.response.data.message)
    }
  }

  useEffect(() => {
    if (user) {
      getWishlist()
    }
  }, [user])

  const searchMovies = async (searchTerm, queryTerm) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    setIsLoading(true)

    try {
      const response = await fetch(searchTerm)
      const data = await response.json()

      //console.log(data.results.length)

      if (queryTerm === '') {
        setSearchError({
          show: true,
          msg: 'Please Enter Something!'
        })
        setIsLoading(false)
        setSearchTerm('')
        return
      }

      if (data.results.length === 0) {
        setIsLoading(false)
        setSearchError({
          show: true,
          msg: 'Movie not found!'
        })
        setSearchedMovies('')
        setSearchTerm('')
      } else {
        setSearchedMovies(data.results)
        setSearchError({ show: false, msg: '' })
        setIsLoading(false)
        setSearchTerm(queryTerm)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMovies = async (url, category, page) => {
    if (page === 1) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })

      setIsLoading(true)
      setCategory('')
    }

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data.results.length === 0) {
        setError({ show: true, msg: 'Movies not found!' })
      } else {
        if (page === 1) {
          setMovies(data.results)
        } else {
          setMovies([...movies, ...data.results])
        }
        setError({ show: false, msg: '' })
        setIsLoading(false)
        setCategory(category)
      }
    } catch (error) {
      setError({ show: true, msg: 'Could Not Fetch Data' })
      setCategory('')
    }
  }

  const loadMovies = (category, page) => {
    if (category === 'popular') fetchMovies(POPULAR, category, page)
    if (category === 'trending') fetchMovies(TRENDING, category, page)
    if (category === 'now_playing') fetchMovies(NOW_PLAYING, category, page)
    if (category === 'upcoming') fetchMovies(UPCOMING, category, page)
    if (category === 'top_rated') fetchMovies(TOP_RATED, category, page)
  }

  useEffect(() => {
    loadMovies('popular', 1)
  }, [])

  return (
    <AppContext.Provider
      value={{
        loadMovies,
        fetchMovies,
        isLoading,
        setIsLoading,
        movies,
        searchMovies,
        error,
        setError,
        toggleMode,
        setToggleMode,
        category,
        setCategory,
        searchedMovies,
        setSearchedMovies,
        searchTerm,
        setSearchTerm,
        page,
        setPage,
        searchError,
        user,
        setUser,
        token,
        setToken,
        wishlist,
        getWishlist,
        setWishlist
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
