import React from 'react'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import YouTube from 'react-youtube'

// Styles
import './Youtube.css'

const Youtube = ({ youtube_div, off, trailerUrl, setTrailerUrl }) => {
  const { toggleMode } = useGlobalContext()

  const close = () => {
    setTimeout(() => {
      setTrailerUrl('')
    }, 500)
    youtube_div.current.style.transform = 'translateY(100%)'
  }

  const opts = {
    height: '600',
    width: '1200',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  }

  return (
    <div
      ref={youtube_div}
      className={
        toggleMode === 'white'
          ? 'youtube-div whiteBackground'
          : 'youtube-div blackBackground'
      }
    >
      {trailerUrl && (
        <>
          <div
            className={
              toggleMode === 'white'
                ? 'close-btn whiteBackground blackColor'
                : 'close-btn blackBackground whiteColor'
            }
            ref={off}
            onClick={() => close()}
          >
            <i className='fa-solid fa-circle-xmark fa-3x'></i>
          </div>

          <YouTube className='youtube' videoId={trailerUrl} opts={opts} />
        </>
      )}

      {!trailerUrl && (
        <>
          <button className='close-btn' ref={off} onClick={() => close()}>
            <i
              className={
                toggleMode === 'white'
                  ? 'fa-solid fa-circle-xmark fa-3x blackColor'
                  : 'fa-solid fa-circle-xmark fa-3x whiteColor'
              }
            ></i>
          </button>
          <div
            className={
              toggleMode === 'white'
                ? 'trailer-not-found  blackColor'
                : 'trailer-not-found  whiteColor'
            }
          >
            trailer not found
          </div>
        </>
      )}
    </div>
  )
}

export default Youtube
