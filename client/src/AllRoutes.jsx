import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Auth from './pages/Auth/Auth'
import Questions from './pages/Questions/Questions'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import DisplayQuestion from './pages/Questions/DisplayQuestion'
import Tags from './pages/tags/Tags'
import Users from './pages/Users/Users'
import UserProfile from './pages/UserProfile/UserProfile'
import Feed from './pages/Feed/Feed'
import { useSelector } from 'react-redux'
const AllRoutes = ({slideIn, handleSlideIn}) => {
  const url = 'https://64fae8e87302b05824302e9c--stackoverflow-clone-him.netlify.app'
  const User = useSelector((state) => state.currentUserReducer);

  return (
    <>
      <Routes>
        <Route path='/'  element={User ? <Home slideIn={slideIn} handleSlideIn={handleSlideIn} /> : <Auth slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
        <Route path='/Auth' element={<Auth slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
        <Route path='/Questions' element={<Questions slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
        <Route path='/AskQuestion' element={<AskQuestion slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
        <Route path='/Questions/:id' element={<DisplayQuestion slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
        <Route path='/Tags' element={<Tags slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
        <Route path='/Users' element={<Users slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
        <Route path='/Users/:id' element={<UserProfile slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
        <Route path='/feed' element={<Feed slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
      </Routes>
    </>
  )
}

export default AllRoutes
