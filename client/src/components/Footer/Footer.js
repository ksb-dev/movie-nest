import React from 'react'

import { useGlobalContext } from '../../context/context'

// Styles
import './Footer.css'

const Footer = () => {
  const { toggleMode } = useGlobalContext()

  return (
    <div
      className={
        toggleMode === 'white'
          ? 'footer footerWhiteBackground footerWhiteColor'
          : 'footer footerBlackBackground footerBlackColor'
      }
    >
      <h1 className='name'>MovieHub</h1>
    </div>
  )
}

export default Footer
