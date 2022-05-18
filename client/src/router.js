import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage.js';
import Register from './pages/register.js';
import Login from './pages/login.js';
import Profile from './pages/profile.js'
import Post from './pages/post.js'

// router switch 
class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                    <Route path='/profile' element={<Profile />}></Route>
                    <Route path='/post' element={<Post />}></Route>

                </Routes>
            </BrowserRouter>
        )
    }
}


export default Router;