import React from 'react'
import Login from './components/Login'
import { BrowserRouter, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Register from './components/Register'
import UserPage from './components/UserPage'
function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/register" element={<Register />} />
                <Route path="/user" element={<UserPage />} />

            </Routes>
        </BrowserRouter>

    )
}

export default Routing