import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import "../css/auth.css"
import { io } from "socket.io-client"

import { REGISTER } from '../http/register'
import { UserStateValue } from '../context/globalContext'
import { UsersAction } from '../context/userActions'
import socket from "./socket"
import { GETALL } from '../http/Users'
function Register() {

   


    const { user:stateUsers, dispatch } = UserStateValue()
    const [userRegister] = useMutation(REGISTER)
    const [user, setUser] = useState(false)

    

    useEffect(() => {
        console.log("reg")
        if (user) {
            console.log(user);
            socket.emit("Registered",user)
            setUser(false)
        }

    }, [user])


  

    const [email, setEmail] = useState()
    const [password1, setPassword1] = useState()
    const [password2, setPassword2] = useState()
    const [errors, setErrors] = useState()
    const register = async () => {


        try {
            const data = await userRegister({
                variables: {
                    input: {
                        email,
                        password: password1,
                        password2,
                        loginTimes: 0,
                        
                    }
                }
            })

            setErrors(data.data.userRegister.error)
            if (!data.data.userRegister.error) {
                setErrors("Sucesfully registered  go to login")
               
                setUser(data.data.userRegister.usersCount)

            }
            console.log(data.data.userRegister.error)
        }
        catch (e) { console.log(e) }

    }

    return (
        <div className='auth'>
            <div className="auth__container">
                <div className="auth__form">
                    <h1>Registracion{stateUsers?.users}</h1>
                    <div className='auth__errors'> {password1 !== password2 && "Passwords not matching"} {errors}</div>

                    <div className='auth__formContainer'>
                        <input className="auth__input" type="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)}></input>
                        <input className="auth__input" placeholder='Enter Password' onChange={(e) => setPassword1(e.target.value)}></input>
                        <input className="auth__input" placeholder='Reinter Password' onChange={(e) => setPassword2(e.target.value)}></input>


                        <button className='auth__button  ' onClick={() => register()}>Register</button>
                        <Link to="/"><button className='auth__button  auth__buttonRegister'> Go to Login</button></Link>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Register