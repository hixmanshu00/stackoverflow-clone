import React,{useState} from 'react'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import '../../App.css'
import FeedBar from './FeedBar'
import './Feed.css'

const Feed = ({slideIn, handleSlideIn}) => {

  return (
    <div className='home-container-1'>
      <LeftSideBar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2">
        <FeedBar />
        <RightSideBar />
      </div>
    </div>
  )
}

export default Feed
