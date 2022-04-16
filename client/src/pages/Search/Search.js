import React, { useEffect, useState } from 'react'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import SearchedMovies from '../../components/SearchedMovies/SearchedMovies'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import './Search.css'

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query="`

const Search = () => {
  const { searchMovies, toggleMode, isLoading } = useGlobalContext()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const query = localStorage.getItem('term')
    if (isLoading && query) searchMovies(SEARCH_API + query, query)
  }, [isLoading])

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  })

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
              ? 'search-form lightInputSearch'
              : 'search-form darkInputSearch'
          }
          onSubmit={e => {
            e.preventDefault()
            localStorage.setItem('term', query)
            searchMovies(SEARCH_API + query, query)
          }}
          id='input'
        >
          <input
            type='text'
            className={
              toggleMode === 'white'
                ? 'form-input darkColorSearch'
                : 'form-input lightColorSearch'
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
