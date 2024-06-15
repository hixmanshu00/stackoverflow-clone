import React from 'react'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import QuestionsDetails from './QuestionsDetails'

const DisplayQuestion = ({ slideIn, handleSlideIn }) => {
  return (
    <div className="home-container-1">
      <LeftSideBar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2">
      <QuestionsDetails />
        <RightSideBar />
      </div>
    </div>
  )
}

export default DisplayQuestion
