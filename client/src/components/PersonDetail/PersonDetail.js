import React from 'react'

// Context
import { useGlobalContext } from '../../context/context'

// Styles
import './PersonDetail.css'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const PersonDetail = ({ detail, person }) => {
  const { toggleMode } = useGlobalContext()

  const closeDetail = () => {
    detail.current.style.transform = 'translateX(-120%)'
  }

  return (
    <div
      ref={detail}
      className={
        toggleMode === 'white'
          ? 'full-detail personWhiteAlpha'
          : 'full-detail personBlackAlpha'
      }
    >
      <div
        className={
          toggleMode === 'white'
            ? 'person-detail personWhiteBackground blackColor'
            : 'person-detail personBlackBackground whiteColor'
        }
      >
        <div className='close-detail'>
          <i
            className='fa-solid fa-circle-xmark fa-2x'
            onClick={closeDetail}
          ></i>
        </div>

        <div className='person-image-birth'>
          <img className='img' src={IMG_PATH + person.profile_path} alt='' />

          <div className='birth'>
            <h3>{person.name}</h3>
            {person.birthday && person.place_of_birth && (
              <>
                <h5>
                  Birthday - <span>{person.birthday}</span>
                </h5>
                <h5>
                  Birth Place - <span>{person.place_of_birth}</span>
                </h5>
              </>
            )}
          </div>
        </div>

        <div className='bio'>
          {person.biography ? (
            <h4>{person.biography}</h4>
          ) : (
            <h4>No Details Found</h4>
          )}
        </div>
      </div>
    </div>
  )
}

export default PersonDetail
