import React from 'react'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import Header from '../../components/Header/Header'
import MovieCard from '../../components/MovieCard/MovieCard'
import Footer from '../../components/Footer/Footer'

// Style
import './Movies.css'

const Movies = () => {
  let {
    movies,
    isLoading,
    category,
    toggleMode,
    fetchMovies,
    page,
    setPage
  } = useGlobalContext()

  const POPULAR = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`
  const TRENDING = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&page=${page}`
  const NOW_PLAYING = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=${page}`
  const UPCOMING = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=${page}`
  const TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=${page}`

  if (isLoading) {
    return <div className='loading'></div>
  }

  const handleClick = () => {
    setPage(page + 1)

    if (category === 'popular') fetchMovies(POPULAR, 'popular', page)
    if (category === 'trending') fetchMovies(TRENDING, 'trending', page)
    if (category === 'now_playing')
      fetchMovies(NOW_PLAYING, 'now_playing', page)
    if (category === 'upcoming') fetchMovies(UPCOMING, 'upcoming', page)
    if (category === 'top rated') fetchMovies(TOP_RATED, 'top_rated', page)
  }

  return (
    <>
      <Header />
      {/* single movie */}

      {/* movie category*/}

      {category && (
        <h4 className='category'>
          <span
            className={
              toggleMode === 'white'
                ? 'blackColorCategory'
                : 'whiteColorCategory'
            }
          >
            {category}
          </span>
        </h4>
      )}

      <section className='all'>
        {movies &&
          movies.map(movie => {
            const { id, title, poster_path, release_date, vote_average } = movie

            return (
              <article className='one-movie' key={id}>
                <MovieCard
                  movie={movie}
                  id={id}
                  title={title}
                  poster_path={poster_path}
                  vote_average={vote_average}
                  release_date={release_date}
                />
              </article>
            )
          })}
      </section>

      <div className='more'>
        <button onClick={handleClick}>Load More</button>
      </div>

      <Footer />
    </>
  )
}

export default Movies
