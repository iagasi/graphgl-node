import { useMutation, useQuery, useSubscription } from '@apollo/client'
import jwtDecode from 'jwt-decode'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserStateValue } from '../context/globalContext'
import { LoginAction } from '../context/userActions'
import "../css/auth.css"
import { LOGIN } from '../http/login'
import { GETALL, ONADDUSER } from '../http/Users'

function Login() {
    const { user, dispatch } = UserStateValue()
   

    const navigate = useNavigate()
    const [userLogin] = useMutation(LOGIN)
 
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
  const [error, setError] = useState();
    const [login, setLogin] = useState("Login")


 
      
    const loginHandler = async () => {
        const data = await userLogin({
            variables: {
                input: {
                    email,
                    password

                }
            }
        })

        setError(data.data.userLogin.error)
        console.log(data.data.userLogin.acessToken);
        localStorage.setItem("acessToken", data.data.userLogin.acessToken)
        

         console.log({refreshtoken:data.data.userLogin.refreshToken});
        const acessToken = localStorage.getItem("acessToken")
        const decoded = jwtDecode(acessToken)
        console.log(decoded)
        dispatch(LoginAction(decoded))
        navigate("/user")
    }
    return (
        <div className='auth'>
            <div className="auth__container">
                <div className="auth__form">
                    <h1>Log in</h1>
                    <div className='auth__errors'>  {error}</div>

                    <div className='auth__formContainer'>
                        <input className="auth__input" type="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)}></input>
                        <input className="auth__input" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}></input>
                        <button className='auth__button  ' onClick={() => loginHandler()}>{login}</button>
                        <Link to="/register"><button className='auth__button  auth__buttonRegister'> Register</button></Link>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Login