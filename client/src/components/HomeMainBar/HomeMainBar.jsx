import React from 'react'
import './HomeMainBar.css'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import QuestionList from './QuestionList'
import { useSelector } from 'react-redux'

const HomeMainBar = () => {
  const user = 1;
  const navigate = useNavigate()

  const questionList = useSelector(state => state.questionReducer)
  // console.log()
  const checkAuth = () => {
    if(!user){
      navigate('./Auth')
    }
    else{
      navigate('./AskQuestion')
    }
  }
 
//   var questionList = [{
//     id: 1,
//     votes:3,
//     noOfAnswers: 2,
//     questionTitle: "What is a function?",
//     questionBody: "It meant to be",
//     questionTags: ["java","nodejs", 'reactjs', 'mongodb'],
//     userPosted: 'mano',
//     askedOn: 'Jan 1'
//   },
//   {
//     id: 2,
//     votes:0,
//     noOfAnswers: 0,
//     questionTitle: "What is a function?",
//     questionBody: "It meant to be",
//     questionTags: ["javascript","R", 'pythhon'],
//     userPosted: 'mano',
//     askedOn: 'Jan 1'
//   },
//   {
//     id: 3,
//     votes:1,
//     noOfAnswers: 0,
//     questionTitle: "What is a function?",
//     questionBody: "It meant to be",
//     questionTags: ["javascript","R", 'pythhon'],
//     userPosted: 'mano',
//     askedOn: 'Jan 1'
//   },
// ]
const location = useLocation()
  return (
    <div className='main-bar'>
      <div className="main-bar-header">
        {
          location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
        }
        <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
      </div>
      <div>
        {
          questionList.data === null ? 
          <h1>Loading...</h1> :
          <>
            <p>{questionList.data.length} questions</p>
            <QuestionList questionList = {questionList.data} />
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainBar
