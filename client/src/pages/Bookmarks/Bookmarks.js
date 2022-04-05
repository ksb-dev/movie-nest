import React from 'react'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import Header from '../../components/Header/Header'
import MovieCard from '../../components/MovieCard/MovieCard'
import Footer from '../../components/Footer/Footer'

// Style
import './Bookmarks.css'

const Bookmarks = () => {
  const { isLoading, toggleMode, wishlist } = useGlobalContext()

  if (isLoading) {
    return <div className='loading'></div>
  }

  return (
    <>
      <Header />
      {/* single movie */}

      {/* movie category*/}

      <h4
        className={
          toggleMode === 'white'
            ? 'cate blackColorCategory whiteMovies'
            : 'cate whiteColorCategory blackMovies'
        }
      >
        {wishlist !== null && (
          <span id='wish'>
            Wishlist <span>{wishlist.length}</span>
          </span>
        )}
      </h4>

      <section className='all'>
        {!wishlist.length && (
          <h3 style={{ color: 'tomato' }}>Add movies to Wishlist</h3>
        )}

        {wishlist &&
          wishlist.map(movie => {
            const {
              movie_id,
              movie_name,
              poster_path,
              release_date,
              movie_vote
            } = movie

            return (
              <article className='one-movie' key={movie_id}>
                <MovieCard
                  movie={movie}
                  id={movie_id}
                  title={movie_name}
                  poster_path={poster_path}
                  vote_average={movie_vote}
                  release_date={release_date}
                />
              </article>
            )
          })}
      </section>

      <Footer />
    </>
  )
}

export default Bookmarks
