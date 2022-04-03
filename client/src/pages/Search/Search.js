import React, { useEffect } from 'react'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import SearchedMovies from '../../components/SearchedMovies/SearchedMovies'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import './Search.css'

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query="`

const Search = () => {
  const { query, setQuery, searchMovies, toggleMode } = useGlobalContext()

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [])

  return (
    <>
      <Header />
      <div
        className={
          toggleMode === 'white' ? 'search lightSearch' : 'search darkSearch'
        }
      >
        <label
          className={
            toggleMode === 'white' ? 'darkColorSearch' : 'lightColorSearch'
          }
          id='input'
        >
          Enter your search here
        </label>

        <form
          className={
            toggleMode === 'white'
              ? 'search-form darkSearch'
              : 'search-form lightSearch'
          }
          onSubmit={e => {
            e.preventDefault()
            setQuery('')
            searchMovies(SEARCH_API + query, query)
          }}
          id='input'
        >
          <input
            type='text'
            className={
              toggleMode === 'white'
                ? 'form-input lightColorSearch'
                : 'form-input darkColorSearch'
            }
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </form>
      </div>

      <SearchedMovies />

      <Footer />
    </>
  )
}

export default Search
