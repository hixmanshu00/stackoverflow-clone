import React from "react";
import Avatar from "../../components/Avatars/Avatar";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import "./Questions.css";
import {deleteAnswer} from '../../actions/question'
import { useDispatch, useSelector } from "react-redux";
const DisplayAnswer = ({ question, handleShare }) => {
  const User = useSelector((state)=> (state.currentUserReducer))
  const {id} = useParams()
  const dispatch = useDispatch()
  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers -1))
  }
  return (
    <div>
      {question.answer.map((ans) => (
        <div className="display-ans" key={ans.id}>
          <p>{ans.answerBody}</p>
          <div className="question-actions-user">
            <div>
              <button onClick={handleShare}>Share</button>
              {User?.result?._id === ans?.userId && (
                <button onClick={()=> handleDelete(ans._id,question.noOfAnswers)}>Delete</button>
              )}
            </div>
            <div>
              <p>answered {moment(ans.answeredOn).fromNow()}</p>
              <Link
                to={`/Users/${ans.userId}`}
                className="user-link"
                style={{ color: "#0086d8" }}
              >
                <Avatar backgroundColor="green" px="8px" py="5px">
                  {ans.userAnswered.charAt(0).toUpperCase()}
                </Avatar>
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnswer;
