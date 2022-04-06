import React, { useEffect } from 'react'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import Header from '../../components/Header/Header'
import MovieCard from '../../components/MovieCard/MovieCard'
import Footer from '../../components/Footer/Footer'
import Pagination from '../../components/Pagination/Pagination'

// Style
import './Movies.css'

const Movies = () => {
  let {
    isLoading,
    category,
    toggleMode,
    fetchMovies,
    page,
    filtered,
    setFiltered,
    movies
  } = useGlobalContext()

  useEffect(() => {
    //console.log(page)

    setFiltered(movies)
  }, [category, page])

  const POPULAR = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`
  const TRENDING = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&page=${page}`
  const NOW_PLAYING = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=${page}`
  const UPCOMING = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=${page}`
  const TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=${page}`

  if (isLoading) {
    return <div className='loading'></div>
  }

  const handleClick = page => {
    //setPage(page + 1)

    if (category === 'popular') fetchMovies(POPULAR, 'popular', page)
    if (category === 'trending') fetchMovies(TRENDING, 'trending', page)
    if (category === 'now playing')
      fetchMovies(NOW_PLAYING, 'now playing', page)
    if (category === 'upcoming') fetchMovies(UPCOMING, 'upcoming', page)
    if (category === 'top rated') fetchMovies(TOP_RATED, 'top rated', page)
  }

  return (
    <>
      <Header />

      {/* movie category*/}

      <div className='cat-genre'>
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
      </div>

      <section className='all'>
        {filtered &&
          filtered.map(movie => {
            const {
              id,
              title,
              poster_path,
              release_date,
              vote_average,
              genre_ids
            } = movie

            return (
              <article className='one-movie' key={id}>
                <MovieCard
                  movie={movie}
                  id={id}
                  title={title}
                  poster_path={poster_path}
                  vote_average={vote_average}
                  release_date={release_date}
                  genre_ids={genre_ids}
                />
              </article>
            )
          })}

        {filtered.length == 0 && (
          <h3 style={{ color: 'tomato' }}>No movies found</h3>
        )}
      </section>

      {/*{!filtered.length == 0 && (
        <div className='more'>
          <button onClick={handleClick}>Load More</button>
        </div>
      )}*/}

      {filtered.length > 0 && (
        <Pagination
          data={filtered}
          pageLimit={5}
          dataLimit={20}
          handleClick={handleClick}
        />
      )}

      <Footer />
    </>
  )
}

export default Movies
