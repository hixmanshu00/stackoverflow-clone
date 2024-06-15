import React, { useEffect, useState } from "react";
import "./Auth.css";
import icon from "../../assets/stack-overflow.png";
import AboutAuth from "./AboutAuth";
import { signup, login } from "../../actions/auth";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import Login from "../../components/Oauth/login";
import {gapi} from 'gapi-script'
import Signup from "../../components/Oauth/Signup";
const clientID = "1015261864356-ffheklri6rstoqh52bedddgr5bsi0r0b.apps.googleusercontent.com"


const Auth = () => {

  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId: clientID,
        scope: ''
      })
      gapi.load('client:auth2', start)
    }
  })
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsSignup(!isSignup);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email && !password){
      alert('Enter email and password')
    }
    if(isSignup){
      if(!name){
        alert('Enter a name to continue')
      }
      dispatch(signup({ name, email, password}, navigate))
    }
    else{
      dispatch(login({email, password}, navigate))
    }
  }

  return (
    <section className="auth-section">
    {isSignup && <AboutAuth />}
      <div className="auth-container-2">
        {!isSignup && (
          <img src={icon} className="login-logo" alt="stack-overflow" />
        )}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input type="text" name="name" id="name" onChange={(e)=> {setName(e.target.value)}}/>
            </label>
          )}

          <label htmlFor="email">
            <h4>Email</h4>
            <input type="email" name="email" id="email" onChange={(e)=> {setEmail(e.target.value)}} />
          </label>
          <label htmlFor="password">
            <div style={{display:'flex', justifyContent: 'space-between'}}>
              <h4>Password</h4>
              {!isSignup && <p style={{color: '#007ac6', fontSize:'13px'}}>forgot password?</p>}
            </div>
            <input type="password" name="password" id="password" onChange={(e)=> {setPassword(e.target.value)}} />
            {isSignup && (
              <p style={{color: "#666767", fontSize: "13px"}}>
                Passwords must contain at least eight <br /> characters,
                including at least 1 <br /> letter and 1 number.
              </p> 
            )}
          </label>
          {
            isSignup && (
              <label htmlFor="check">
                <input type="checkbox" name="check" id="check" />
                <p style={{fontSize: "13px"}}>
                  Opt-in to recieve occasional, <br />
                  product updates, user research invitations, <br />
                  company announcements, and digests.
                </p>
              </label>
            )
          }
          <button type="submit" className="auth-btn">
            {isSignup ? "Sign up" : "Log in"}
          </button>
          <p style={{textAlign:'center'}}>or</p>
          {/* <button className='google_btn' onClick={googleAuth}>
						<img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" alt="google icon" />
						<span>Sign in with Google</span>
					</button> */}
          {isSignup ? <Signup /> : <Login />}
          {
            isSignup && (
              <p style={{color: "#666767", fontSize: "13px"}}>
                By clicking "Sign up", you agree to our
                <span style={{color: "#007ac6"}}> terms of <br /> services</span>, 
                <span style={{color: "#007ac6"}}> privacy policy</span>and 
                <span style={{color: "#007ac6"}}> cookie policy.</span>
              </p>
            )
          }
        </form>
        <p>
          {isSignup ? "already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? " Log in" : "Sign up"}{" "}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
