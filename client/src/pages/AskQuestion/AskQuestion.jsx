import React, {useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './AskQuestion.css'
import {askQuestion} from '../../actions/question'

const AskQuestion = () => {
    const [questionTitle, setQuestionTitle] = useState('')
    const [questionBody, setQuestionBody] = useState('')
    const [questionTags, setQuestionTags] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const User = useSelector((state)=> (state.currentUserReducer))
    // console.log(User)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (User) {
          if (questionTitle && questionBody && questionTags) {
            dispatch(askQuestion({questionBody,questionTags,questionTitle, userPosted: User.result.name, userId: User?.result?._id}, navigate));
           
          } else alert("Please enter all the fields");
        } else alert("Login to ask question");
      };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // console.log({questionBody, questionTags, questionTitle})
    //     dispatch(askQuestion({questionBody,questionTags,questionTitle, userPosted: User.result.name, userId: User?.result?._id}, navigate));
    // }

    const handleEnter = (e) =>{
        if(e.key === 'Enter'){
            setQuestionBody(questionBody + "\n")
        }
    }
  return (
    <div className="ask-question">
        <div className="ask-ques-container">
            <h1>Ask a public Question</h1>
            <form onSubmit={handleSubmit}>
                <div className="ask-form-container">
                <label htmlFor="ask-ques-title">
                        <h4>Title</h4>
                        <p>Be specific and imagine you are asking question to a another person</p>
                        <input type="text" id="ask-ques-title" onChange={(e)=> {setQuestionTitle(e.target.value)}} placeholder='e.g. is there an R function for finding the index of an element in a vector?' />
                    </label>                    
                    <label htmlFor="ask-ques-body">
                        <h4>Body</h4>
                        <p>Include all the information someone would need to answer your question</p>
                        <textarea name="" id="ask-ques-body" onChange={(e)=> {setQuestionBody(e.target.value)}} cols="30" rows="10" onKeyPress={handleEnter}></textarea>
                    </label>
                    <label htmlFor="ask-ques-tags">
                        <h4>Tags</h4>
                        <p>Add upto 5 tags to describe what your question is about</p>
                        <input type="text" id="ask-ques-tags" onChange={(e)=> {setQuestionTags(e.target.value.split(" "))}} placeholder='e.g. (xml typescript wordpress' />
                    </label>
                </div>
                <input type="submit" value="Review your question" className='review-btn'/>
            </form>
        </div>
    </div>
  )
}

export default AskQuestion
