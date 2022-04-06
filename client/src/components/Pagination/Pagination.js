import React, { useState, useEffect } from 'react'

import { useGlobalContext } from '../../context/context'

import './Pagination.css'

const Pagination = ({ data, pageLimit, dataLimit, handleClick }) => {
  const [pages] = useState(Math.round(data.length / dataLimit))
  const [currentPage, setCurrentPage] = useState(1)

  const { page, setPage } = useGlobalContext()

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

  const getPaginatedData = () => {
    // not yet implemented
  }

  const getPaginationGroup = () => {
    // not yet implemented
    let start = Math.floor((page - 1) / pageLimit) * pageLimit
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1)
  }

  return (
    <div>
      {/* show the posts, 10 posts at a time */}
      {/*<div className="dataContainer">
      {getPaginatedData().map((d, idx) => (
        <RenderComponent key={idx} data={d} />
      ))}
      </div>*/}

      {/* show the pagiantion
        it consists of next and previous buttons
        along with page numbers, in our case, 5 page
        numbers at a time
    */}
      <div className='pagination'>
        {/* previous button */}
        <button
          onClick={goToPreviousPage}
          className={`prev ${page === 1 ? 'disabled' : ''}`}
        >
          prev
        </button>

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${page === item ? 'active' : null}`}
          >
            <span>{item}</span>
          </button>
        ))}

        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? 'disabled' : ''}`}
        >
          next
        </button>
      </div>
    </div>
  )
}

export default Pagination