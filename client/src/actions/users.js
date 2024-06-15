import { toast } from 'react-hot-toast'
import * as api from '../api'

export const fetchAllUsers = () => async (dispatch) => {
    try {
        const {data} = await api.fetchAllUsers()
        dispatch({ type: 'FETCH_USERS', payload: data})
    } catch (error) {
        // console.log(error)
      toast.error(error.response.data.message)

    }
}

export const updateProfile = (id, updateData) => async (dispatch) => {
    try {
      const { data } = await api.updateProfile(id, updateData);
      toast.success('Profile updated !!!')
      dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message)
    }
  };
  