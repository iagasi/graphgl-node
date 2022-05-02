import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserStateValue } from '../context/globalContext'
import { UsersAction } from '../context/userActions'
import "../css/user.css"
import { GETALL } from '../http/Users'
import socket from "./socket"
function UserPage({ email, logintimes }) {

  const { user, dispatch } = UserStateValue()
  const {data,loading,error} = useQuery(GETALL)
  const [counter,setCounter]=useState()

 


useEffect(()=>{

  
  socket.on("NewUserRegistered", (message) => {
    if(message){
      
    }
  setCounter(message)
    })
},[])




  useEffect(() => {
   // dispatch(UsersAction(data.data?.getAllUsers))
    
   setCounter(data?.getAllUsers)
       console.log(data)
       console.log(data?.getAllUsers);

  },[data,loading,error])



  const nav = useNavigate()

  const logOutHandler = () => {
    localStorage.removeItem("acessToken")
    nav("/")
  }

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;

  return (
    <div className="user">
      <div className='user__container'>
        <h4>Hello - {user.state?.email}</h4>
        <button onClick={logOutHandler}>Log out;</button>
        <div className='user__counter'>
          <h2>Your login times -<span style={{color:"red",fontSize:"30px"}}> {user.state?.loginTimes}</span></h2>
          <h1>{ counter===3&&"You are lucky person"}</h1>

          <h2>Registered Users-- <span span style={{color:"red" ,fontSize:"30px"}}>{counter}</span></h2>
        </div>
      </div>
    </div>

  )
}

export default UserPage