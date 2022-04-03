import React, { useRef } from 'react'

// Hooks
import { useGlobalContext } from '../../context/context'

// Styles
import './Cast.css'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const Cast = ({ setPerson, setPersonError, detail, people }) => {
  const { toggleMode } = useGlobalContext()

  const charName = useRef(null)

  const getPersonDetail = async id => {
    const getPersonDetail = `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`

    const response = await fetch(getPersonDetail)
    const details = await response.json()

    if (details) {
      setPerson(details)
      setPersonError(false)
      detail.current.style.transform = 'translateX(0%)'
    } else {
      setPersonError(true)
    }
  }

  const show = () => {
    charName.current.style.display = 'none'
  }

  return (
    <div
      className={
        toggleMode === 'white' ? 'cast-div blackColor' : 'cast-div whiteColor'
      }
    >
      <h3>Cast</h3>
      <div
        className={
          toggleMode === 'white'
            ? 'section-center blackColor'
            : 'section-center whiteColor'
        }
      >
        {people &&
          people.map(person => {
            const { profile_path, character, original_name, id } = person

            return (
              <div className='actor-img-name' key={id}>
                {profile_path && character && original_name && (
                  <>
                    <img
                      src={IMG_PATH + profile_path}
                      alt=''
                      className='person-img'
                      onClick={() => getPersonDetail(id)}
                      onMouseOver={show}
                    />

                    <div ref={charName} className='character-name'>
                      <h6>{character}</h6>
                      <h5>{original_name}</h5>
                    </div>
                  </>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Cast
