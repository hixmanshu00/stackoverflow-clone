import {GoogleLogin,} from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { signup, login } from '../../actions/auth'
import { useDispatch } from 'react-redux'

const clientID = "1015261864356-ffheklri6rstoqh52bedddgr5bsi0r0b.apps.googleusercontent.com"

const Signup = () => {
    const navigate =  useNavigate()
    const dispatch =  useDispatch()
    const onSuccess = (res) => {
        console.log('Signup Successful', res.profileObj)
        const {name, email, googleId:password} = res.profileObj 
        dispatch(signup({name,email,password},navigate))
    }
    const onFailure = (res) => {
        console.log('Signup Failure', res)
    }
    return(
    <div id='signInButton' style={{margin:'auto'}}>
        <GoogleLogin
            clientId={clientID}
            buttonText='Signup with Google'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}

        />

    </div>
    ); 
}

export default Signup