import { toast } from 'react-hot-toast'
import * as api from '../api'
import { fetchAllQuestions } from './question'

export const deletePost = (id) => async(dispatch) => {
    try {
        const {data} = await api.deletePost(id)
        dispatch(getAllPosts())
        toast.success('Post Deleted')
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}

export const uploadPost = (formdata) =>async(dispatch)=>{
    try {
        toast.loading('Posting...')
        const {data} = await api.uploadPost(formdata)
        toast.dismiss()
        dispatch(getAllPosts())
        toast.success('Post Uploaded')

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}

export const getAllPosts = () => async (dispatch) => {
    try {
        const {data} = await api.getAllPosts()
        // console.log(data)
        dispatch({type: 'FETCH_POSTS', payload: data})
    } catch (error) {
        console.log(error.message) 
    }
}