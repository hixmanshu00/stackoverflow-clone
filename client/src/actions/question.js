import { toast } from 'react-hot-toast'
import * as api from '../api'

export const askQuestion = (questionData, navigate) => async (dispatch) => {
    try {
        toast.loading('Posting question...')
        const {data} = await api.postQuestion(questionData)
        toast.dismiss()
        toast.success('Question Posted !!')
        // console.log(data)
        dispatch({type: "POST_QUESTION", payload: data})
        dispatch(fetchAllQuestions())
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllQuestions = () => async (dispatch) => {
    try {
        const {data} = await api.getAllQuestions()
        dispatch({type: 'FETCH_ALL_QUESTIONS', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const deleteQuestion = (id,navigate) => async (dispatch) => {
  try {
    toast.loading('Deleting Question...')
    const {data} = api.deleteQuestion(id)
    toast.dismiss()
    toast.success('Question deleted !!!')
    dispatch(fetchAllQuestions())
    navigate('/')
  } catch (error) {
    toast.error(error.response.data.message)
    console.log(error)
  }
}

export const voteQuestion = (id, value, userId) => async (dispatch) => {
  try {
    toast.loading('voting...')
    const {data} = await api.voteQuestion(id, value, userId)
    toast.dismiss()
    toast.success('Vote submitted !!')
    dispatch(fetchAllQuestions())
  } catch (error) {
    toast.error(error.response.data.message)
  }
}

export const postAnswer = (answerData) => async (dispatch) => {
  try {
    toast.loading('Posting Answer...')
    const { id, noOfAnswers, answerBody, userAnswered, userId } = answerData;
    const { data } = await api.postAnswer(
      id,
      noOfAnswers,
      answerBody,
      userAnswered,
      userId
    );
    toast.dismiss()
    toast.success('Answer Posted !!!')
    dispatch({ type: "POST_ANSWER", payload: data });
    dispatch(fetchAllQuestions());
  } catch (error) {
    toast.error(error.response.data.message)
    console.log(error);
  }
};

export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch) => {
  try {
    toast.loading('deleting answer...')
    const {data} = await api.deleteAnswer(id, answerId, noOfAnswers)
    toast.dismiss()
    toast.success('Answer Deleted !!')
    dispatch(fetchAllQuestions())
  } catch (error) {
    toast.error(error.response.data.message)
    console.log(error)
  }
}