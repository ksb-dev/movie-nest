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

  return (
    <div className='card'>
      <div
        className={
          toggleMode === 'white' ? 'content lightCastBg' : 'content darkCastBg'
        }
        key={id}
        //onMouseOver={show}
        //onMouseLeave={hide}
      >
        <>
          <div className='front'>
            <img
              src={profile_path === null ? url : IMG_PATH + profile_path}
              alt={original_name}
              className='person-img'
            />
          </div>

          <div
            ref={charName}
            className={
              toggleMode === 'white' ? 'back lightCastBg' : 'back darkCastBg'
            }
          >
            <h5>{character && character}</h5>
            <p
              onClick={() => getPersonDetail(id)}
              className={toggleMode === 'white' ? 'darkBio' : 'lightBio'}
            >
              Biography
            </p>
            <h4>{original_name && original_name}</h4>
          </div>
        </>
      </div>
    </div>
  )
}

export default Person
