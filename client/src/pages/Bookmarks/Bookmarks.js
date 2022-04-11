import React, { useEffect } from 'react'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import SearchHeader from '../../components/SearchHeader/SearchHeader'
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

  useEffect(() => {
    setWishlistFiltered(wishlist)
  }, [])

  if (isLoading) {
    return <div className='loading'></div>
  }

  return (
    <>
      <SearchHeader />

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
        {wishlist.length !== 0 && wishlistFiltered.length === 0 && (
          <h3 style={{ color: 'tomato' }}>No Movies Found</h3>
        )}

        {wishlist.length === 0 && (
          <h3 style={{ color: 'tomato' }}>Add Movies To Wishlist</h3>
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
