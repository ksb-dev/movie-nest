import React, { useRef } from 'react'

import './Person.css'

const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const Person = ({
  profile_path,
  character,
  original_name,
  id,
  toggleMode,
  getPersonDetail
}) => {
  const charName = useRef(null)

  const show = () => {
    charName !== null && (charName.current.style.transform = 'translateY(0%)')
  }

  const hide = () => {
    charName !== null &&
      (charName.current.style.transform = 'translateY(-110%)')
  }

  return (
    <div
      className={
        toggleMode === 'white'
          ? 'actor-img-name lightCastBg'
          : 'actor-img-name darkCastBg'
      }
      key={id}
      onMouseOver={show}
      onMouseLeave={hide}
    >
      {character && original_name && (
        <>
          <img
            src={profile_path === null ? url : IMG_PATH + profile_path}
            alt=''
            className='person-img'
          />

          <div
            ref={charName}
            className={
              toggleMode === 'white'
                ? 'character-name lightCastBg'
                : 'character-name darkCastBg'
            }
          >
            <h5>{character}</h5>
            <p
              onClick={() => getPersonDetail(id)}
              className={toggleMode === 'white' ? 'darkBio' : 'lightBio'}
            >
              Biography
            </p>
            <h4>{original_name}</h4>
          </div>
        </>
      )}
    </div>
  )
}

export default Person
