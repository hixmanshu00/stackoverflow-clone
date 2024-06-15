import React,  {useState} from 'react'
import up from '../../assets/up.png'
import down from '../../assets/down.png'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import Avatar from '../../components/Avatars/Avatar'
import './Questions.css'
import DisplayAnswer from './DisplayAnswer'
import { useDispatch, useSelector } from 'react-redux'
import { postAnswer, deleteQuestion, voteQuestion } from '../../actions/question'
import moment from 'moment'
import copy from 'copy-to-clipboard'

const QuestionsDetails = () => {

    const { id } = useParams()
    // console.log(id)
    const questionList = useSelector(state => state.questionReducer)
    // console.log(questionList)
    const location = useLocation()
    const url = 'https://stackoverflow-clone-him.netlify.app'

    const [answer, setAnswer] = useState('')
    const Navigate = useNavigate();
    const dispatch = useDispatch()
    const User = useSelector((state)=> (state.currentUserReducer))

    const handlePostAns = (e, answerLength) => {
      e.preventDefault();
      if (User === null) {
        alert("Login or Signup to answer a question");
        Navigate("/Auth");
      } else {
        if (answer === "") {
          alert("Enter an answer before submitting");
        } else {
          dispatch(
            postAnswer({
              id,
              noOfAnswers: answerLength + 1,
              answerBody: answer,
              userAnswered: User.result.name,
              userId: User.result._id
            })
          );
          setAnswer("");
        }
      }
    };

    const handleShare = () => {
      copy(url+location.pathname)
      alert("Copied url: "+url+location.pathname)
    }

    const handleDelete = () => {
      dispatch(deleteQuestion(id,Navigate))
    }

    const handleUpVote = () => {
      dispatch(voteQuestion(id,'upVote', User.result._id))
    }

    const handleDownVote = () => {
      dispatch(voteQuestion(id,'downVote', User.result._id))
    }

    // const questionList = [{
    //     id:'1',
    //     upVotes: 4,
    //     downVotes: 2,
    //     noOfAnswers: 1,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["java","nodejs", 'reactjs', 'mongodb'],
    //     userPosted: 'mano',
    //     askedOn: 'Jan 1',
    //     answer: [{
    //       answerBody: "Answer",
    //       userAnswered: 'Kumar',
    //       answeredOn: "Jan 2",
    //       userId:2
    //     }]
    //   },
    //   {
    //     id: '2',
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 1,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["javascript","R", 'pythhon'],
    //     userPosted: 'mano',
    //     askedOn: 'Jan 1',
    //     userId: 1,
    //     answer: [{
    //       answerBody: "Answer",
    //       userAnswered: 'Kumar',
    //       answeredOn: "Jan 2",
    //       userId:2
    //     }]
    //   },
    //   {
    //     id: '3',
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 1,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["javascript","R", 'pythhon'],
    //     userPosted: 'mano',
    //     askedOn: 'Jan 1',
    //     userId: 1,
    //     answer: [{
    //       answerBody: "Answer",
    //       userAnswered: 'Kumar',
    //       answeredOn: "Jan 2",
    //       userId:2
    //     }]
    //   },
    // ]
    
  return (
    <div className='question-details-page'>
    
      {
        questionList.data === null ?
        <h1>Loading... </h1> 
    
        
        : 
        <>
            {
                questionList.data.filter(question => question._id === id).map(question => (
                    <div key={question._id}>
                        <section className="question-details-container">

                            <h1>{question.questionTitle}</h1>
                            <div className="question-details-container-2">
                                <div className="question-votes">
                                    <img src={up} alt="  " width={18} className='votes-icon' onClick={handleUpVote}/>
                                    <p>{question.upVote.length - question.downVote.length}</p>
                                    <img src={down} alt="  " width={18} className='votes-icon' onClick={handleDownVote} />
                                </div>
                                <div style={{width:"100%"}}>
                                  <p className="question-body">
                                    {question.questionBody}
                                  </p>
                                  <div className="question-details-tags">
                                    {
                                      question.questionTags.map((tag)=>(
                                        <p key={tag}>{tag}</p>
                                      ))
                                    }
                                  </div>
                                  <div className="question-actions-user">
                                    <div>
                                      <button onClick={handleShare}>Share</button>
                                      {
                                        User?.result?._id === question?.userId && (
                                            <button onClick={handleDelete}>Delete</button>
                                        )
                                      }
                                    </div>
                                    <div>
                                      <p>asked {moment(question.postedOn).fromNow()}</p>
                                      <Link to={`/Users/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                        <Avatar backgroundColor="orange" px='8px' py='5px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                        <div>
                                          {question.userPosted}
                                        </div>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </section>
                        {
                          question.noOfAnswers !==0 && (
                            <section>
                              <h3>
                                {question.noOfAnswers} answers
                              </h3>
                              <DisplayAnswer key={question.id} question={question} handleShare={handleShare} />
                            </section>
                          )
                        }
                        <section className="post-ans-container">
                          <h3>Your Answer</h3>
                          <form
                    onSubmit={(e) => {
                      handlePostAns(e, question.answer.length);
                    }}
                  >
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post Your Answer"
                    />
                  </form>
                          <p>
                            Browse other Question tagged
                            {
                              question.questionTags.map((tag)=>(
                                <Link to='/Tags' key={tag} className='ans-tags'> {tag}</Link>
                              ))
                            } or 
                            <Link to='/AskQuestion' style={{textDecoration:'none', color:'#009dff'}}> Ask Your Own Question</Link>
                          </p>
                        </section>
                    </div>
                ))
            }
        </>
      }
    </div>
  )
}

export default QuestionsDetails
