import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useGlobalContext } from './context/context'

import Home from './pages/Home/Home'
import Search from './pages/Search/Search'
import Movie from './pages/Movie/Movie'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Bookmarks from './pages/Bookmarks/Bookmarks'

function App () {
  const { toggleMode, movies } = useGlobalContext()

  return (
    <div className={toggleMode === 'white' ? 'view white' : 'view black'}>
      <>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home />} />

            <Route path='/movie/:id' element={<Movie />} />

            <Route path='/search' element={<Search />} />

            <Route path='/bookmarks' element={<Bookmarks movies={movies} />} />

            <Route path='/login' element={<Login />} />

            <Route path='/signup' element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </>
    </div>
  )
}

export default App
