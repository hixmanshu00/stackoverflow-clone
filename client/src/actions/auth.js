import * as api from "../api";
import setCurrentUser from "./currentUser";
import { toast } from "react-hot-toast";

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    toast.loading('Signing Up...')
    const { data } = await api.signup(authData);
    toast.dismiss()
    toast.success("Sign up successful !!");
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    dispatch({ type: "AUTH", data });
    navigate("/");
  } catch (error) {
    toast.error(error.response.data.message);

    console.log(error);
  }
};
export const login = (authData, navigate) => async (dispatch) => {
  try {
    toast.loading('Logging in..')
    const { data } = await api.login(authData);
    toast.dismiss()
    toast.success("Login Successful !!");
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};
