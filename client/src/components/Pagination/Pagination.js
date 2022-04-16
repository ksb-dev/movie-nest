import React, { useState, useEffect } from 'react'

import { useGlobalContext } from '../../context/context'

import './Pagination.css'

const Pagination = ({ data, pageLimit, dataLimit, handleClick }) => {
  const [pages] = useState(Math.round(data.length / dataLimit))

  const { page, setPage, toggleMode } = useGlobalContext()

  const storedPage = Number(localStorage.getItem('page'))

  const number = storedPage !== 0 ? storedPage : page

  //console.log(storedPage, number)

  //console.log(number)

  useEffect(() => {
    handleClick(page)
  }, [page])

  function goToNextPage () {
    // not yet implemented
    setPage(page => page + 1)
  }

  function goToPreviousPage () {
    // not yet implemented
    setPage(page => page - 1)
  }

  function changePage (e) {
    // not yet implemented
    const pageNumber = Number(e.target.textContent)
    setPage(pageNumber)
  }

  const getPaginationGroup = () => {
    // not yet implemented
    let start = Math.floor((number - 1) / pageLimit) * pageLimit
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1)
  }

  return (
    <div>
      <div className={toggleMode === 'white' ? 'pagination' : 'pagination'}>
        {/* previous button */}
        <div className={toggleMode === 'white' ? 'inner lbg' : 'inner dbg'}>
          <button
            onClick={goToPreviousPage}
            className={
              toggleMode === 'white'
                ? ` ${number === 1 ? 'disabled' : 'prevNextDark'}`
                : ` ${number === 1 ? 'disabled' : 'prevNextLight'}`
            }
          >
            <i className='fa-solid fa-circle-chevron-up fa-2x'></i>
          </button>

          {/* show page numbers */}

          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={
                toggleMode === 'white'
                  ? `paginationItem  ${
                      number === item ? 'darkActive' : 'darkNumber'
                    } `
                  : `paginationItem  ${
                      number === item ? 'lightActive' : 'lightNumber'
                    } `
              }
            >
              <span>{item}</span>
            </button>
          ))}

          {/* next button */}
          <button
            onClick={goToNextPage}
            className={
              toggleMode === 'white'
                ? ` ${number === pages ? 'prevNextDark' : 'prevNextDark'}`
                : ` ${number === pages ? 'prevNextLight' : 'prevNextLight'}`
            }
          >
            <i className='fa-solid fa-circle-chevron-down fa-2x'></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pagination
