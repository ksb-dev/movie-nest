import React, { useRef } from 'react'

// Components
import Person from '../Person/Person'

// Hooks
import { useGlobalContext } from '../../context/context'

import { motion } from 'framer-motion'
import ScrollContainer from 'react-indiana-drag-scroll'

// Styles
import './Cast.css'

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

  const hide = () => {
    charName.current.style.background = 'white'
    console.log(charName.current)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className={
        toggleMode === 'white' ? 'cast-div blackColor' : 'cast-div whiteColor'
      }
    >
      {people && <h3>Cast</h3>}
      <ScrollContainer>
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
                <div className='person-div' key={id}>
                  <Person
                    profile_path={profile_path}
                    character={character}
                    original_name={original_name}
                    toggleMode={toggleMode}
                    getPersonDetail={getPersonDetail}
                    id={id}
                  />
                </div>
              )
            })}
        </div>
      </ScrollContainer>
    </motion.div>
  )
}

export default Cast
