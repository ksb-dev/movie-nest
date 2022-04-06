import React, { useState, useEffect } from 'react'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import Header from '../../components/Header/Header'
import MovieCard from '../../components/MovieCard/MovieCard'
import Footer from '../../components/Footer/Footer'

// Style
import './Bookmarks.css'

const Bookmarks = () => {
  const {
    isLoading,
    toggleMode,
    wishlistFiltered,
    setWishlistFiltered,
    wishlist
  } = useGlobalContext()
  const [activeGenre, setActiveGenre] = useState(0)

  useEffect(() => {
    setWishlistFiltered(wishlist)
  }, [])

  if (isLoading) {
    return <div className='loading'></div>
  }

  return (
    <>
      <Header />

      {/* movie category*/}

      <div className='cat-genre'>
        <h4
          className={
            toggleMode === 'white'
              ? 'cate blackColorCategory whiteMovies'
              : 'cate whiteColorCategory blackMovies'
          }
        >
          {wishlistFiltered !== null && (
            <span id='wish'>
              wishlist <span>{wishlistFiltered.length}</span>
            </span>
          )}
        </h4>
      </div>

      <section className='all'>
        {!wishlistFiltered.length && (
          <h3 style={{ color: 'tomato' }}>Add movies to wishlist</h3>
        )}

        {wishlistFiltered &&
          wishlistFiltered.map(movie => {
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
